import React, { useEffect, useState } from "react";

import { useNavigate, useNavigation, useParams } from "react-router-dom";
import SlideLeft from "../common/Slide-left";
import { Steps, Button, Form, Input, Select, message, Card, Typography, Spin, Modal, Table } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import axios from "axios";
import { FaCircleInfo } from "react-icons/fa6";

const { Step } = Steps;
const { Option } = Select;
const { Title , Text } = Typography;

const SavingsAccount = () => {
    const target = 2;
    const {savings} = useParams();
    const [user,setUser] = useState({});
    const [userAccount,setUserAccount] = useState([]);
 
    const navigator = useNavigate();

    const [currentStep, setCurrentStep] = useState(0);
    const [isNextDisabled, setIsNextDisabled] = useState(false);
    const [form] = Form.useForm();
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleStart = () => setLoading(true); 
  const handleComplete = () => setLoading(false); 
  const [otp, setOtp] = useState(Array(8).fill("")); 
  const [otpSent, setOtpSent] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [isCounting, setIsCounting] = useState(false);
  const [current, setCurrent] = useState(0);
  const [rqData,setRqData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const next = () => setCurrentStep((prev) => prev + 1);
  const prev = () => setCurrentStep((prev) => prev - 1);

   // savings 
   const data = [
    {
      key: '1',
      term: 'Under 1 month',
      rate: '0.2 %',
    },
    {
      key: '2',
      term: 'From 1 month to less than 2 months',
      rate: '1.7%',
    },
    {
      key: '3',
      term: 'From 2 months to less than 3 months',
      rate: '1,7 %',
    },
    {
      key: '4',
      term: 'From 3 months to under 4 months',
      rate: '2%',
    },
    {
      key: '5',
      term: 'From 4 months to under 5 months',
      rate: '2%',
    },
    {
      key: '6',
      term: 'From 5 months to under 6 months',
      rate: '2%',
    },
    {
      key: '7',
      term: 'From 6 months to under 7 months',
      rate: '3%',
    },
    {
      key: '8',
      term: 'From 7 months to under 8 months',
      rate: '3%',
    },
    {
      key: '9',
      term: 'From 8 months to under 9 months',
      rate: '3%',
    },
    {
      key: '10',
      term: 'From 9 months to under 10 months',
      rate: '3%',
    },
    {
      key: '11',
      term: 'From 10 months to under 11 months',
      rate: '3%',
    },
    {
      key: '12',
      term: 'From 11 months to under 12 months',
      rate: '3%',
    },
    {
      key: '13',
      term: '12 months',
      rate: '4.7%',
    },
    {
      key: '14',
      term: 'Over 12 months to 13 months',
      rate: '4.7%',
    },
    {
      key: '15',
      term: 'Over 13 months to under 18 months',
      rate: '4.7%',
    },
    {
      key: '16',
      term: 'Over 18 months to under 24 months',
      rate: '4.7%',
    },
    {
      key: '17',
      term: 'Over 24 months to under 36 months',
      rate: '4.8%',
    },
    {
      key: '18',
      term: '36 months',
      rate: '4.8%',
    },
    {
      key: '19',
      term: 'Over 36 months',
      rate: '4.8%',
    },
    
  ];

  // table of contents
  const columns = [
    {
      title: 'Term',
      dataIndex: 'term',
      key: 'term',
      align: 'start',
      render: text => <strong>{text}</strong>,
    },
    {
      title: 'Rate (%/year)',
      dataIndex: 'rate',
      key: 'rate',
      align: 'center',
      render: text => <span style={{ color: '#1890ff', fontWeight: 'bold' }}>{text}</span>,
    },
  ];


  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-GB", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$3/$2/$1');
  };

  const handleFormSubmit = (values) => {
    if (values.amount < 500) {
      message.error("The minimum deposit amount is $500.");
      return;
    }
   
    setFormData({
        ...formData,
        depositAmount: values.depositAmount,
        term: values.term,
        sourceAccountNumber: values.sourceAccountNumber
      });
      setCurrentStep(1);
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
        //console.error(error);
    }
  };
  useEffect(() => {
    if (currentStep === 1 && !otpSent) { 
        handleOtpSubmit(); 
    }
  }, [currentStep, otpSent]);

  const handleSubmitForm = async () => {
    const otpCode = otp.join(""); 
  
    
    if (otpCode.length !== 8) { 
      message.error("Please enter a valid OTP.");
      return;
    }
  
    const data = localStorage.getItem('state') ? JSON.parse(localStorage.getItem('state')) : null;
    const jwt = data ? data.jwt : null;
  
  
    const { depositAmount, sourceAccountNumber, term } = formData;
  
    
    const requestData = {
      depositAmount,
      sourceAccountNumber,
      term,
      otp: otpCode,
    };

  
  
    setIsLoading(true);
  
    try {
     
      const response = await axios.post(
        "https://demoapihistory-hsgagzgtcse4daby.japaneast-01.azurewebsites.net/api/SavingsAccount/create-savings-account",
        requestData,
        {
          headers: { 'Authorization': `Bearer ${jwt}` },
        }
      );

      console.log("savings success: ",response.data);
  
      if (response.status === 200) {
        message.success("Savings account created successfully!");
     
        // next step
        setCurrentStep(2);
        setRqData(response.data);

      } else {
        message.error("Failed to create savings account. Please try again.");
      }
    } catch (error) {
      const errorData = error.response?.data; // Safely access response data
      if (errorData) {
        const errorMessage = errorData.errors
          ? Object.values(errorData.errors).flat().join(", ") // Flatten and join validation errors
          : errorData.title || "An unknown error occurred.";
        message.error(errorMessage);
      } else {
        message.error("Failed to create savings account. Please try again.");
      }
      //console.error("Error creating savings:", error);
    } finally {
      setIsLoading(false);
    }
  };
  

  const handleSourceAccountChange = async (value) => {
    const data = localStorage.getItem('state') ? JSON.parse(localStorage.getItem('state')) : null;
    const jwt = data ? data.jwt : null;

    const amount = parseFloat(form.getFieldValue("depositAmount"));
    const accNumber = form.getFieldValue("sourceAccountNumber");
    const term = parseInt(form.getFieldValue("term"));
    if (!amount || amount < 100) {
      message.error("Please enter a valid deposit amount first.");
      return;
    }


    try {
      const response = await axios.get(
        `https://demoapihistory-hsgagzgtcse4daby.japaneast-01.azurewebsites.net/api/SavingsAccount/check-account-balance`,
        {
          params: {
            MoneyAmount: amount,
            AccountNumber: value,
          },
        headers: {
          'Authorization': `Bearer ${jwt}`
        }
        }
      );

      if (!response) {
        message.error("Insufficient balance in the selected account.");
        setIsNextDisabled(true); 
        form.resetFields(["sourceAccountNumber"]);    
      }else {
        setFormData(prev => ({
            ...prev,
            depositAmount: amount,
            sourceAccountNumber: value,
            
            term: term,  
          }));
        setIsNextDisabled(false); 
      }
    } catch (error) {
      //console.error(error);
      setIsNextDisabled(true); 
      message.error(error.response?.data?.message || "Insufficient balance in the selected account.");
    }
  };
  const handleAmountChange = async (e) => {
    const data = localStorage.getItem('state') ? JSON.parse(localStorage.getItem('state')) : null;
    const jwt = data ? data.jwt : null;
    const amount = e.target.value; 
    const sourceAccount = form.getFieldValue("sourceAccountNumber");
    const term = form.getFieldValue("term");

    if (!amount || amount < 500) {
      setIsNextDisabled(true); 
      return;
    }

    if (sourceAccount) {
      try {
        
        const response = await axios.get(
          "https://demoapihistory-hsgagzgtcse4daby.japaneast-01.azurewebsites.net/api/SavingsAccount/check-account-balance",
          {
            params: { MoneyAmount: amount, AccountNumber: sourceAccount },
            headers: {
                'Authorization': `Bearer ${jwt}`
              }
          }
        );

        console.log(response);

        if (!response) {
          message.error("The balance in the source account is insufficient.");
          setIsNextDisabled(true); 
        } else {
            setFormData(prev => ({
                ...prev,
                depositAmount: amount,
                sourceAccountNumber: sourceAccount,
                term: term,  
              }));
          setIsNextDisabled(false); 
        }
      } catch (error) {
        //console.error("Lỗi khi kiểm tra số dư:", error);
        setIsNextDisabled(true); 
        message.error(error.response.data.message);
      }
    }
  };

  const _getListUserAccount = async () => {
    handleStart();
    const url = `https://demoapihistory-hsgagzgtcse4daby.japaneast-01.azurewebsites.net/api/Account/list-user-accounts`;
    
   
    const data = localStorage.getItem('state') ? JSON.parse(localStorage.getItem('state')) : null;
    const jwt = data ? data.jwt : null;

    if (jwt) { 
      try {
        const rs = await axios.get(url, {
          headers: {
            'Authorization': `Bearer ${jwt}`
          }
        });
        
        setUserAccount(rs.data.result.data);
       
        handleComplete();
      } catch (err) {
        handleStart();
        //console.error(err);
      }
    }
  };

  const makeAnother = () => {
    window.location.reload();
  }

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
        
        //console.error(err);
      }
    }
  };
  useEffect(() => {
    _getUser();
  },[]);
  useEffect(() => {
    _getListUserAccount();
  },[]);

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

  const steps = [
    {
      title: "Register Savings Form",
      content: (
        <Form form={form} layout="vertical" onFinish={(values) => {
          setCurrentStep(1); 
          handleFormSubmit(values);
        }}>
          <Form.Item
            label="Deposit Amount"
            name="depositAmount"
            rules={[{ required: true, message: "Please input the deposit amount!" },
              {
                validator: (_, value) =>
                  value >= 500
                    ? Promise.resolve() 
                    : Promise.reject(new Error("The amount must be at least $500!")),
              },
            ]}
          >
            <Input type="number" placeholder="Enter amount (min $500)" onChange={handleAmountChange}/>
          </Form.Item>

          <Form.Item
            label="Interest Period"
            name="term"
            rules={[{ required: true, message: "Please select an interest period!" }]}
          >
            <Select placeholder="Select period">
              <Option value="1">1 Month / 0.2 %</Option>
              <Option value="3">3 Months / 1.7 %</Option>
              <Option value="6">6 Months / 2 %</Option>
              <Option value="12">12 Months / 3 %</Option>
              <Option value="36">36 Months / 5 %</Option>
              <Option value="above36">Above 36 Months / 5 %</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Source Account"
            name="sourceAccountNumber"
            rules={[{ required: true, message: "Please select a source account!" }]}
          >
            <Select placeholder="Select account"
                    onChange={handleSourceAccountChange}
            >
              {userAccount.map((item,index) =>{
                return (
                    
                    <Option key={`${item.accountNumber}-${index}`} value={item.accountNumber}>{item.accountNumber} (${item.balance.toLocaleString('en-US')})</Option>
                )
              })}  
             
            </Select>
          </Form.Item>

          <Button 
          type="primary" 
          htmlType="submit" 
           
          disabled={isNextDisabled}>
            Next
          </Button>
        </Form>
      ),
    },
    {
      title: "Verify OTP",
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
            onClick={handleSubmitForm}
            loading={isLoading}
            disabled={otp.includes("")} // Disable button if OTP is incomplete
            style={{ marginTop: "0px" }}
          >
            Register
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
        title: "Success",
        content: (
          <div style={{ textAlign: "center" }}>
            <CheckCircleOutlined
              style={{ fontSize: "48px", color: "green", marginBottom: "16px" }}
            />
            <Title level={3}>Deposit Successful!</Title>
            <div
      style={{
        padding: "20px",
        maxWidth: "400px",
        margin: "0 auto",
        fontFamily: "Arial, sans-serif",
        lineHeight: "1.6",
      }}
    >
      <p style={{ marginBottom: "8px",display: 'flex', justifyContent: 'space-between' }}>
        <Text strong style={{ color: "#4caf50" }}>
          Interest Period:
        </Text>{" "}
        <span style={{fontWeight: '600'}}>{rqData.term} months</span>
      </p>
      <p style={{ marginBottom: "8px",display: 'flex', justifyContent: 'space-between'  }}>
        <Text strong style={{ color: "#4caf50" }}>
          Source Account:
        </Text>{" "}
        <span style={{fontWeight: '600'}}>{rqData.sourceAccountNumber}</span>
      </p>
      <p style={{ marginBottom: "8px",display: 'flex', justifyContent: 'space-between'  }}>
        <Text strong style={{ color: "#4caf50" }}>
          Savings Account Code:
        </Text>{" "}
        <span style={{fontWeight: '600'}}>{rqData.savingsAccountCode}</span>
      </p>
      <p style={{ marginBottom: "8px",display: 'flex', justifyContent: 'space-between'  }}>
        <Text strong style={{ color: "#4caf50" }}>
          Transaction Code:
        </Text>{" "}
        <span style={{fontWeight: '600'}}>{rqData.transactionCode}</span>
      </p>
      <p style={{ marginBottom: "8px",display: 'flex', justifyContent: 'space-between'  }}>
        <Text strong style={{ color: "#4caf50" }}>
          Start Date:
        </Text>{" "}
        <span style={{fontWeight: '600'}}>{formatDate(rqData.startDate)}</span>
      </p>
      <p style={{ marginBottom: "8px",display: 'flex', justifyContent: 'space-between'  }}>
        <Text strong style={{ color: "#4caf50" }}>
          Maturity Date:
        </Text>{" "}
        <span style={{fontWeight: '600'}}>{formatDate(rqData.maturityDate)}</span>
      </p>
    </div>
            <Button type="primary" onClick={() => makeAnother()}>
              Make Another Deposit
            </Button>
          </div>
        ),
      }
      
  ];

  
    
    return (
        <>
            <main>
           <div className="row main-container">
           <div className="col-2 slide-left">

             <SlideLeft target={target} savings={savings} />
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
                Open digital savings account
              </span>
            </div>
            <div type="primary" onClick={showModal} style={{cursor: 'pointer', color: '#0d6efd'}}>
              <p><FaCircleInfo color="#0d6efd" fontSize={20}/>View Deposit Interest Rates</p>
            </div>
            <Modal
        title={<Title level={2}>Interest Rates for Deposits for Different Terms</Title>}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={'90vw'}
        
        footer={[
          <Button key="back" onClick={handleCancel}>
            Close
          </Button>,
        ]}
      >
        <Table 
          columns={columns} 
          dataSource={data} 
          pagination={false} 
          bordered
        />
        <p className="p-4" style={{background: 'rgb(237,248,253)', marginTop: '10px'}}>
        <p className="font-semibold" style={{fontWeight: '600'}}>Note:</p>
          <div className="text-base leading-normal post-detail prose max-w-full font-medium prose-ol:marker:text-primary prose-ul:marker:text-primary prose-li:marker:text-primary"><p>
            <em>The above interest rates are for reference only and may vary depending on the location. For specific interest rates, please contact OBBank Branches/Transaction Offices nationwide.
              </em></p>
          </div>
        </p>
      </Modal>

            </div>
            <div>
            <Card
      style={{
        maxWidth: "900px",
        margin: "20px auto",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        padding: "24px",
      }}
    >
     
      <Steps current={currentStep}>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div style={{ marginTop: "24px" }}>{steps[currentStep].content}</div>
    </Card>
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
export default SavingsAccount;