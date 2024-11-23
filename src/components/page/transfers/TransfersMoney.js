import { useParams } from "react-router-dom";
import SlideLeft from "../../common/Slide-left";
import { Steps, Button, Form, Input, Select,message, Card, Spin, Modal, Row, Col, Descriptions,Typography } from 'antd';
import { useEffect, useState } from 'react';
import axios from "axios";
import Loader from "../../common/Loader";
import { IoIosCheckmarkCircle, IoIosCloseCircle, IoMdShare } from "react-icons/io";
import { FaFileLines, FaRegCircleUser } from "react-icons/fa6";
import { PiArrowFatLinesRightFill } from "react-icons/pi";

import { 
  BankOutlined, 
  UserOutlined, 
  DollarOutlined, 
  FileTextOutlined, 
  SwapOutlined, 
  EnvironmentOutlined 
} from "@ant-design/icons";

const { Text } = Typography;
const { Step } = Steps;
const { Option } = Select;

const TransfersMoney = () => {
    const target = 1;
    const {transfersMoney} = useParams();
    const [user,setUser] = useState({});
    const [userAccount,setUserAccount] = useState([]);
    const [email, setEmail] = useState("");
    const [countdown, setCountdown] = useState(0);
    const [isCounting, setIsCounting] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [success,setSuccess] = useState({});


    const [current, setCurrent] = useState(0);
    const [form] = Form.useForm();
    const [formData, setFormData] = useState({});
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isSerectCode, setIsSerectCode] = useState(false);
    const [loading, setLoading] = useState(false);
    const [balanceCheckResult, setBalanceCheckResult] = useState(true); // New state for balance check
    const [isDes,setIsDes] = useState(false);
    const handleStart = () => setLoading(true); 
    const handleComplete = () => setLoading(false); 
    const [otp, setOtp] = useState(Array(8).fill("")); 
    const [otpSent, setOtpSent] = useState(false);
    const [moneyValid, setMoneyValid] = useState(true);

 

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
 

  //check account balance before transitioning
  const checkAccountBalance = async (accountNumber, moneyAmount) => {
    setMoneyValid(false);
    const data = localStorage.getItem('state') ? JSON.parse(localStorage.getItem('state')) : null;
      const jwt = data ? data.jwt : null;

    try {
      const response = await axios.get(`https://demoapihistory-hsgagzgtcse4daby.japaneast-01.azurewebsites.net/api/Account/check-account-balance`, {
        params: {
          AccountNumber: accountNumber,
          MoneyAmount: moneyAmount
        },
        headers: {
          'Authorization': `Bearer ${jwt}`
        }
      });
      return response.data; 
    } catch (error) {
      setBalanceCheckResult(false);
      //console.error("Error checking account balance:", error);
      message.error(error.response.data?.errors?.MoneyAmount[0] || error.response.data?.message);
      return null;
    }
  };

  const handleMoneyAmountChange = async (value) => {
    setMoneyValid(false);
    const accountNumber = form.getFieldValue("sourceAccountNumber");
  
    if (accountNumber) {
      const balanceCheck = await checkAccountBalance(accountNumber, value);
      if (balanceCheck) {
        
        // Assuming the API returns a boolean for sufficient balance
        if (!balanceCheck.hasSufficientBalance) {
          setBalanceCheckResult(true);
          setMoneyValid(true);
        }else {  setMoneyValid(false);}
      }else {  setMoneyValid(false);}
    } 
  };

  //check serect code
  const isSerectCodeValid = async () => {
    const data = localStorage.getItem('state') ? JSON.parse(localStorage.getItem('state')) : null;
      const jwt = data ? data.jwt : null;

    try {
      const response = await axios.get(`https://demoapihistory-hsgagzgtcse4daby.japaneast-01.azurewebsites.net/api/User/check-transpassword-exist`, {
        headers: {
          'Authorization': `Bearer ${jwt}`
        }
      });
      setIsSerectCode(true);
      return response.data; 
    } catch (error) {
      setIsSerectCode(false);
      //console.error(error);
      message.error(error.response.data.message);
      return null;
    }
  }

  //check des account
  const handleCheckDesAccount = async (accountNumber) => {
    // Optionally, you might want to validate the format of the account number before calling the API
    
    if (accountNumber) {
      try {
        const data = localStorage.getItem('state') ? JSON.parse(localStorage.getItem('state')) : null;
        const jwt = data ? data.jwt : null;
  
        const response = await axios.get(`https://demoapihistory-hsgagzgtcse4daby.japaneast-01.azurewebsites.net/api/Account/find-one-account?accountNumber=${accountNumber}`, {
          headers: {
            'Authorization': `Bearer ${jwt}`
          }
        });

      
        
        // Assuming the API returns an object with the account holder's name
        if (response.data && response.data.userName) {
          form.setFieldsValue({ desUserName: response.data.userName }); // Auto-fill the Account Holder Name field
          // setDesUserName(response.data.foundAccounts[0].accountName);
        }
        setIsDes(true);
      } catch (error) {
        setIsDes(false);
        //console.error("Error fetching account holder name:", error);
        
      }
    }
  };


  const next = async () => {
    try {
      const otpCode = otp.join(""); // Hợp nhất các chữ số thành chuỗi OTP hoàn chỉnh
    if (otp.length !== 8) {
      message.error("Please enter the complete 8-digit OTP code.");
      return;
    }
      const values = await form.validateFields();
      setFormData({ ...formData, ...values,otp: otpCode });

  
      // Await the secret code validation
      //const isCodeValid = await isSerectCodeValid();
  
      setCurrent(current + 1);
      // Check if we're at the "Receiver Information" step
      if (current === 1) {
        // Check if the secret code is valid
        // if (!isCodeValid) {
        //   setIsModalVisible(true);
        //   return;
        // } else {
        //   setCurrent(current + 1);
        // }
  
        // Check if there is sufficient balance
        if (!balanceCheckResult) {
          message.error("Balance not enough");
          return;
        } 
  
        
      } else {
        // Move to the next step
        setCurrent(current + 1);
       
      }
  
    } catch (error) {
      message.error("Please fill out all required fields.");
      //console.error(error);
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

//   const handlePaste = (e) => {
//     e.preventDefault();
//     const pasteData = e.clipboardData.getData("text").trim(); // clear space
//     const numericData = pasteData.replace(/\D/g, ""); // remove not number characters

//     if (numericData.length === 8) {
//         setOtp(numericData.split(""));
//         form.setFieldsValue({ otp: numericData.split("") });
//     } else {
//         message.error("Please paste a complete 8-digit OTP.");
//     }
// };

  const handleBackspace = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const newOtp = [...otp];
      newOtp[index - 1] = ""; 
      setOtp(newOtp);
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };


  const handleSendOtp = async () => {
    setIsLoading(true);
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
        message.success("OTP has been sent to your email.");
        setIsLoading(false);
        setOtpSent(true);
    } catch (error) {
        message.error("Failed to send OTP. Please try again.");
        //console.error(error);
    }
};
  useEffect(() => {
    if (current === 2 && !otpSent) { 
      handleSendOtp(); 
    }
  }, [current, otpSent]);



  const prev = () => setCurrent(current - 1);

  const handleSubmitTransfer = async () => {
    setLoading(true);
    
    const data = localStorage.getItem('state') ? JSON.parse(localStorage.getItem('state')) : null;
    const jwt = data ? data.jwt : null;
    try {
      // Final transfer submission API call
      const rs = await axios.post("https://demoapihistory-hsgagzgtcse4daby.japaneast-01.azurewebsites.net/api/Account/make-money-transfer", formData,{
        headers: {
          'Authorization': `Bearer ${jwt}`
        }
      });
      setLoading(false);
      setCurrent(current + 1);
      message.success("Transfer completed successfully!");
      setSuccess(rs.data);
    } catch (error) {
      setLoading(false);
      message.error("Verification Code something wrong. Please try again.");
   
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
    if (userAccount.some(account => account.accountNumber === transfersMoney)) {
      form.setFieldsValue({ sourceAccountNumber: transfersMoney });
    }
    form.setFieldsValue({ beneficiaryBank: 'obbank' });
  }, [transfersMoney, userAccount]);
  useEffect(() => {
    let timer;
    if (isCounting && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }else if (countdown === 0) {
      
      setEmail("");
      setIsCounting(false);
    }

   
    return () => clearInterval(timer);
  }, [isCounting, countdown]);

  const steps = [
    {
      title: "Transfer Information",
      icon: <IoIosCheckmarkCircle />,
      content: (
        <Form form={form} layout="vertical">
          <Form.Item
            label="Transfer Method"
            name="transferMethod"
            initialValue="bank"
            rules={[{ required: true, message: "Please select a transfer method" }]}
          >
            <Select placeholder="Select transfer method" defaultValue="bank"> 
              <Option value="bank">Transfer money via account number</Option>
              <Option value="mobile">Mobile Wallet</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Source Account"
            name="sourceAccountNumber"
            rules={[{ required: true, message: "Please select a source account" }]}
          >
            <Select placeholder="Select source account">
              {userAccount.map((item,index) =>{
                  return (

                    <Option key={`${item.accountNumber}-${index}`} value={item.accountNumber}>{item.accountNumber} (${item.balance?.toLocaleString('en-US')})</Option>
                  )
              })}
              
            </Select>
          </Form.Item>
        </Form>
      ),
    },
    {
        title: "Receiver Information",
        content: (
          <Form form={form} layout="vertical">
            <Form.Item
              label="Beneficiary Bank"
              name="beneficiaryBank"
              rules={[{ required: true, message: "Please select a bank" }]}
            >
              <Select placeholder="Select beneficiary bank" defaultValue="obbank">
                <Option value="obbank">
                  <img src="/images/favicon.ico" width={25} alt="OB Bank Logo" /> OB Bank
                </Option>
              
              </Select>
            </Form.Item>
            <Form.Item
              label="Account Number"
              name="desAccountNumber"
              rules={[{ required: true, message: "Please enter an account number" }]} 
            >
              <Input placeholder="Enter account number" onChange={(e) => handleCheckDesAccount(e.target.value)}/>
            </Form.Item>
            <Form.Item
              label="Account Holder Name"
              name="desUserName"
              rules={[{ required: true, message: "Please enter the account holder name" }]}
            >
              <Input disabled={isDes} placeholder="Enter account holder name" />
            </Form.Item>
            <Form.Item
              label="Money Amount"
              name="moneyAmount"
              rules={[{ required: true, message: "Please enter the amount" }]}
            >
              <Input type="number" placeholder="Enter transfer amount" onChange={(e) => handleMoneyAmountChange(e.target.value)}  style={{
            borderColor: !balanceCheckResult ? 'red' : '' 
          }}/>
            </Form.Item>
            <Form.Item
              label="Message"
              name="transactionMessage"
              rules={[{ required: true, message: "Please enter content" }]}
            >
              <Input placeholder="Enter content or reference" />
            </Form.Item>
           
          
          </Form>
        ),
    },      
    {
      title: "Confirm Information",
      content: (
        <Form form={form} layout="vertical"
        initialValues={{email: user.email}}>
          <Card
      title={<Text strong style={{ fontSize: "18px" }}>Transfer Details Confirmation</Text>}
      bordered={true}
      style={{
        width: "100%",
        marginTop: "16px",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
      bodyStyle={{
        background: "#fafafa",
        padding: "16px 24px",
        borderRadius: "8px",
      }}
    >
      <Descriptions
        column={1}
        labelStyle={{
          fontWeight: "bold",
          color: "#555",
          fontSize: "16px",
        }}
        contentStyle={{
          fontSize: "15px",
        }}
      >
        <Descriptions.Item 
          label={<><SwapOutlined style={{marginRight: "8px" }} />Transfer Method</>}>
          {formData.transferMethod}
        </Descriptions.Item>
        
        <Descriptions.Item 
          label={<><EnvironmentOutlined style={{marginRight: "8px" }} />Source Account</>}>
          {formData.sourceAccountNumber}
        </Descriptions.Item>
        
        <Descriptions.Item 
          label={<><BankOutlined style={{marginRight: "8px" }} />Beneficiary Bank</>}>
          {formData.beneficiaryBank}
        </Descriptions.Item>
        
        <Descriptions.Item 
          label={<><FileTextOutlined style={{marginRight: "8px" }} />Account Number</>}>
          {formData.desAccountNumber}
        </Descriptions.Item>
        
        <Descriptions.Item 
          label={<><UserOutlined style={{marginRight: "8px" }} />Account Holder Name</>}>
          {formData.desUserName}
        </Descriptions.Item>
        
        <Descriptions.Item 
          label={<><DollarOutlined style={{ marginRight: "8px" }} />Amount</>}>
          <Text strong>
            {formData.moneyAmount?.toLocaleString('en-US')} USD
          </Text>
        </Descriptions.Item>
        
        <Descriptions.Item 
          label={<><FileTextOutlined style={{marginRight: "8px" }} />Content</>}>
          {formData.transactionMessage}
        </Descriptions.Item>
      </Descriptions>

      <Button 
                type= {isLoading ? "default" : 'primary'}
                onClick={handleSendOtp} 
                disabled={isCounting} 
                style={{ margin: "16px 0" }}
            >
              
              {isLoading ? (
                <Spin color="#fff"/>
              ) : otpSent ? (
                'Resend OTP'  
              ) : (
                'Receive OTP'
              )}
            </Button>
            {isCounting && (
              <p style={{ color: "red" }}>
                Code is valid for: {countdown} seconds
              </p>
            )}

            {/* OTP FIELD */}
            <Form.Item label="Verification Code OTP" 
            name="otp"
                rules={[{ required: true, message: "Please enter your OTP." }]}
            >
      <div style={{ display: "flex", gap: "8px" }}>
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
      </div>
      
    </Form.Item>
      
    </Card>
          
{/*       
          <Form.Item
                label="Email"
                name="email"
                
                rules={[{ required: true, message: "Please enter your email to receive the OTP." }]}
            >
                <Input value={email}  placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} />
          </Form.Item> */}

            
            
        </Form>
      ),
    },
    {
      title: "Confrim Transfer",
      content: <p>Are you sure?</p>,
    },
    {
      title: "Transaction Success",
      content: (
        <>
          <Row>
            <Col span={24} style={{lineHeight: '25px',background: '#0d6efd', color: '#fff', padding: '10px 0',borderRadius: '10px'}}>
            <div style={{textAlign: 'center',margin: '10px 0'}}>
              <img src="/images/check_v.png" width={35} alt="check"></img>
              <p>You have transferred money successfully</p>
              <p style={{fontSize: '3.5em',fontWeight: '500'}}>{success.amount?.toLocaleString('en-US')} USD</p>
              <p style={{borderRadius: '20px',background: '#fff',color: '#0d6efd',display: 'block',width: 'fit-content',margin: '0 auto',padding: '2px 12px'}}><IoMdShare color="#0d6efd" className=""/> Share</p>
            </div>
            <div style={{margin: '0 20px',color: '#333'}}>

              <Row>
               
                
                <Col span={11} style={{background: '#fff',borderRadius: '23px',padding: '0 15px'}}>
                  <p style={{margin: '0', color: 'rgba(0,0,0,0.5)'}}>Source account</p>
                  <div className="d-flex align-items-center gap-2 lh-1">
                    <img src="/images/favicon.ico" width={25} height={25} alt="icon"></img>
                    <div>
                      <h1 style={{fontWeight: '700'}}>{user.name}</h1>
                      <p>{success.sourceAccountNumber}</p>
                    </div>
                  </div>
                </Col>
                <Col span={2} className="d-flex align-items-center justify-content-center">
                  <PiArrowFatLinesRightFill color="#fff" fontSize={'2em'}/>
                </Col>
                <Col span={11} style={{background: '#fff',borderRadius: '23px',padding: '0 15px'}}>
                  <p style={{margin: '0', color: 'rgba(0,0,0,0.5)'}}>To account</p>
                  <div className="d-flex align-items-center gap-2 lh-1">
                    <img src="/images/favicon.ico" width={25} height={25} alt="icon"></img>
                    <div>
                      <h1 style={{fontWeight: '700'}}>{success.desAccountOwnerName}</h1>
                      <p>{success.desAccountNumber}</p>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
            <div className="d-flex justify-content-between" style={{margin: '10px 20px',color: '#333',background: '#fff',borderRadius: '23px',padding: '10px 15px'}}>
              <div style={{color: 'rgba(0,0,0,0.5)'}}>
                  <p>Message</p>
                  <p>Time</p>
                  <p>Transaction Type</p>
                  <p>Transaction Code</p>
              </div>
              <div className="d-flex flex-column align-items-end" style={{fontWeight: '500'}}>
                  <p>{success.transactionMessage}</p>
                  <p>{formatDate(success.transactionDate)}</p>
                  <p>{success.transactionType}</p>
                  <p>{success.transactionCode}</p>
              </div>
            </div>
            <div style={{margin: '10px 10px',color: '#0d6efd',borderRadius: '23px',padding: '0px 15px'}}>
              <Row>
                <Col span={11} style={{background: '#fff',borderRadius: '23px',padding: '10px 15px 0px 15px',display: 'flex',gap: '12px',fontWeight: '500',alignItems: 'center',cursor: 'pointer'}}>
                  <p><FaRegCircleUser fontSize={'1.2em'}/></p>
                  <p>Save beneficiary</p>
                </Col>
                <Col span={2}></Col>
                <Col span={11} style={{background: '#fff',borderRadius: '23px',padding: '10px 15px 0px 15px',display: 'flex',gap: '12px',fontWeight: '500',alignItems: 'center',cursor: 'pointer'}}>
                  <p><FaFileLines fontSize={'1.2em'}/></p>
                  <p>Save transaction template</p>
                </Col>
              </Row>
            </div>
            </Col>
          
          </Row>
        </>
      ),
    }
  ];


    return (
      <>
      {loading ? (
          <Loader />
      ) : ( 
        <main>
          <div className="row main-container">
            <div className="col-2 slide-left">
              <SlideLeft target={target} transfersMoney={transfersMoney} />
            </div>
            <div className="col-10 slide-right transfers-container">
              <div cdkscrollable="" className="scroll-content">
                <div className="container-fluid h-100">
                <div className="row h-100">
                <div className="col-12 pd-6 pdr-4 h-100">
                <div _ngcontent-mda-c225="" className="step-body ng-star-inserted" style={{}}>
                <div _ngcontent-mda-c225="" className="container-transfer-info">
                <>
                <Steps direction="vertical" current={current}>
  {steps.map((item, index) => (
    <Step
      key={item.title}
      title={
        <div
          style={{
            fontSize: index === current ? "30px" : "16px",
            fontWeight: index === current ? "bold" : "",
            color: index === current ? "#0d6efd" : "rgba(0,0,0,0.5)",
            transition: "font-size 0.3s, color 0.3s", // Thêm hiệu ứng chuyển đổi mượt
          }}
        >
          {item.title}
        </div>
      }
      icon={
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 32,
            height: 32,
            borderRadius: "50%",
            backgroundColor: index <= current ? "#0d6efd" : "#d9d9d9",
            color: "#fff",
            fontSize: "16px",
          }}
        >
          {index <= current ? (
            <IoIosCheckmarkCircle />
          ) : (
            <IoIosCloseCircle />
          )}
        </div>
      }
      description={
        index === current ? (
          <div style={{ marginTop: "16px" }}>
            {item.content}
            <div style={{ marginTop: "16px" }}>
              {index < steps.length - 2 && (
                <Button
                  type="primary"
                  onClick={next}
                  loading={loading}
                  style={{ marginRight: "8px" }}
                  disabled={!moneyValid}
                >
                  Next
                </Button>
              )}
              
              {index === steps.length - 2 && (
                <Button
                  type="primary"
                  onClick={handleSubmitTransfer}
                  loading={loading}
                >
                  Confirm Transfer
                </Button>
              )}
              {index === steps.length - 1 && (
                <Button type="primary" onClick={handleComplete}>
                  Finish
                </Button>
              )}
              {index > 0 && (
                <Button style={{ margin: "0 8px" }} onClick={prev}>
                  Previous
                </Button>
              )}
            </div>
          </div>
        ) : null
      }
    />
  ))}
</Steps>



                </>
                </div>
                </div>
              
                </div>
                </div>
                
                </div>
               
              </div>
            </div>
          </div>
          
        </main>

      )}
      </>
    );
}
export default TransfersMoney;