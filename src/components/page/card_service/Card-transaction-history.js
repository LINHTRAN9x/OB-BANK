import { useParams } from "react-router-dom";
import SlideLeft from "../../common/Slide-left";
import SkeletonLoading from "../../common/Skeleton";
import { IoIosArrowDown } from "react-icons/io";

import { useEffect, useState } from "react";
import { TbArrowBigRightLine } from "react-icons/tb";
import Modal from "antd/es/modal/Modal";
import { IoReloadCircle } from "react-icons/io5";
import { FaSquareShareNodes } from "react-icons/fa6";
import { FaTag } from "react-icons/fa";
import { Space , DatePicker, Select, Pagination, Button, message, Spin } from "antd";
import axios from "axios";
import { Option } from "antd/es/mentions";
import * as XLSX from 'xlsx';
import moment from 'moment';



const { RangePicker } = DatePicker;

const CardTransactionHistory = () => {
    const target = 3;
    const {cardTransactionHistory} = useParams();
    const [accNumber,setAccNumber] = useState('');
    const [userAcc,setUserAcc] = useState([]);
    const [transHistory,setTransHistory] = useState([]);
    const [isLoading,setIsLoading] = useState(false);
  
    const [fileType, setFileType] = useState("EXCEL");
    const [selectedMonth, setSelectedMonth] = useState("1MONTH");
    const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [page, setPage] = useState(1);
  const [selectedPeriod, setSelectedPeriod] = useState("Select month");
  const [type, setType] = useState(false);
  const [rangePickerValue, setRangePickerValue] = useState(null);

  const periods = [
    { label: "1 month", value: "1MONTH" },
    { label: "3 month", value: "3MONTH" },
    { label: "6 month", value: "6MONTH" },
    { label: "9 month", value: "9MONTH" },
    { label: "12 month", value: "12MONTH" },
  ];

  const pageSize = 5;



  const onChange = (value) => {
    setAccNumber(value);
    setTransHistory([])
    setTotalItems(0)
    setRangePickerValue(null);
  };
  //loading
  const [loading, setLoading] = useState(false);
  const handleStart = () => setLoading(true); 
  const handleComplete = () => setLoading(false); 
 
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


  const handleTransType = (value) => {
    return value === accNumber; // 
  };
  const disableFutureDates = (current) => {
    return current && current > new Date().setHours(23, 59, 59, 999);
  };


  useEffect(() => {

  },[])


    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

  
 

      const handleTransactionClick = (transaction) => {
        setSelectedTransaction(transaction);
        setIsModalVisible(true);
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
            
            setUserAcc(rs.data.result.data);
           
            handleComplete();
          } catch (err) {
            handleStart();
            //console.error(err);
          }
        }
      };

      const getHistoryTrans = async () => {
        setIsLoading(true); 
        const data = localStorage.getItem('state') ? JSON.parse(localStorage.getItem('state')) : null;
        const jwt = data ? data.jwt : null;

        
        try{
                                 
          const rs = await axios.get(`https://demoapihistory-hsgagzgtcse4daby.japaneast-01.azurewebsites.net/api/Transaction/List-Account-Transactions?AccountNumber=${accNumber}&StartDate=${startDate}&EndDate=${endDate}&Page=${page}&PageSize=${pageSize}&SortOrder=desc`,{
            headers: {
              Authorization: `Bearer ${jwt}`,
            }
          })

         
         
          setTransHistory(rs.data.result.data)
          setTotalItems(rs.data.result.totalItems);
          
        }catch(err){
                
          //console.error(err);
        }finally {
          setIsLoading(false); // Ensure loading is cleared
      }
      }

   

      const fetchTransactions = async (period) => {
        const data = localStorage.getItem("state") ? JSON.parse(localStorage.getItem("state")) : null;
        const jwt = data ? data.jwt : null;
        
        if(period === 'Select month'){
          setTransHistory([]); 
          setTotalItems(0)
          return
        }
        try {
          const rs = await axios.get(
            `https://demoapihistory-hsgagzgtcse4daby.japaneast-01.azurewebsites.net/api/Transaction/List-Account-Transactions?AccountNumber=${accNumber}&Page=${page}&PageSize=${pageSize}&sortOrder=desc&period=${period}`,
            {
              headers: {
                Authorization: `Bearer ${jwt}`,
              },
            }
          );
         
          setTransHistory(rs.data.result.data);
          setTotalItems(rs.data.result.totalItems);
          
        } catch (error) {
          //console.error("Failed to fetch transactions:", error);
          message.error("You must choose a account first.")
        }
      };

      const handlePeriodClick = (period) => {
        setSelectedPeriod(period);
        fetchTransactions(period);
      };

      const handleDownloadReport = async () => {
        setLoading(true);
        const data = localStorage.getItem("state") ? JSON.parse(localStorage.getItem("state")) : null;
        const jwt = data ? data.jwt : null;
      
        try {
          const response = await axios.get(
            `https://demoapihistory-hsgagzgtcse4daby.japaneast-01.azurewebsites.net/api/Account/download-account-statement?accountNumber=${accNumber}&sortOrder=asc&period=${selectedMonth}&typeFile=${fileType}`,
            {
              headers: {
                Authorization: `Bearer ${jwt}`,
              },
              responseType: "blob", // Ensures we handle the file correctly
            }
          );
      
      
          // Create URL
          const blob = new Blob([response.data], { type: response.data.type });
          const fileURL = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = fileURL;

          // name file type
          const fileExtension = fileType === "PDF" ? "pdf" : "xlsx";
          link.setAttribute("download", `AccountStatement.${fileExtension}`);
          
          
          document.body.appendChild(link);
          link.click();

          
          link.parentNode.removeChild(link);
          window.URL.revokeObjectURL(fileURL);
          setLoading(false);
        } catch (error) {
          //console.error("Failed to download report:", error);
          message.error("You must choose a account first.");
          setLoading(false);
        }
      };

  
      useEffect(() => {
        _getListUserAccount();
        
      },[]);

      useEffect(() => {
        getHistoryTrans(currentPage);
      },[currentPage])
      useEffect(() => {
        fetchTransactions(currentPage);
      },[currentPage])


      const handlePageChange = (page) => {
        setCurrentPage(page);
        setPage(page);
      };

    return (
        <>
            <main>
           <div className="row main-container">
           <div className="col-2 slide-left">

             <SlideLeft target={target} cardTransactionHistory={cardTransactionHistory} />
           </div>
               <div className="col-10 cardTransactionHistory-right ">
                   <div cdkscrollable="" className="scroll-content">
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
            <div _ngcontent-mda-c244="" className="breadcrumb">
              <span _ngcontent-mda-c244="" className="title-link active">
                Card service
              </span>
              <span _ngcontent-mda-c244="" className="material-icons">
                keyboard_arrow_right
              </span>
              <span _ngcontent-mda-c244="" className="title-link">
                Card transaction query
              </span>
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
      
      style={{ width: '100%' }} // Optienal: set width to 100%
    >
      {userAcc.map((account) => (
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
                            value={rangePickerValue}
                            onChange={(dates, dateStrings) => {
                              handleDateChange(dates, dateStrings);
                              setRangePickerValue(dates); // Update RangePicker value on change
                            }}
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
                    <div className="row align-items-center">
                    <span className="col-md-3 col-sm-12 change-label">Download file format</span>
                      <div className="col-md-3 col-sm-12">
                        <select
                          onChange={(e) => setFileType(e.target.value)}
                          className="form-control"
                        >
                          
                          <option value="EXCEL">EXCEL</option>
                        </select>
                      </div>
                      <div className="col-md-3 col-sm-12">
                        <select
                          onChange={(e) => setSelectedMonth(e.target.value)}
                          className="form-control"
                        >
                          <option value="1MONTH">1 month</option>
                          <option value="3MONTH">3 months</option>
                          <option value="6MONTH">6 months</option>
                          <option value="9MONTH">9 months</option>
                          <option value="12MONTH">12 months</option>
                        </select>
                      </div>
                      <div className="col-md-2 col-sm-12">

                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={handleDownloadReport}
                          >
                          {loading ? (
                            <>
                            <Spin /> Download
                            
                            </>
            ) : (
                          "Download"
                        )}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
                

                <div _ngcontent-dig-c210="" className="chone-css" 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                    <span
                        _ngcontent-dig-c210=""
                        className="col-md-3 col-sm-12 change-label-black ng-star-inserted"
                    >
                        Result
                    </span>
                 <div className="select_time d-flex align-items-center">
                  <span className="change-label-black ng-star-inserted" >
                    Filter
                  </span>
                  <div className="d-flex justify-content-between ms-4 gap-4">
                    <Select
                      value={selectedPeriod} // This will control the selected value
                      onChange={handlePeriodClick} // Handle the change event
                      style={{
                        cursor: "pointer",
                        padding: "1px 10px", // Optional: Add padding for better appearance
                        borderRadius: "4px", // Optional: Border radius for rounded corners
                      }}
                    >
                      <Select.Option value="Select month" style={{color: 'rgba(0,0,0,0.01)'}}>Select month</Select.Option > 
                      {periods.map((item) => (
                            <Select.Option key={item.value} value={item.value}>
                              {item.label}
                            </Select.Option>
                          ))}
                    </Select>
                  </div>
                </div>
                </div>
                {isLoading ? (
                  <SkeletonLoading />
                ) : (

                  <>
                <div _ngcontent-dig-c210="">
                    <div className="row m-2 py-2 border-bottom">
                        <div className="col"><span className="h4">{totalItems}</span> transaction</div>
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
                                {transaction.transactionType === 'DEPOSITSAVING' ||  transaction.transactionType === 'DEPOSITWITHDRAWN' ? (
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
                <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={totalItems}
        onChange={handlePageChange}
        showQuickJumper
      />
            </>
                )}
              </div>
            </div>
          </mbb-transaction-history>
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
        </>
    )
}
export default CardTransactionHistory;