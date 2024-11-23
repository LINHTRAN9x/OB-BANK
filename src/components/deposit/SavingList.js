import { useParams } from "react-router-dom";
import SlideLeft from "../common/Slide-left";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { Spin, Table,Input, Tooltip,Select, message,Typography, Modal, Steps, Button, Form } from "antd";
import { PiHandWithdrawFill } from "react-icons/pi";

const { Search } = Input;
const { Step } = Steps;
const { Option } = Select;
const { Title , Text } = Typography;
const SavingList = () => {
  const target = 2;
  const { savingList } = useParams();
  const [user,setUser] = useState({});
  const [listSaving, setListSaving] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loanding, setLoanding] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
 
  const [desAccountNumber, setDesAccountNumber] = useState('');
  const [form] = Form.useForm();
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [isCounting, setIsCounting] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(Array(8).fill("")); 

  const next = () => setCurrentStep((prev) => prev + 1);
  const prev = () => setCurrentStep((prev) => prev - 1);


  const showWithdrawModal = (record) => {
    if (record) {
      setCurrentStep(0); // Reset to Step 1
      setDesAccountNumber(''); // Reset account number input
  
      setSelectedAccount(record);  // Save the selected account
      setIsModalVisible(true); // Open the modal
    } else {
      message.error('No account selected.');
    }
  };
  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").trim(); // clear space
    const numericData = pasteData.replace(/\D/g, ""); // remove not number characters

    if (numericData.length === 8) {
        setOtp(numericData.split(""));
        form.setFieldsValue({ otp: numericData.split("") });
    } else {
        message.error("Please paste a complete 8-digit OTP.");
    }
};

  const handleGetAccount = async (acc) => {
    const data = localStorage.getItem('state') ? JSON.parse(localStorage.getItem('state')) : null;
    const jwt = data ? data.jwt : null;

    try {
      const rs = await axios.get(`https://demoapihistory-hsgagzgtcse4daby.japaneast-01.azurewebsites.net/api/SavingsAccount/get-detail-savings-account/${acc}`,{
        headers: { 'Authorization': `Bearer ${jwt}` }
      })
      if (rs.data) {
        // Update your selectedAccount state or some other variable
        setSelectedAccount(rs.data);
      }
   
    } catch (error) {
      
      message.error('Failed to retrieve account details.');
    }
  } 

  const handleWithdraw = async () => {
    const data = localStorage.getItem('state') ? JSON.parse(localStorage.getItem('state')) : null;
    const jwt = data ? data.jwt : null;

    const otpCode = otp.join(""); 
  
    
    if (otpCode.length !== 8) { 
      message.error("Please enter a valid OTP.");
      return;
    }

    if (!selectedAccount) {
      message.error('No account selected.');
      return;
    }

    //await handleGetAccount(selectedAccount.savingsAccountCode);

    try {
      setLoading(true);
      const response = await axios.post(
        'https://demoapihistory-hsgagzgtcse4daby.japaneast-01.azurewebsites.net/api/SavingsAccount/withdraw-savings-account',
        {
          savingsAccountCode: selectedAccount.savingsAccountCode,
     
          otp: otpCode
        },
        {
          headers: { 'Authorization': `Bearer ${jwt}` }
        }
      );
     
      message.success('Withdrawal successful!');
      setIsModalVisible(false);  // Close the modal after successful withdrawal
      await _getListSaving(); 
    } catch (err) {
    
      message.error('Withdrawal failed, please check your details.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);  // Close the modal when cancel is clicked
    setSelectedAccount(null);  // Clear the selected account
    setCurrentStep(0);  // Reset the step to the first step
  };

 
const handleChange = (value, index) => {
    if (isNaN(value)) return; 

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    
    if (value && index < 7) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };
  const handleBackspace = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const newOtp = [...otp];
      newOtp[index - 1] = ""; 
      setOtp(newOtp);
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };

  const handleOtpSubmit = async () => {
    setLoading(true);
    const data = localStorage.getItem('state') ? JSON.parse(localStorage.getItem('state')) : null;
    const jwt = data ? data.jwt : null;
    const email = user.email? user.email : null;

    if (!email) {
      message.error("No email available to send OTP.");
      setIsLoading(false);
      return;
    }

    try {
        await axios.post("https://demoapihistory-hsgagzgtcse4daby.japaneast-01.azurewebsites.net/api/Account/request-money-transfer-otp", 
            { email }, 
            {
                headers: { 'Authorization': `Bearer ${jwt}` }
            }
        );
        setCountdown(180);
        setIsCounting(true);
        setLoading(false);
        message.success("OTP has been sent to your email.");
        setIsLoading(false);
        setOtpSent(true);
    } catch (error) {
        message.error("Failed to send OTP. Please try again.");
        setLoading(false);
      
    }
  };

  const steps = [
    {
      title: 'Step 1: Account Info',
      content: (
        <div>
          {selectedAccount ? (
            <>
              <p><strong>Account Code:</strong> {selectedAccount.savingsAccountCode}</p>
              <p><strong>Balance:</strong> {selectedAccount.balance} USD</p>
              <p><strong>Interest Rate:</strong> {(selectedAccount.interestRate * 100).toFixed(2)} %</p>
            </>
          ) : (
            <p>Loading account details...</p>  // Display loading message if no account is selected
          )}
          <Button
            type="primary"
            icon={<PiHandWithdrawFill />}
            onClick={() => setCurrentStep(1)}  // Move to next step
            style={{ marginTop: 20 }}
            disabled={!selectedAccount}  // Disable button if no account is selected
          >
            Withdraw
          </Button>
        </div>
      ),
    },
    {
      title: 'Step 2: Verify OTP',
      content: (
        <>
        {loading ? (
          <Spin style={{
            position: 'relative',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }}/>
        ) : (
          
        <Form.Item
          label="Verification Code OTP"
          name="otp"
          rules={[{ required: true, message: "Please enter your OTP." }]}
        >
          <div onPaste={handlePaste} style={{ display: "flex", gap: "8px",marginBottom: '28px' }}>
            {otp.map((value, index) => (
              <Input
                key={index}
                id={`otp-input-${index}`}
                maxLength={1}
                value={value}
                name="otp"
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleBackspace(e, index)}
                style={{
                  width: "40px",
                  height: "40px",
                  textAlign: "center",
                  fontSize: "18px",
                  fontWeight: "bold",
                  borderRadius: "4px",
                }}
              />
            ))}
          <Button 
                type= {isLoading ? "default" : 'primary'}
                onClick={handleOtpSubmit} 
                disabled={isCounting} 
                
            >
                'Resend OTP'  
            </Button>
          </div>

          <Button
            type="primary"
            onClick={handleWithdraw}
            loading={isLoading}
            disabled={otp.includes("")} // Disable button if OTP is incomplete
            style={{ marginTop: "0px" }}
          >
            Withdrawal
          </Button>
          <Button style={{ marginLeft: "8px" }} onClick={prev}>
            Back
          </Button>
          {isCounting && (
              <p style={{ color: "red" }}>
                Code is valid for: {countdown} seconds
              </p>
            )}
        </Form.Item>
        )}
        </>
      ),
    },
    {
      title: 'Step 3: Withdrawal',
      content: (
        <div>
          
        </div>
      ),
    },
  ];

  

  const _getListSaving = async () => {
    const url = `https://demoapihistory-hsgagzgtcse4daby.japaneast-01.azurewebsites.net/api/SavingsAccount/list-user-savings-accounts?pageSize=500`;

    const data = localStorage.getItem('state') ? JSON.parse(localStorage.getItem('state')) : null;
    const jwt = data ? data.jwt : null;

    if (jwt) {
      try {
        const rs = await axios.get(url, {
          headers: {
            'Authorization': `Bearer ${jwt}`
          }
        });

        const result = rs.data.result.data;
        const formattedData = result.map((item, index) => ({
          key: index,
          ...item,
        }));
        
     

        setListSaving(formattedData);
        setFilteredData(formattedData);
      } catch (err) {
        
      } finally {
        setLoading(false);
      }
    }
  };

  const columns = [
    {
      title: 'Account Code',
      dataIndex: 'savingsAccountCode',
      key: 'savingsAccountCode',
    },
    {
      title: 'Initial Deposit (USD)',
      dataIndex: 'initialDeposit',
      key: 'initialDeposit',
      
    },
    {
      title: 'Balance (USD)',
      dataIndex: 'balance',
      key: 'balance',
      sorter: (a, b) => a.balance - b.balance,
    },
    {
      title: 'Profit (USD)',
      dataIndex: 'profit',
      key: 'profit',
      render: (text, record) => (
        <>
        {record.balance == 0 ? (
          0
        ) : (
          <>
          {record.balance - record.initialDeposit}
          </>
        )}
        
        </>
      )
    },
    {
      title: 'Interest Rate (%)',
      dataIndex: 'interestRate',
      key: 'interestRate',
      render: (rate) => (rate * 100).toFixed(2), // Format as percentage
    },
    {
      title: 'Term (Months)',
      dataIndex: 'term',
      key: 'term',
      sorter: (a, b) => a.term - b.term,
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
      render: (date) => moment(date).format('YYYY-MM-DD HH:mm'),
      sorter: (a, b) => moment(a.startDate).valueOf() - moment(b.startDate).valueOf(),
    },
    {
      title: 'Maturity Date',
      dataIndex: 'maturityDate',
      key: 'maturityDate',
      render: (date) => moment(date).format('YYYY-MM-DD HH:mm'),
      sorter: (a, b) => moment(a.maturityDate).valueOf() - moment(b.maturityDate).valueOf(),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <p style={{
          fontWeight: '500',
          color: status === 'ACTIVE' ? status === 'WITHDRAWN' ? '' : '#0d6efd' : 'red'
        }}>
          {status}
        </p>
      ),
    },
    {
      title: '',
      dataIndex: '',
      key: 'withdraw',
      render: (_, record) => {
        const isDisabled = record.status !== 'ACTIVE';
        return (
          <Tooltip title={isDisabled ? 'Cannot withdraw from inactive account' : 'Withdraw'}>
            <span
              style={{
                cursor: isDisabled ? 'not-allowed' : 'pointer',
                color: isDisabled ? '#d3d3d3' : '#0d6efd',
              }}
              onClick={() => {
                if (!isDisabled) {
                  showWithdrawModal(record);
                } else {
                  message.warning('This account is inactive. Withdrawal is not allowed.');
                }
              }}
            >
              <PiHandWithdrawFill color="#333" fontSize={22} />
            </span>
          </Tooltip>
        );
      }
    },
  ];


  const _getUser = async () => {
    const url = `https://demoapihistory-hsgagzgtcse4daby.japaneast-01.azurewebsites.net/api/User/get-detail-User`;
    
   
    const data = localStorage.getItem('state') ? JSON.parse(localStorage.getItem('state')) : null;
    const jwt = data ? data.jwt : null;

    if (jwt) { 
      try {
        const rs = await axios.get(url, {
          headers: {
            'Authorization': `Bearer ${jwt}`
          }
        });
        
        setUser(rs.data);
        
       
      } catch (err) {
        
        
      }
    }
  };

  useEffect(() => {
    if (currentStep === 1 && !otpSent) { 
        handleOtpSubmit(); 
    }
  }, [currentStep, otpSent]);
  useEffect(() => {
    _getUser();
  },[]);

  useEffect(() => {
    _getListSaving();
  }, []);

  useEffect(() => {
    let timer;
    if (isCounting && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }else if (countdown === 0) {
      
      setIsCounting(false);
    }

   
    return () => clearInterval(timer);
  }, [isCounting, countdown]);

  const handleSearch = (value) => {
    setSearchTerm(value);
    const filtered = listSaving.filter(
      (item) =>
        item.savingsAccountCode.toLowerCase().includes(value.toLowerCase()) ||
        item.balance.toString().includes(value)
    );
    setFilteredData(filtered);
  };
    return (
        <>
            <main>
           <div className="row main-container">
           <div className="col-2 slide-left">

             <SlideLeft target={target} savingList={savingList} />
           </div>
               <div className="col-10 cardTransactionHistory-right ">
                   <div cdkscrollable="" className="scroll-content">
                   <div className="container-fluid h-100">
                        <div className="row h-100">
                            <div className="col-12 pd-6 pdr-4 h-100">
                            <div className="container-fluid h-100">
  <div className="row h-100">
    <div className="col-12 pd-6 pdr-4 h-100">
      <router-outlet />
      <mbb-information-account _nghost-mda-c209="" className="ng-star-inserted">
        <router-outlet _ngcontent-mda-c209="" />
        <mbb-card-base _nghost-mda-c236="" className="ng-star-inserted">
          <router-outlet _ngcontent-mda-c236="" />
          <mbb-transaction-history
            _nghost-mda-c244=""
            className="ng-star-inserted"
          >
            <div className="d-flex justify-content-between align-items-center">

            <div _ngcontent-mda-c244="" className="breadcrumb">
              <span _ngcontent-mda-c244="" className="title-link active">
                Savings and investment
              </span>
              <span _ngcontent-mda-c244="" className="material-icons">
                keyboard_arrow_right
              </span>
              <span _ngcontent-mda-c244="" className="title-link">
                Digital deposit list
              </span>
            </div>
            
            </div>
            <Search
        placeholder="Search by Account Code or Status"
        allowClear
        onSearch={handleSearch}
        onChange={(e) => handleSearch(e.target.value)}
        style={{ marginBottom: 20, width: 300 }}
      />
            <div>
                <Spin spinning={loanding}>
      <Table
       dataSource={filteredData}
       columns={columns}
       bordered
       pagination={{
        pageSize: 10,
        position: ['bottomCenter'],
      }}
         />
    </Spin>
    <Modal
  title="Withdraw Savings Account"
  visible={isModalVisible}
  onCancel={handleCancel}
  footer={null}
  width={800}
>
  <div style={{ display: 'flex' }}>
    <Steps 
      current={currentStep} 
      onChange={setCurrentStep} 
      direction="vertical"
      style={{ flex: 1 }}
    >
      {steps.map((step, index) => (
        <Step key={index} title={step.title} />
      ))}
    </Steps>

    <div style={{ flex: 2, marginLeft: 20 }}>
      {/* Hiển thị nội dung của bước hiện tại */}
      {steps[currentStep] && (
        <div>
          {steps[currentStep].content}
        </div>
      )}
    </div>
  </div>
</Modal>

    </div>
    
        </mbb-transaction-history>
        </mbb-card-base>
        </mbb-information-account>
        </div>
        </div>
        </div>
        </div>
        </div>
        </div>
        </div>
        </div>
        </div>
        </main>
       
        </>
    )
}
export default SavingList;