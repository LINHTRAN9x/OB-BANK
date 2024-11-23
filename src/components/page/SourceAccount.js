import { Link, useParams } from "react-router-dom";
import SlideLeft from "../common/Slide-left";
import { IoIosArrowDown } from "react-icons/io";
import { useEffect, useState } from "react";

import 'react-datepicker/dist/react-datepicker.css';
import { TbArrowBigRightLine } from "react-icons/tb";
import { FaSquareShareNodes } from "react-icons/fa6";
import { IoReloadCircle } from "react-icons/io5";

import { Button,Modal, Form, Input, notification, Select, Space,DatePicker } from 'antd';
import { FaTag } from "react-icons/fa";
import AccountPieChart from "./parts/chart";
import axios from "axios";
import Loader from "../common/Loader";
import { Option } from "antd/es/mentions";
import AccountMenu from "./account_infomation/Account-user";



const { RangePicker } = DatePicker;

const SourceAccount = () => {
    const {sourceAccount} = useParams();
    const [userAccount,setUserAccount] = useState([]);
    const [savingsAmount, setSavingsAmount] = useState('');

    const [startDate, setStartDate] = useState(() => {
        const date = new Date();
        date.setDate(date.getDate() - 10); 
        return date;
      });
    const [endDate, setEndDate] = useState(new Date());
    
    const target = 0;

    const accountTotal = userAccount.length;
    let accountTotalBalance = 0;

    const handleTransType = (value) => {
      return value === accNumber; // 
    };
    if (Array.isArray(userAccount)) {
    
  
      userAccount.forEach((item) => {
          accountTotalBalance += item.balance; 
      });
  
     
  } else {
      
    
    //console.error("userAccount không phải là một mảng.");
  }
  const accountBalance = accountTotalBalance - savingsAmount;
    const depositAccount = savingsAmount;

  const disableFutureDates = (current) => {
    return current && current > new Date().setHours(23, 59, 59, 999);
  };


  //loading
  const [loading, setLoading] = useState(false);
  const handleStart = () => setLoading(true); 
  const handleComplete = () => setLoading(false); 
   
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
   

      const handleTransactionClick = (transaction) => {
        setSelectedTransaction(transaction);
        setIsModalVisible(true);
      };

      //create account
      const [isModalVisible1, setIsModalVisible1] = useState(false);
      const showModal = () => {
        setIsModalVisible1(true);
      };
    
      const handleOk = () => {
        setIsModalVisible1(false);
      };
    
      const handleCancel = () => {
        setIsModalVisible1(false);
      };
    
      const onFinish = async (values) => {
    

        const url = `https://demoapihistory-hsgagzgtcse4daby.japaneast-01.azurewebsites.net/api/Account/create-account`;
    
   
        const data = localStorage.getItem('state') ? JSON.parse(localStorage.getItem('state')) : null;
        const jwt = data ? data.jwt : null;

        if (jwt) { 
          try {
            await axios.post(url,{ AccountNumber: values.accountNumber }, {
              headers: {
                'Authorization': `Bearer ${jwt}`,
                
              }
            });
            
            openNotification('success','Successfully created account')
            window.location.reload();
            handleOk();
          } catch (err) {
            openNotification('error','The field AccountNumber must be a string or array type with a minimum length of "10"')
            //console.error(err);
          }
        }
        
      };

      const openNotification = (type, message) => {
        notification[type]({
            message: type === 'error' ? 'Error' : 'Success',
            description: message,
        });
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

    useEffect(() => {
      _getListUserAccount();
    },[]);


  
    const {cardTransactionHistory} = useParams();
    const [accNumber,setAccNumber] = useState('');
    const [userAcc,setUserAcc] = useState([]);
    const [transHistory,setTransHistory] = useState([]);
    // const [startDate, setStartDate] = useState(() => {
    //     const date = new Date();
    //     date.setDate(date.getDate() - 10); 
    //     return date;
    //   });
    //const [endDate, setEndDate] = useState(new Date());





  const onChange = (value) => {
    setAccNumber(value);
  };
  //loading
 
  
  const onSearch = (value) => {
    console.log('search:', value);
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

  const handleDateChange = (dates) => {
    if (dates) {
      setStartDate(dates[0]?.startOf("day").format("YYYY-MM-DD HH:mm:ss")); 
      setEndDate(dates[1]?.endOf("day").format("YYYY-MM-DD HH:mm:ss"));
    } else {
      setStartDate(null);
      setEndDate(null);
    }
  };
  

  useEffect(() => {
    _getListSaving();
  },[])


    //fake

 

   


      const getHistoryTrans = async () => {
        const data = localStorage.getItem('state') ? JSON.parse(localStorage.getItem('state')) : null;
        const jwt = data ? data.jwt : null;
        try{
          const rs = await axios.get(`https://demoapihistory-hsgagzgtcse4daby.japaneast-01.azurewebsites.net/api/Transaction/List-Account-Transactions?AccountNumber=${accNumber}&StartDate=${startDate}&EndDate=${endDate}`,{
            headers: {
              Authorization: `Bearer ${jwt}`,
            }
          })

          
          setTransHistory(rs.data.result.data)
        }catch(err){
          //console.error(err);
        }
      }

      const [listSaving, setListSaving] = useState([]);

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
          savingAmount(formattedData)
        } catch (err) {
          //console.error(err);
        } finally {
          setLoading(false);
        }
      }
    };
    const savingAmount = (e) => {
      const totalAmount = e.reduce((sum, item) => sum + item.balance, 0);  
   
      setSavingsAmount(totalAmount)
    };
  
     


    return (
        <>
        {loading? (
          <Loader />
        ) : (
        <main>
            <div className="row main-container">
            <div className="col-2 slide-left">

              <SlideLeft target={target} sourceAccount={sourceAccount}/>
            </div>
                <div className="col-10 slide-right source-account-container">
                <div cdkscrollable="" className="scroll-content">
                <div className="container-fluid h-100">
  <div className="row h-100">
    <div className="col-12 pd-6 pdr-4 h-100">
      <router-outlet />
      <mbb-information-account _nghost-dig-c209="" className="ng-star-inserted">
        <router-outlet _ngcontent-dig-c209="" />
        <mbb-source-account _nghost-dig-c210="" className="ng-star-inserted">
          <div _ngcontent-dig-c210="" className="mbb-container">
            <div _ngcontent-dig-c210="" className="edit-pd d-flex justify-content-between">
              <span _ngcontent-dig-c210="" className="lbl-begin">
                Source account
              </span>
              <Button type="primary" onClick={showModal} _ngcontent-dig-c213="" className="">
                    Create account
               </Button>
               <Modal title="Register New Account" visible={isModalVisible1} onOk={handleOk} onCancel={handleCancel}>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Account Number" name="accountNumber" rules={[{ required: true, message: 'Please input your account number!' }]}>
            <Input type="number"/>
          </Form.Item>
          
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form>
      </Modal>
            </div>
            <div _ngcontent-dig-c210="" className="panel panel-default panel2">
              <div
                _ngcontent-dig-c210=""
                className="row"
                style={{minHeight: "85vh"}}
              >
                <div _ngcontent-dig-c210="" className="col-lg-7 col-md-12">
                  <div _ngcontent-dig-c210="" className="block-info">
                    <div _ngcontent-dig-c210="" className="block-title">
                      <span _ngcontent-dig-c210="" className="total-value">
                        TOTAL BALANCE
                      </span>
                      <img
                        _ngcontent-dig-c210=""
                        className="styleEye"
                        src="https://online.mbbank.com.vn/assets/images/icons/eye-2.svg"
                      />
                    </div>
                  </div>
                  <mbb-i-chart-source-account
                    _ngcontent-dig-c210=""
                    _nghost-dig-c207=""
                    className="ng-star-inserted"
                  >
                    <div _ngcontent-dig-c207="" style={{ display: "block" }}>
                      <div className="chartjs-size-monitor">
                      
                      </div>
                      <div className="sourceChart">
                      <AccountPieChart accountBalance={accountBalance} depositAccount={depositAccount} />
                      </div>
                   
                    </div>
                  </mbb-i-chart-source-account>
                  {/**/}
                </div>
                <div _ngcontent-dig-c210="" className="col-lg-5 col-md-12">
                  <div _ngcontent-dig-c210="" className="block-account">
                    <span _ngcontent-dig-c210="" className="total-value">
                      {accountTotal} ACCOUNT
                    </span>
                  </div>
                  <AccountMenu userAccount={userAccount} />
                </div>
              </div>
            </div>
            <div _ngcontent-mda-c244="" className="breadcrumb">
             <Link to="/card-service/card-transaction-history/:?">
             
              <span _ngcontent-mda-c244="" className="title-link">
                Card transaction query
              </span>
             </Link>
            </div>
            <div _ngcontent-mda-c244="" className="panel panel-default">
            <div _ngcontent-dig-c210="" className="panel-body">
                <div _ngcontent-dig-c210="" className="block-search">
                  <form
                    _ngcontent-dig-c210=""
                    noValidate=""
                    mbbfocusfirstinvalidcontrol=""
                    className="form-group ng-untouched ng-pristine ng-valid"
                  >
                    <div _ngcontent-dig-c210="" className="row chone-css">
                      <span
                        _ngcontent-dig-c210=""
                        className="col-md-3 col-sm-12 change-label-black"
                      >
                        Search
                      </span>
                    </div>
                    <div _ngcontent-dig-c210="" className="row chone-css">
                      <span
                        _ngcontent-dig-c210=""
                        className="col-md-3 col-sm-12 change-label"
                      >
                        Account number
                      </span>
                      <div
                        _ngcontent-dig-c210=""
                        className="col-md-6 col-sm-12"
                      >
                      
                      <Select
      showSearch
      placeholder="Select an account"
      optionFilterProp="children"
      onChange={onChange}
      onSearch={onSearch}
      
      style={{ width: '100%' }} // Optional: set width to 100%
    >
      {userAccount.map((account) => (
        <Option key={account.accountNumber} value={account.accountNumber}>
          {account.accountNumber}
        </Option>
      ))}
    </Select>
                      </div>
                    </div>
                    <div
                      _ngcontent-dig-c210=""
                      className="row"
                      style={{ marginBottom: 9 }}
                    >
                      <span
                        _ngcontent-dig-c210=""
                        className="col-md-3 col-sm-12 change-label"
                      >
                        Date range{" "}
                      </span>
                      <div
                        _ngcontent-dig-c210=""
                        className="col-md-6 col-sm-12"
                      >
                        <div _ngcontent-dig-c210="" className="block-date">
                       
                          <Space direction="vertical" size={12}>
                            <RangePicker 
                            onChange={handleDateChange}
                            disabledDate={disableFutureDates}
                            />
                          </Space>
                        </div>
                      </div>
                      
                      <div
                        _ngcontent-dig-c210=""
                        className="col-md-2 col-sm-12"
                      >
                        <button
                          onClick={getHistoryTrans}
                          _ngcontent-dig-c210=""
                          type="button"
                          className="btn btn-primary abtn"
                        >
                          {" "}
                          Query{" "}
                        </button>
                      </div>
                    </div>
                  
                  </form>
                </div>
                <div _ngcontent-dig-c210="" className="row chone-css">
                    <span
                        _ngcontent-dig-c210=""
                        className="col-md-3 col-sm-12 change-label-black ng-star-inserted"
                    >
                        Result
                    </span>
                    {/**/}
                </div>

                <div _ngcontent-dig-c210="">
                    <div className="row m-2 py-2 border-bottom">
                        <div className="col"><span className="h4">{transHistory?.length}</span> transaction</div>
                        <div className="col"></div>
                    </div>
                    <div className="row m-2">
                    {transHistory.map((transaction) => (
                        <div
                        key={transaction.transactionCode}
                        className="transaction-main"
                        href="#"
                        onClick={() => handleTransactionClick(transaction)}
                        >
                        <div className="row transaction-time">
                            <div className="row">{formatDate(transaction.transactionDate)}</div>
                        </div>
                        <div className="transaction-contents">
                            <div>
                                <p>
                                {transaction.transactionType === 'DEPOSITSAVING' ? (
                                  <>
                                  <span>
                                    TO:
                                  </span> Owner
                                  </>
                                ) : (
                                  <>
                                  
                                  <span>
                                    {handleTransType(transaction.sourceAccountNumber)? 'TO:' : 'FROM:'}
                                  </span> 
                                  {handleTransType(transaction.sourceAccountNumber)? transaction.desUserName : transaction.sourceUserName}
                                  </>
                                )}
                                </p>
                                <p>{transaction.transactionMesage}</p>
                                <div className="d-flex">
                                    <p style={{
                                      color:handleTransType(transaction.sourceAccountNumber)? "#ca3535" : '#20c997'
                                      
                                      }}><FaTag /></p>
                                    <p style={{color:"grey"}}>
                                      {transaction.transactionType === 'DEPOSITSAVING' ? (
                                        transaction.transactionType
                                      ) : (
                                          <>
                                            {handleTransType(transaction.sourceAccountNumber)? 'TRANSFER' : 'RECEIVE'}
                                          </>
                                      )}
                                    </p>
                                </div>
                            </div>
                            <div>
                            <p className="fw-bold h4" style={{
                              color: handleTransType(transaction.sourceAccountNumber)? '' : '#20c997'
                            }}>{handleTransType(transaction.sourceAccountNumber)? '-' : '+'}{transaction.amount} USD</p>
                            
                            </div>
                        </div>
                        </div>
                    ))}

                    <Modal
                        title="Transaction Details"
                        visible={isModalVisible}
                        onCancel={() => setIsModalVisible(false)}
                        footer={null}
                    >
                        {selectedTransaction && (
                        <div className="transaction-details">
                            <div className="transaction-details-header">
                                <div className="transaction-details-header-item">

                                <p>transaction amount</p>
                                <p>-{selectedTransaction.amount} USD </p>
                                </div>
                            </div>
                            <div className="transaction-details-body">
                            <div className="transaction-details-body-item">
                                {selectedTransaction.transactionType === 'DEPOSITSAVING' ? (
                                  <>
                                  <p>Source account</p>
                                  <p className="transaction-user">{selectedTransaction.sourceUserName} </p>
                                  <p>{handleTransType(selectedTransaction.sourceAccountNumber)? selectedTransaction.sourceAccountNumber : selectedTransaction.sourceAccountNumber
                                  ? `**********${selectedTransaction.desAccountNumber.slice(-3)}`
                                  : ''}</p>
                                  </>
                                ) : (
                                    <>
                                <p>From account</p>
                                <p className="transaction-user">{selectedTransaction.sourceUserName} </p>
                                <p>{handleTransType(selectedTransaction.sourceAccountNumber)? selectedTransaction.sourceAccountNumber : selectedTransaction.sourceAccountNumber
                                  ? `**********${selectedTransaction.desAccountNumber.slice(-3)}`
                                  : ''}</p>
                                    </>
                                ) }
                            </div>
                            <div className="transaction-details-body-item">
                              {selectedTransaction.transactionType === 'DEPOSITSAVING' ? (
                                <>
                                </>
                              ) : (
                                <>

                                <p>To account</p>
                                <p className="transaction-user">{selectedTransaction.desUserName}</p>
                                <p>{handleTransType(selectedTransaction.desAccountNumber)? selectedTransaction.desAccountNumber : selectedTransaction.desAccountNumber
                                  ? `**********${selectedTransaction.desAccountNumber.slice(-3)}`
                                  : ''}
                                  </p>
                                </>
                              )}
                            </div>
                            <div className="transaction-details-body-item-1">
                                <div className="d-flex justify-content-between">
                                {selectedTransaction.transactionType === 'DEPOSITSAVING' ? (
                                  <>
                                    <div className="details-body-item">
                                        
                                        <p>Time of execution</p>
                                        <p>Transaction code</p>
                                        <p>Transaction description</p>
                                        <p>Status</p>
                                    </div>
                                    <div className="d-flex flex-column details-body-item-1 align-items-end">
                                        
                                        <p>{formatDate(selectedTransaction.transactionDate)}</p>
                                        <p>{selectedTransaction.transactionCode}</p>
                                        <p>{selectedTransaction.transactionMesage}</p>
                                        <p style={{
                                            color: "green",
                                        }}>Completed</p>
                                    </div>
                                  </>
                                ) : (
                                  <>
                                    <div className="details-body-item">
                                        
                                        <p>Time of execution</p>
                                        <p>Transaction code</p>
                                        <p>Transaction description</p>
                                        <p>Status</p>
                                    </div>
                                    <div className="d-flex flex-column details-body-item-1 align-items-end">
                                        
                                        <p>{formatDate(selectedTransaction.transactionDate)}</p>
                                        <p>{selectedTransaction.transactionCode}</p>
                                        <p>{selectedTransaction.transactionMesage}</p>
                                        <p style={{
                                            color: "green",
                                        }}>Completed</p>
                                    </div>
                                  </>
                                ) }
                                </div>
                            </div>
                            </div>
                            <div className="d-flex justify-content-evenly align-items-center">
                                <div className="d-flex flex-column align-items-center" >
                                    <p className="h2" style={{margin:"0px",color: "#2a2ab4"}}><IoReloadCircle /></p>
                                    <p>Re transaction</p>
                                </div>
                                <div className="d-flex flex-column align-items-center">
                                    <p className="h3" style={{margin:"0px",color: "#2a2ab4"}}><FaSquareShareNodes /></p>
                                    <p>Share transaction</p>
                                </div>
                            </div>
                        </div>
                        )}
                    </Modal>
                    </div>
                </div>

                {transHistory.length == 0 ? (

                <div _ngcontent-dig-c210="" style={{ textAlign: "center", paddingBottom: 15 }}>
                    <span
                        _ngcontent-dig-c210=""
                        className="title-search-1 ng-star-inserted"
                        style={{ color: "red" }}
                    >
                        No record to display
                    </span>
                    {/**/}
                    
                </div>
                ): ('')}

                {/**/}
                {/**/}
              </div>
            </div>
          </div>
        </mbb-source-account>
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
export default SourceAccount;