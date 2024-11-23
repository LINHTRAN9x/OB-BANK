import { useParams } from "react-router-dom";

import SlideLeft from "../common/Slide-left";
import { IoIosArrowDown } from "react-icons/io";
import { Button, Form, Input, message, Modal, notification, Select, Spin, Upload } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import TextArea from "antd/es/input/TextArea";
import { PlusOutlined } from '@ant-design/icons';
import { CiCirclePlus,PiHandWithdraw } from "react-icons/ci";
import { PiHandWithdrawFill } from "react-icons/pi";
import { Collapse } from "react-bootstrap";
import { FaArrowTurnUp, FaChevronUp } from "react-icons/fa6";
import Loader from "../common/Loader";


const Cheque = ({continent}) => {
    const target = 7;
    const [user,setUser] = useState({});
    const [file, setFile] = useState([]);
    const [fileWithdraw, setFileWithdraw] = useState([]);
    const [isCheque,setIsCheque] = useState({});
    const [isChequeWithdraw,setIsChequeWithdraw] = useState({});
    const [cheques, setCheques] = useState([]);
    //loading
  const [loading, setLoading] = useState(false);
  const handleStart = () => setLoading(true); 
  const handleComplete = () => setLoading(false); 

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isWithdrawModalVisible, setWithdrawModalVisible] = useState(false);
    const [isOtpModalVisible, setIsOtpModalVisible] = useState(false);
    const [otp, setOtp] = useState(Array(8).fill(''));
    const [currentCheckBookCode, setCurrentCheckBookCode] = useState(null);
    const [countdown, setCountdown] = useState(0);
  const [isCounting, setIsCounting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
 
      const showModal = () => {
        setIsModalVisible(true);
      };
    
      const handleOk = () => {
        setIsModalVisible(false);
      };
    
      const handleCancel = () => {
        setIsModalVisible(false);
      };

      const showWithdrawModal = () => {
        setWithdrawModalVisible(true);
      };
      const handleWithdrawCancel = () => {
        setWithdrawModalVisible(false);
      };


      const uploadImage = async (file) => {
        const formData = new FormData();
        formData.append('file', file); // `file` img upload
      
        try {
          const response = await axios.post(
            'https://demoapihistory-hsgagzgtcse4daby.japaneast-01.azurewebsites.net/api/Upload/upload-image',
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            }
          );
          return response.data; 
        } catch (error) {
          //console.error('Lỗi khi upload ảnh:', error);
          return null;
        }
      };

      const handleUploadChange = (info, setFileList) => {
        setFileList(info.fileList.slice(-1));
      };
      const handleUploadWithdraw = (info, setFileWithdraw) => {
        setFileWithdraw(info.fileWithdraw.slice(-1));
      };


    
      const onFinish = async (values) => {
       

        const url = `https://demoapihistory-hsgagzgtcse4daby.japaneast-01.azurewebsites.net/api/CheckBook/request-check-book`;
    
   
        const data = localStorage.getItem('state') ? JSON.parse(localStorage.getItem('state')) : null;
        const jwt = data ? data.jwt : null;

        // Ensure file exists before attempting to upload
          let digitalSignatureUrl = null;
          if (file[0]) {
            try {
              digitalSignatureUrl = await uploadImage(file[0].originFileObj);
           
              if (!digitalSignatureUrl) {
                openNotification('error', 'Failed to upload digital signature. Please try again.');
                return;
              }
            } catch (error) {
              //console.error('Image upload failed:', error);
              openNotification('error', 'Error uploading image. Please try again.');
              return;
            }
          }
         
          
        if (jwt) { 
          try {
            const rs = await axios.post(url,{ 
              accountNumber: values.accountNumber,
              deliveryAddress: values.deliveryAddress, 
              digitalSignatureUrl: digitalSignatureUrl?.link

            
            }, {
              headers: {
                'Authorization': `Bearer ${jwt}`,
                
              }
            });
       
            openNotification('success',rs.data);
            await _listCheque();
            handleOk();
          } catch (err) {
            openNotification('error', err.response.data.message)
            //console.error(err);
          }
        }
        
      };

      const onWithdrawFinish = async (values) => {
       

        const url = `https://demoapihistory-hsgagzgtcse4daby.japaneast-01.azurewebsites.net/api/CheckBook/submit-check-process-request`;
    
   
        const data = localStorage.getItem('state') ? JSON.parse(localStorage.getItem('state')) : null;
        const jwt = data ? data.jwt : null;

        // Ensure file exists before attempting to upload
          let checkFrontImageUrl = null;
          if (file[0]) {
            try {
              checkFrontImageUrl = await uploadImage(fileWithdraw[0].originFileObj);
           
              if (!checkFrontImageUrl) {
                openNotification('error', 'Failed to upload image. Please try again.');
                return;
              }
            } catch (error) {
              //console.error('Image upload failed:', error);
              openNotification('error', 'Error uploading image. Please try again.');
              return;
            }
          }
          

        if (jwt) { 
          try {
            const rs = await axios.post(url,{ 
              accountNumber: values.accountNumber,
              deliveryAddress: values.deliveryAddress, 
              checkFrontImageUrl: checkFrontImageUrl?.link

            
            }, {
              headers: {
                'Authorization': `Bearer ${jwt}`,
                
              }
            });
         
            handleWithdrawCancel();
            openNotification('success',rs.data);
            //window.location.reload();
           
          } catch (err) {
            openNotification('error','something went wrong')
            //console.error(err);
          }
        }       
      };

      const handleStopCheque = (checkBookCode) => {
        Modal.confirm({
          title: 'Are you sure you want to stop this cheque?',
          content: 'This action cannot be undone.',
          okText: 'Yes',
          cancelText: 'No',
          onOk: () => {
            setCurrentCheckBookCode(checkBookCode); // Lưu mã séc hiện tại
            setIsOtpModalVisible(true); // Hiển thị modal OTP
        },
        });
      };

      const handlePaste = (e) => {
        e.preventDefault();
        const pasteData = e.clipboardData.getData("text").trim(); // clear space
        const numericData = pasteData.replace(/\D/g, ""); // remove not number characters
    
        if (numericData.length === 8) {
            setOtp(numericData.split(""));
            
        } else {
            message.error("Please paste a complete 8-digit OTP.");
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

      const handleChange = (value, index) => {
        if (isNaN(value)) return; 
    
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
    
        
        if (value && index < 7) {
          document.getElementById(`otp-input-${index + 1}`).focus();
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
        } catch (error) {
            message.error("Failed to send OTP. Please try again.");
            //console.error(error);
        }
    };

      const stopCheque = async (code) => {
        const data = localStorage.getItem('state') ? JSON.parse(localStorage.getItem('state')) : null;
        const jwt = data ? data.jwt : null;

        if (!otp) {
          openNotification('error', 'Please enter a valid OTP');
          return;
      }
        try{
          const rs = await axios.put('https://demoapihistory-hsgagzgtcse4daby.japaneast-01.azurewebsites.net/api/CheckBook/stop-checkbook',
            {
              checkBookCode: currentCheckBookCode,
              otp : code,
          },{
            headers: {
              'Authorization': `Bearer ${jwt}`,
              
            }
          })
    
          openNotification('success','Stop cheque completed successfully')
          window.location.reload();
        }catch(e){
          //console.error(e);
          openNotification('error','Stop cheque error occurred')
        }
      }

      const openNotification = (type, message) => {
        notification[type]({
            message: type === 'error' ? 'Error' : 'Success',
            description: message,
        });
    };
    const statusColors = {
      PENDING: '#FFA500',     
      APPROVED: '#4CAF50',    
      SHIPPING: '#1E90FF',    
      DELIVERED: '#8B4513',   
      WORKING: '#20c997',      
    };
    const statusDisplay = {
      PENDING: 'block',     
      APPROVED: 'none',    
      SHIPPING: 'none',    
      DELIVERED: 'none',   
      WORKING: 'block', 
      STOPPED : 'none',      
    };
    const [userAccount,setUserAccount] = useState([]);
    const _getListUserAccount = async () => {

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
          
    
        } catch (err) {
   
          //console.error(err);
        }
      }
    };

    

    const _checkCheque = async () => {
      const data = localStorage.getItem('state') ? JSON.parse(localStorage.getItem('state')) : null;
      const jwt = data ? data.jwt : null;

      try{
        const rs = await axios.get("https://demoapihistory-hsgagzgtcse4daby.japaneast-01.azurewebsites.net/api/CheckBook/check-inprogress-checkbook",{
          headers: {
            'Authorization': `Bearer ${jwt}`
          }
        })
         
          setIsCheque(rs.data);
      }catch(e){
        
        //console.error(e);
      }
    }

    const _listCheque = async () => {
      handleStart();
      const data = localStorage.getItem('state') ? JSON.parse(localStorage.getItem('state')) : null;
      const jwt = data ? data.jwt : null;
      try{
        const rs = await axios.get("https://demoapihistory-hsgagzgtcse4daby.japaneast-01.azurewebsites.net/api/CheckBook/list-checkbooks",{
          headers: {
            'Authorization': `Bearer ${jwt}`
          }
        })
         
          setCheques(rs.data.result.data)
          handleComplete();
      }catch(e){
        //console.error(e);
        
      }
    }


    useEffect(() => {
      _getListUserAccount();
      _checkCheque();
      _listCheque();
    },[]);

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


    //list cheque
    const [open, setOpen] = useState(false);

    useEffect(() => {
      let timer;
      if (isCounting && countdown > 0) {
        timer = setInterval(() => {
          setCountdown((prev) => prev - 1);
        }, 1000);
      }else if (countdown === 0) {
        // Khi bộ đếm kết thúc, xóa trường nhập email
        setIsCounting(false);
      }
  
      // Dọn dẹp khi bộ đếm ngược kết thúc hoặc khi component unmount
      return () => clearInterval(timer);
    }, [isCounting, countdown]);

    
    return (
        <>
        {loading ? (
          <Loader />
        ) : (

        <main>
           <div className="row main-container">
           <div className="col-2 slide-left">

             <SlideLeft target={target} continent={continent} />
           </div>
               <div className="col-10 slide-right">
                   <div cdkscrollable="" className="scroll-content">
                   <div className="container-fluid h-100">
 <div className="row h-100">
   <div className="col-12 pd-6 pdr-4 h-100">
     <router-outlet />
     <mbb-information-account _nghost-dig-c209="" className="ng-star-inserted">
       <router-outlet _ngcontent-dig-c209="" />
       <mbb-card-base _nghost-dig-c211="" className="ng-star-inserted">
         <router-outlet _ngcontent-dig-c211="" />
         <mbb-i-card _nghost-dig-c213="" className="ng-star-inserted">
           <div _ngcontent-dig-c213="" className="mbb-container">
             <div _ngcontent-dig-c213="" className="my-card">
               <div _ngcontent-dig-c213="" className="edit-pd d-flex justify-content-between">
                 <span _ngcontent-dig-c213="" className="lbl-begin">
                   My Chequebook
                 </span>
                <div className="d-flex gap-2">
                 <Button type="primary" onClick={showModal} _ngcontent-dig-c213="" className="" 
                 style={{display: isCheque.status == "PENDING" ||
                                  isCheque.status == "APPROVED" ||
                                  isCheque.status == "SHIPPING" ||
                                  isCheque.status == "DELIVERED" ||
                                  isCheque.status == "WORKING"
                   ? 'none' : 'block'}}>
                    <p>Create Chequebook <CiCirclePlus fontSize={23}/></p>
               </Button>
               {/* <Button onClick={showWithdrawModal} _ngcontent-dig-c213="" className="pt-3">
                    <p>Withdraw </p>
                    <p><PiHandWithdrawFill fontSize={23} /></p>
               </Button> */}
                </div>
               
               <Modal
                title="Open New Chequebook"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}  // Custom footer to avoid default buttons
              >
                <Form layout="vertical" onFinish={onFinish} initialValues={{
                  deliveryAddress: user.address, 
                }}>
                  <Form.Item
                    label="Account Number"
                    name="accountNumber"
                    rules={[{ required: true, message: 'Please input your account number!' }]}
                  >
                    <Select placeholder="Select your account number">
                      {userAccount.map((item) => {
                        return (

                          <Select.Option value={item.accountNumber}>{item.accountNumber}</Select.Option>
                        )
                      })}
                      
                      {/* Add more account numbers as needed */}
                    </Select>
                  </Form.Item>

                  <Form.Item
                    label="Delivery Address"
                    name="deliveryAddress"
                    rules={[{ required: true, message: 'Please input your Delivery Address!' }]}
                  >
                    <TextArea rows={4} placeholder="Enter your delivery address..." />
                  </Form.Item>

                  <Form.Item name="signature" label="Upload you signature" rules={[{ required: true, message: 'Please input your signature' }]}>
                    <Upload
                      listType="picture-card"
                      fileList={file}
                      onChange={(info) => handleUploadChange(info, setFile)}
                      beforeUpload={() => false}  // Prevent auto-upload
                      
                    >
                      {file.length < 1 && <div className="fs-1">+</div>}
                    </Upload>
                  </Form.Item>

                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Request
                    </Button>
                  </Form.Item>
                </Form>
              </Modal>

             
<Modal
    title="Withdraw Cheque"
    visible={isWithdrawModalVisible}
    onCancel={handleWithdrawCancel}
    footer={null} // Custom footer to avoid default buttons
>
    
    <Form layout="vertical" onFinish={onWithdrawFinish}>
       
        <Form.Item
           label="Cheque Code"
           name="checkCode"
           rules={[{ required: true, message: 'Please input Cheque Code!' }]}
           >
            <Input type="text" />
        </Form.Item> 
        <Form.Item
           label="Source account"
           name="onCheckAccountNumber"
           rules={[{ required: true, message: 'Please input Source account in cheque!' }]}
           >
            <Input type="text" />
        </Form.Item> 
        <Form.Item
           label="Withdraw amount"
           name="amountOnCheck"
           rules={[{ required: true, message: 'Please input money amount!' }]}
           >
            <Input type="number" />
        </Form.Item>   
        <Form.Item
            label="Account Number"
            name="accountNumber"
            rules={[{ required: true, message: 'Please input your account number!' }]}
            >
            <Select placeholder="Select your account number">
              {userAccount.map((item) => {
              return (

                          <Select.Option value={item.accountNumber}>{item.accountNumber}</Select.Option>
                        )
                      })}
                      
                     
                    </Select>
          </Form.Item>             


        <Form.Item label="Upload cheque image" rules={[{ required: true, message: 'Please input your cheque image' }]} className="">
                    <Upload
                      listType="picture-card"
                      fileList={fileWithdraw}
                      onChange={(info) => handleUploadWithdraw(info, setFileWithdraw)}
                      beforeUpload={() => false}  // Prevent auto-upload
                      
                    >
                      {file.length < 1 && <div className="fs-1">+</div>}
                    </Upload>
                  </Form.Item>
        <Form.Item>
            <Button type="primary" htmlType="submit" className="col align-self-center">
                Withdraw
            </Button>
        </Form.Item>
    </Form>
</Modal>

               </div>
               <div _ngcontent-dig-c213="" className="my-card-main">
                 <div _ngcontent-dig-c213="" className="d-flex flex-wrap gap-5 ng-star-inserted w-100">
                  {cheques.map((item,key)=>{
                    return (

                   <div className=""
                   >
                      <div>{item.status}</div>
                      <div className="d-flex p-1 w-100 border  cheque-main">
                          <div className="">
                          <svg width="300" height="" viewBox="0 0 500 250" xmlns="http://www.w3.org/2000/svg">
  {/* <!-- Outer Border with Rounded Corners --> */}
  <rect x="5" y="5" width="490" height="240" fill="#ffffff" stroke="#2C3E50" stroke-width="2" rx="10" ry="10"/>

  {/* <!-- Background Pattern --> */}
  <rect x="5" y="5" width="490" height="80" fill="#3498DB" rx="10" ry="10"/>
  
  {/* <!-- Bank Name and Logo Area --> */}
  <text x="20" y="40" font-family="Arial" font-size="24" fill="#ffffff" font-weight="bold">OB Bank</text>
  <circle cx="460" cy="40" r="20" fill="#ECF0F1" stroke="#3498DB" stroke-width="3"/>
  <image x="444" y="22" width="35" height="35" href="/images/favicon.ico" />

  {/* <!-- Payee Information --> */}
  
  <line x1="21" y1="110" x2="470" y2="110" stroke="#2C3E50" stroke-width="1"/>
 
  <line x1="80" y1="140" x2="300" y2="140" stroke="#2C3E50" stroke-width="1"/>
  <text x="310" y="140" font-family="Arial" font-size="18" fill="#333" font-weight="bold">$</text>

  

  {/* <!-- Amount in Words --> */}
 
  <line x1="21" y1="170" x2="470" y2="170" stroke="#2C3E50" stroke-width="1"/>

  {/* <!-- Signature Line --> */}
  <text x="380" y="210" font-family="Arial" font-size="14" fill="#333">Signature:</text>
  <line x1="440" y1="210" x2="470" y2="210" stroke="#2C3E50" stroke-width="1"/> 

  {/* <!-- MICR Line --> */}
  <text x="20" y="230" font-family="Courier New" font-size="2em" fontWeight={800}  fill="#333">{item.associatedAccountNumber}</text>

  {/* <!-- Additional Design Elements --> */}
  
</svg>
                          </div>
                          <div className="cheque-right">
                            <div className="">
                              <p className="cheque-right-title">Total Amount</p>
                              <p>1020202 USD</p>
                            </div>
                            
                            <div className="" style={{
                              visibility: item.status === 'WORKING' ? 'visible' : 'hidden',
                            }}>
                              <p className="cheque-right-title">expiryDate</p>
                              <p>11/02</p>
                            </div>
                            <div className="" style={{borderBottom: ".2px solid rgba(94, 89, 89, 0.5)"}}></div>
                            <div className="d-flex mt-5 align-items-center justify-content-between" style={{width: '230px'}}>
                                <div>
                                  <p className="cheque-right-title">Status</p>
                                  <p style={{
                                    fontWeight: "bold",
                                    color: statusColors[item.status] || ''
                                  }}>{item.status}</p>
                                </div>
                                <Button style={{display: statusDisplay[item.status] || ''}} onClick={() => handleStopCheque(item.checkBookCode)} color="danger" variant="solid">STOP</Button>
                                {/* OTP FIELD */}
                                <Modal
                                  title="Enter OTP"
                                  visible={isOtpModalVisible}
                                  onOk={async () => {
                                    const otpCode = otp.join(''); 
                                    if (otpCode.length !== 8) {  
                                        openNotification('error', 'Please enter a complete 8-digit OTP');
                                        return;
                                    }
                                    await stopCheque(otpCode); 
                                  }}
                                  onCancel={() => setIsOtpModalVisible(false)}
                                  okText="Confirm"
                                  cancelText="Cancel"
                              >
                                  <div onPaste={handlePaste} style={{ display: "flex", gap: "8px" }}>
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
                                  <Button 
                                      type= {isLoading ? "default" : 'primary'}
                                      onClick={handleSendOtp} 
                                      disabled={isCounting} 
                                      style={{ marginBottom: "16px" }}
                                  >
                                    
                                    {isLoading ? (<Spin color="#fff"/> ) : (
                                        'Request OTP'
                                    )}
                                  </Button>
                                  {isCounting && (
                                    <p style={{ color: "red" }}>
                                      Code is valid for: {countdown} seconds
                                    </p>
                                  )}

                              </Modal>
                            </div>
                          </div>
                          
                          
                      </div>
                      <div style={{
                        textAlign: 'center',
                        borderLeft: '1px solid rgba(0,0,0,0.1)',
                        borderRight: '1px solid rgba(0,0,0,0.1)',
                        borderBottom: '1px solid rgba(0,0,0,0.1)',
                        boxShadow: '3px 4px 27px 0px rgba(0, 0, 0, 0.1)',
                        color: 'blue',
                        cursor: 'pointer',
                        display: open ? 'none' : 'block'
                      }}
                      onClick={() => setOpen(!open)}
                      aria-controls="example-collapse-text"
                      aria-expanded={open} 
                      >see more</div>
                      <div style={{ 
                        minHeight: '150px',
                       
                         }}>
                        <Collapse in={open} dimension="width">
                          
                          <div id="example-collapse-text" style={{
                            borderLeft: '1px solid rgba(0,0,0,0.1)',
                            borderRight: '1px solid rgba(0,0,0,0.1)',
                            borderBottom: '1px solid rgba(0,0,0,0.1)',
                            
                          }}>
                          <div style={{
                        textAlign: 'center',
                        cursor: 'pointer'
                       
                      }}
                      onClick={() => setOpen(false)}
                     
                      ><FaChevronUp /></div>
                            <div body style={{ width: '546px',background: 'rgb(206 191 191 / 10%)'}}>
                              Anim pariatur cliche reprehenderit, enim eiusmod high life
                              accusamus terry richardson ad squid. Nihil anim keffiyeh
                              helvetica, craft beer labore wes anderson cred nesciunt sapiente
                              ea proident.
                            </div>
                          </div>
                        </Collapse>
                      </div>
                   </div>
                    )
                  })}








                 </div>
                 {/**/}
                 {/**/}
                 {/**/}
               </div>
             </div>
           </div>
         </mbb-i-card>
         {/**/}
       </mbb-card-base>
       {/**/}
     </mbb-information-account>
     {/**/}
   </div>
 </div>
</div>

                   </div>
               </div>
           </div>
           </main>
        )}
       </>
    )
}

export default Cheque;