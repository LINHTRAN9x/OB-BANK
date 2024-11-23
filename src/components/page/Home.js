import { Collapse, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import SlideLeft from '../common/Slide-left';
import { Link, useNavigate, useParams } from 'react-router-dom';
import AccountPieChart from './parts/chart';
import { Descriptions, Form, Input, Progress, Select, Tooltip} from 'antd';
import axios from 'axios';
import Loader from '../common/Loader';




const { Option } = Select;


const Home = ({continent}) => {
    const [userAccount,setUserAccount] = useState({});
    const [user,setUser] = useState(null);
    const [openCollapse, setOpenCollapse] = useState(8);
    const [openCollapse2, setOpenCollapse2] = useState(8);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); 
    const [form] = Form.useForm();
    const [formData, setFormData] = useState({});
    const [isResult, setIsResult] = useState(false);
    const [percent,setPercent] = useState(0);
    const [isProgess, setIsProgess] = useState(false);
    const [savingsAmount, setSavingsAmount] = useState('');


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

    const items = [
      {
        key: '1',
        label: 'Deposit Amount',
        children: (
          <>
          {formData.depositAmount} USD
          
          </>
        ),
        span: 3,
      },
      {
        key: '2',
        label: 'Term In Days',
        children: formData.termInDays,
        span: 3,
      },
      {
        key: '3',
        label: 'Maturity Date',
        children: formatDate(formData.maturityDate),
        span: 3,
      },
      {
        key: '4',
        label: 'Interest',
        children: (
          <>
          {formData.interest} USD / Month
          
          </>
        ),
        span: 3,
      },
    ]

    

    const accountTotal = userAccount.length;
    let accountTotalBalance = 0;

    if (Array.isArray(userAccount)) {
    
  
      userAccount.forEach((item) => {
          accountTotalBalance += item.balance; 
      });
  
     
  } else {
      //console.error("userAccount không phải là một mảng.");
  }
  const accountBalance = accountTotalBalance - savingsAmount;
    const depositAccount = savingsAmount;
    
  const handleStart = () => setLoading(true); 
  const handleComplete = () => setLoading(false); 

    const toggleCollapse = (index) => {
      setOpenCollapse(openCollapse === index ? null : index); // If already open, close it, else open it
     
    };
    const toggleCollapse2 = (index) => {
        setOpenCollapse2(openCollapse2 === index ? null : index); // If already open, close it, else open it
       
    };
    const startProgress = () => {
      setIsProgess(true);
      setPercent(0);
      let progress = 0;
  
      const interval = setInterval(() => {
        progress += 10; 
        setPercent(progress);
  
        if (progress >= 100) {
          clearInterval(interval); 
          setIsProgess(false);
        }
      }, 100);
      
    };
 
    const handleFormSubmit = async (values) => {
      setIsResult(false);
      startProgress(); 
     
      const url = `https://demoapihistory-hsgagzgtcse4daby.japaneast-01.azurewebsites.net/api/SavingsAccount/calculate-estimated-interest`;
      
     
      const data = localStorage.getItem('state') ? JSON.parse(localStorage.getItem('state')) : null;
      const jwt = data ? data.jwt : null;
  
      if (jwt) { 
        try {
          const rs = await axios.get(url, {
            params: { Term: values?.Term, DepositAmount: values?.DepositAmount },
            headers: {
                'Authorization': `Bearer ${jwt}`
              }
          
          });
          setTimeout(() => {
            setFormData(rs.data);
            setIsResult(true);
            form.resetFields();
          }, 1000);
        } catch (err) {
          setIsResult(false);
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
          navigate('/auth/log-in'); 
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

    const [listSaving, setListSaving] = useState([]);

    const _getListSaving = async () => {
      const url = `https://demoapihistory-hsgagzgtcse4daby.japaneast-01.azurewebsites.net/api/SavingsAccount/list-user-savings-accounts?pageSize=50`;
  
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

    useEffect(() => {
      _getUser();
      _getListUserAccount();
      _getListSaving();
    },[])

    useEffect(() => {
      // Kiểm tra JWT trong localStorage
      const data = localStorage.getItem('state') ? JSON.parse(localStorage.getItem('state')) : null;
      const jwt = data ? data.jwt : null;
  
      // Điều hướng đến trang <403 /> nếu không có JWT
      if (!jwt) {
        navigate('/403');
      }
    }, [navigate]);

    return (
      <>
         {loading ? (
                      <Loader />
                  ): (
        <main>
            <div className="row main-container">
            <div className="col-2 slide-left">
              <SlideLeft continent={continent}/>

            </div>
                <div className="col-10 slide-right">
                 
                <div cdkscrollable="" className="scroll-content">
  <div className="container-fluid h-100">
    <div className="row h-100">
      <div className="col-12 pd-6 pdr-4 h-100">
        <router-outlet />
        <mbb-dashboard _nghost-cni-c196="" className="ng-star-inserted">
          <div _ngcontent-cni-c196="" className="mbb-container">
            <div _ngcontent-cni-c196="" className="row mrb-4">
              <div _ngcontent-cni-c196="" className="col-xl-8 col-md-12">
                <mbb-finance-information
                  _ngcontent-cni-c196=""
                  _nghost-cni-c186=""
                  className="ng-tns-c186-17 ng-star-inserted"
                >
                  <div
                    _ngcontent-cni-c186=""
                    className="edit-pd ng-tns-c186-17"
                  >
                    <span
                      _ngcontent-cni-c186=""
                      className="lbl_fone ng-tns-c186-17"
                    >
                      {" "}
                      My account{" "}
                    </span>
                  </div>
                  <div _ngcontent-cni-c186="" className="panel ng-tns-c186-17">
                    <mbb-activity-indicator
                      _ngcontent-cni-c186=""
                      className="ng-tns-c186-17 isHidden"
                      _nghost-cni-c182=""
                    >
                      {/**/}
                    </mbb-activity-indicator>
                    <div
                      _ngcontent-cni-c186=""
                      className="panel-body pl-0 pr-0 padd-css1 ng-tns-c186-17"
                    >
                      <div
                        _ngcontent-cni-c186=""
                        className="row mr-0 ng-tns-c186-17"
                      >
                        <div
                          _ngcontent-cni-c186=""
                          className="col-lg-6 col-md-6 col-xl-6 ng-tns-c186-17"
                        >
                          <mbb-dashboard-chart
                            _ngcontent-cni-c186=""
                            className="ng-tns-c186-17"
                            _nghost-cni-c184=""
                          >
                            <mat-tab-group
                              _ngcontent-cni-c184=""
                              dynamicheight=""
                              className="mat-tab-group mat-primary mat-tab-group-dynamic-height"
                            >
                              <mat-tab-header className="mat-tab-header">
                                <button
                                  aria-hidden="true"
                                  type="button"
                                  mat-ripple=""
                                  tabIndex={-1}
                                  className="mat-ripple mat-tab-header-pagination mat-tab-header-pagination-before mat-elevation-z4 mat-tab-header-pagination-disabled"
                                  disabled=""
                                >
                                  <div className="mat-tab-header-pagination-chevron" />
                                </button>
                                <div className="mat-tab-label-container">
                                  <div
                                    role="tablist"
                                    className="mat-tab-list"
                                    style={{ transform: "translateX(0px)" }}
                                  >
                                    <div className="mat-tab-labels">
                                      <div
                                        role="tab"
                                        mattablabelwrapper=""
                                        mat-ripple=""
                                        cdkmonitorelementfocus=""
                                        className="mat-ripple mat-tab-label mat-focus-indicator mat-tab-label-active ng-star-inserted"
                                        id="mat-tab-label-2-0"
                                        tabIndex={0}
                                        aria-posinset={1}
                                        aria-setsize={1}
                                        aria-controls="mat-tab-content-2-0"
                                        aria-selected="true"
                                        aria-disabled="false"
                                      >
                                        <div className="mat-tab-label-content">
                                          Asset{/**/}
                                          {/**/}
                                        </div>
                                      </div>
                                      {/**/}
                                    </div>
                                    <mat-ink-bar
                                      className="mat-ink-bar"
                                      style={{
                                        visibility: "visible",
                                        left: 0,
                                        width: 100
                                      }}
                                    />
                                  </div>
                                </div>
                                <button
                                  aria-hidden="true"
                                  type="button"
                                  mat-ripple=""
                                  tabIndex={-1}
                                  className="mat-ripple mat-tab-header-pagination mat-tab-header-pagination-after mat-elevation-z4 mat-tab-header-pagination-disabled"
                                  disabled=""
                                >
                                  <div className="mat-tab-header-pagination-chevron" />
                                </button>
                              </mat-tab-header>
                              <div className="mat-tab-body-wrapper">
                                <mat-tab-body
                                  role="tabpanel"
                                  className="mat-tab-body ng-tns-c135-19 mat-tab-body-active ng-star-inserted"
                                  id="mat-tab-content-2-0"
                                  aria-labelledby="mat-tab-label-2-0"
                                >
                                  <div
                                    cdkscrollable=""
                                    className="mat-tab-body-content ng-tns-c135-19 ng-trigger ng-trigger-translateTab"
                                    style={{ transform: "none" }}
                                  >
                                    <div
                                      _ngcontent-cni-c184=""
                                      className="d-flex flex-column ng-star-inserted"
                                      style={{}}
                                    >
                                      <div
                                        _ngcontent-cni-c184=""
                                        className="expected-interest"
                                      >
                                        
                                        <AccountPieChart accountBalance={accountBalance} depositAccount={depositAccount} />
                                      </div>
                                    </div>
                                    <div
                                      _ngcontent-cni-c184=""
                                      className="chart ng-star-inserted"
                                      style={{}}
                                    >
                                      <div className="chartjs-size-monitor">
                                        <div className="chartjs-size-monitor-expand">
                                          <div className="" />
                                        </div>
                                        <div className="chartjs-size-monitor-shrink">
                                          <div className="" />
                                        </div>
                                      </div>
                                      <canvas
                                        _ngcontent-cni-c184=""
                                        basechart=""
                                        className="chartjs-render-monitor"
                                        width={477}
                                        height={238}
                                        style={{
                                          display: "block",
                                          height: 191,
                                          width: 382
                                        }}
                                      />
                                    </div>
                                    <div
                                      _ngcontent-cni-c184=""
                                      className="total ng-star-inserted"
                                      style={{}}
                                    >
                                      <div
                                        _ngcontent-cni-c184=""
                                        className="total-value-assets"
                                      >
                                        <div
                                          _ngcontent-cni-c184=""
                                          className="total-value-assets-child-1"
                                        >
                                          <div
                                            _ngcontent-cni-c184=""
                                            className="total-value-assets-child-1_content"
                                          >
                                            <div
                                              _ngcontent-cni-c184=""
                                              className="gtt-1"
                                            >
                                              <span
                                                _ngcontent-cni-c184=""
                                                className="total-value"
                                              >
                                                THE TOTAL ASSETS
                                              </span>
                                            </div>
                                            <div
                                              _ngcontent-cni-c184=""
                                              className="gtt-2"
                                            >
                                              <span
                                                _ngcontent-cni-c184=""
                                                className="mat-tooltip-trigger balance ng-star-inserted"
                                                aria-describedby="cdk-describedby-message-2"
                                                cdk-describedby-host={0}
                                              >
                                                {accountTotalBalance.toLocaleString('en-US')}
                                              </span>
                                              {/**/}
                                              {/**/}
                                              {/**/}
                                              <span
                                                _ngcontent-cni-c184=""
                                                className="align-bottom mt-auto currency ml-1"
                                              >
                                                USD
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                        <div
                                          _ngcontent-cni-c184=""
                                          className="total-value-assets-child-2"
                                        >
                                          <div
                                            _ngcontent-cni-c184=""
                                            className="bo-eys"
                                          >
                                            <img
                                              _ngcontent-cni-c184=""
                                              className="styleEye"
                                              src="https://online.mbbank.com.vn/assets/images/icons/db-eye-2.svg"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                      <div
                                        _ngcontent-cni-c184=""
                                        className="infor"
                                      >
                                        <div
                                          _ngcontent-cni-c184=""
                                          className="infor-child"
                                        >
                                          <div
                                            _ngcontent-cni-c184=""
                                            className="infor-child-1"
                                          >
                                            <div
                                              _ngcontent-cni-c184=""
                                              className="square-1"
                                            />
                                            <span
                                              _ngcontent-cni-c184=""
                                              className="content-1"
                                            >
                                              Account balance
                                            </span>
                                          </div>
                                          <div
                                            _ngcontent-cni-c184=""
                                            className="infor-child-1"
                                          >
                                            <div
                                              _ngcontent-cni-c184=""
                                              className="square-2"
                                            />
                                            <span
                                              _ngcontent-cni-c184=""
                                              className="content-1"
                                            >
                                              Savings balance
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    {/**/}
                                  </div>
                                </mat-tab-body>
                                {/**/}
                              </div>
                            </mat-tab-group>
                          </mbb-dashboard-chart>
                        </div>
                        <div
                          _ngcontent-cni-c186=""
                          className="col-lg-6 col-md-6 col-xl-6 ng-tns-c186-17"
                        >
                          <div
                            _ngcontent-cni-c186=""
                            className="info-account ng-tns-c186-17"
                          >
                            <div
                              _ngcontent-cni-c186=""
                              className="pb-2 ng-tns-c186-17"
                            >
                              <mbb-tagcard
                                _ngcontent-cni-c186=""
                                currency="VND"
                                className="ng-tns-c186-17"
                                _nghost-cni-c185=""
                                tabIndex={0}
                              >
                                <Link _ngcontent-cni-c185="" to="/information-account/source-account/:?">
                                  <div
                                    _ngcontent-cni-c185=""
                                    className="d-flex align-items-center tagcard"
                                    style={{
                                      borderRadius: 6,
                                      border: "solid 1px #cccccc"
                                    }}
                                  >
                                    <img
                                      _ngcontent-cni-c185=""
                                      style={{ marginRight: 5 }}
                                      src="https://online.mbbank.com.vn/assets/images/icons/total.svg"
                                    />
                                    <div
                                      _ngcontent-cni-c185=""
                                      className="d-flex flex-column"
                                      
                                    >
                                      <span
                                        _ngcontent-cni-c185=""
                                        className="label"
                                      >
                                        Accounts ({accountTotal ? accountTotal : 0})
                                      </span>
                                      <div
                                        _ngcontent-cni-c185=""
                                        className="d-flex flex-row"
                                      >
                                        {/* <span
                                          _ngcontent-cni-c185=""
                                          className="balance"
                                        >
                                          0
                                        </span> */}
                                        {/* <div
                                          _ngcontent-cni-c185=""
                                          className="d-flex align-items-start flex-column pb-1"
                                        >
                                          <span
                                            _ngcontent-cni-c185=""
                                            className="align-bottom mt-auto currency ml-1"
                                          >
                                            VND
                                          </span>
                                        </div> */}
                                      </div>
                                    </div>
                                    <mat-icon
                                      _ngcontent-cni-c185=""
                                      role="img"
                                      aria-hidden="false"
                                      className="mat-icon notranslate chevron-right-icon ml-auto material-icons mat-icon-no-color"
                                      data-mat-icon-type="font"
                                    >
                                      
                                    </mat-icon>
                                  </div>
                                </Link>
                              </mbb-tagcard>
                            </div>
                            <div
                              _ngcontent-cni-c186=""
                              className="pb-2 ng-tns-c186-17"
                            >
                              <mbb-tagcard
                                _ngcontent-cni-c186=""
                                className="ng-tns-c186-17"
                                _nghost-cni-c185=""
                                tabIndex={0}
                              >
                                <a _ngcontent-cni-c185="">
                                  <div
                                    _ngcontent-cni-c185=""
                                    className="d-flex align-items-center tagcard"
                                    style={{
                                      borderRadius: 6,
                                      border: "solid 1px #cccccc"
                                    }}
                                  >
                                    <img
                                      _ngcontent-cni-c185=""
                                      style={{ marginRight: 5 }}
                                      src="https://online.mbbank.com.vn/assets/images/icons/card.svg"
                                    />
                                    <div
                                      _ngcontent-cni-c185=""
                                      className="d-flex flex-column"
                                    >
                                      <span
                                        _ngcontent-cni-c185=""
                                        className="label"
                                      >
                                        Card (0)
                                      </span>
                                      <div
                                        _ngcontent-cni-c185=""
                                        className="d-flex flex-row"
                                      >
                                        <span
                                          _ngcontent-cni-c185=""
                                          className="balance"
                                        />
                                        <div
                                          _ngcontent-cni-c185=""
                                          className="d-flex align-items-start flex-column pb-1"
                                        >
                                          <span
                                            _ngcontent-cni-c185=""
                                            className="align-bottom mt-auto currency ml-1"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    <mat-icon
                                      _ngcontent-cni-c185=""
                                      role="img"
                                      aria-hidden="false"
                                      className="mat-icon notranslate chevron-right-icon ml-auto material-icons mat-icon-no-color"
                                      data-mat-icon-type="font"
                                    >
                                     
                                    </mat-icon>
                                  </div>
                                </a>
                              </mbb-tagcard>
                            </div>
                            <div
                              _ngcontent-cni-c186=""
                              className="pb-2 ng-tns-c186-17"
                            >
                              <mbb-tagcard
                                _ngcontent-cni-c186=""
                                currency="VND"
                                className="ng-tns-c186-17"
                                _nghost-cni-c185=""
                                tabIndex={0}
                              >
                             

                                <Link _ngcontent-cni-c185="" to='/deposit/savingList/:?'>
                                  <div
                                    _ngcontent-cni-c185=""
                                    className="d-flex align-items-center tagcard"
                                    style={{
                                      borderRadius: 6,
                                      border: "solid 1px #cccccc"
                                    }}
                                  >
                                   

                                    <img
                                      _ngcontent-cni-c185=""
                                      style={{ marginRight: 5 }}
                                      src="https://online.mbbank.com.vn/assets/images/icons/saving.svg"
                                    />
                                
                                    <div
                                      _ngcontent-cni-c185=""
                                      className="d-flex flex-column"
                                    >
                                       <Tooltip title="To Savings List">
                                      <span
                                        _ngcontent-cni-c185=""
                                        className="label"
                                      >
                                        Savings Amount
                                      </span>

                                       </Tooltip>
                                      <div
                                        _ngcontent-cni-c185=""
                                        className="d-flex flex-row"
                                      >
                                        <span
                                          _ngcontent-cni-c185=""
                                          className="balance"
                                        >
                                          {savingsAmount.toLocaleString('en-US')}
                                        </span>
                                        <div
                                          _ngcontent-cni-c185=""
                                          className="d-flex align-items-start flex-column pb-1"
                                        >
                                          <span
                                            _ngcontent-cni-c185=""
                                            className="align-bottom mt-auto currency ml-1"
                                          >
                                            USD
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                    <mat-icon
                                      _ngcontent-cni-c185=""
                                      role="img"
                                      aria-hidden="false"
                                      className="mat-icon notranslate chevron-right-icon ml-auto material-icons mat-icon-no-color"
                                      data-mat-icon-type="font"
                                    >
                                      
                                    </mat-icon>
                                  </div>
                                </Link>
                             
                              </mbb-tagcard>
                            </div>
                            <div
                              _ngcontent-cni-c186=""
                              className="ng-tns-c186-17"
                            >
                              <mbb-tagcard
                                _ngcontent-cni-c186=""
                                currency="VND"
                                className="ng-tns-c186-17"
                                _nghost-cni-c185=""
                                tabIndex={0}
                              >
                                <a _ngcontent-cni-c185="">
                                  <div
                                    _ngcontent-cni-c185=""
                                    className="d-flex align-items-center tagcard"
                                    style={{
                                      borderRadius: 6,
                                      border: "solid 1px #cccccc"
                                    }}
                                  >
                                    <img
                                      _ngcontent-cni-c185=""
                                      style={{ marginRight: 5 }}
                                      src="https://online.mbbank.com.vn/assets/images/icons/loan.svg"
                                    />
                                    <div
                                      _ngcontent-cni-c185=""
                                      className="d-flex flex-column"
                                    >
                                      <span
                                        _ngcontent-cni-c185=""
                                        className="label"
                                      >
                                        Loan amount
                                      </span>
                                      <div
                                        _ngcontent-cni-c185=""
                                        className="d-flex flex-row"
                                      >
                                        <span
                                          _ngcontent-cni-c185=""
                                          className="balance"
                                        >
                                          0
                                        </span>
                                        <div
                                          _ngcontent-cni-c185=""
                                          className="d-flex align-items-start flex-column pb-1"
                                        >
                                          <span
                                            _ngcontent-cni-c185=""
                                            className="align-bottom mt-auto currency ml-1"
                                          >
                                            USD
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                    <mat-icon
                                      _ngcontent-cni-c185=""
                                      role="img"
                                      aria-hidden="false"
                                      className="mat-icon notranslate chevron-right-icon ml-auto material-icons mat-icon-no-color"
                                      data-mat-icon-type="font"
                                    >
                                      
                                    </mat-icon>
                                  </div>
                                </a>
                              </mbb-tagcard>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </mbb-finance-information>
                <mbb-history-transaction
                  _ngcontent-cni-c196=""
                  _nghost-cni-c189=""
                >
                  <div _ngcontent-cni-c189="" className="edit-pd">
                    <span _ngcontent-cni-c189="" className="lbl_fone">
                      {" "}
                      Offer{" "}
                    </span>
                  </div>
                  <div _ngcontent-cni-c189="" className="row">
                    <mbb-activity-indicator
                      _ngcontent-cni-c189=""
                      _nghost-cni-c182=""
                      className="isHidden"
                    >
                      {/**/}
                    </mbb-activity-indicator>
                    <div
                      _ngcontent-cni-c189=""
                      className="col-lg-6 col-md-6 col-xl-6"
                    >
                      <mbb-list-recent-bill
                        _ngcontent-cni-c189=""
                        _nghost-cni-c188=""
                      >
                        <div _ngcontent-cni-c188="" className="panel">
                          <div
                            _ngcontent-cni-c188=""
                            className="panel-heading p-0 heading ng-star-inserted"
                          >
                            <div
                              _ngcontent-cni-c188=""
                              className="container-fluid"
                            >
                              <div
                                _ngcontent-cni-c188=""
                                className="row text-center"
                              >
                                <ul _ngcontent-cni-c188="">
                                  <li
                                    _ngcontent-cni-c188=""
                                    className="header-1"
                                  >
                                    <p _ngcontent-cni-c188="" className="mb-0">
                                    <Tooltip placement="topLeft" title="Show most recent invoices" color={"geekblue"}>
                                      
                                      <img
                                        _ngcontent-cni-c188=""
                                        src="https://online.mbbank.com.vn/assets/images/icons/icon_hoicham2.svg"
                                      />
                                    </Tooltip>
                                      <span
                                        _ngcontent-cni-c188=""
                                        className="ml-2"
                                      >
                                        LIST OF RECENT INVOICES
                                      </span>
                                    </p>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          {/**/}
                          <div _ngcontent-cni-c188="" className="panel-body">
                            {/**/}
                            {/**/}
                            {/**/}
                            {/**/}
                            <div
                              _ngcontent-cni-c188=""
                              className="no-data ng-star-inserted"
                            >
                              No record to display
                            </div>
                            {/**/}
                          </div>
                        </div>
                      </mbb-list-recent-bill>
                    </div>
                    <div
                      _ngcontent-cni-c189=""
                      className="col-lg-6 col-md-6 col-xl-6"
                    >
                      <div _ngcontent-cni-c189="" className="panel">
                        <div
                          _ngcontent-cni-c189=""
                          className="panel-heading p-0 heading"
                        >
                          <div
                            _ngcontent-cni-c189=""
                            className="container-fluid"
                          >
                            <div
                              _ngcontent-cni-c189=""
                              className="row text-center"
                            >
                              <ul _ngcontent-cni-c189="">
                                <li
                                  _ngcontent-cni-c189=""
                                  className="header active"
                                >
                                  <p
                                    _ngcontent-cni-c189=""
                                    className="mb-0 d-flex"
                                  >
                                    {/**/}
                                    <Tooltip placement="topLeft" title="Show most recent transactions" color={"geekblue"}>
                                      
                                      <img
                                        _ngcontent-cni-c188=""
                                        src="https://online.mbbank.com.vn/assets/images/icons/icon_hoicham2.svg"
                                      />
                                    </Tooltip>
                                    {/**/}
                                    <span
                                      _ngcontent-cni-c189=""
                                      className="ml-2"
                                    >
                                      LIST OF RECENT TRANSACTIONS
                                    </span>
                                  </p>
                                </li>
                               
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div
                          _ngcontent-cni-c189=""
                          className="panel-body p-0 p-0"
                        >
                          <div
                            _ngcontent-cni-c189=""
                            className="tab-content active"
                          >
                            <ul _ngcontent-cni-c189="">{/**/}</ul>
                            <div
                              _ngcontent-cni-c189=""
                              className="no-data ng-star-inserted"
                            >
                              No record to display
                            </div>
                            {/**/}
                          </div>
                          <div _ngcontent-cni-c189="" className="tab-content">
                            <ul _ngcontent-cni-c189="">{/**/}</ul>
                            
                            
                            {/**/}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </mbb-history-transaction>
              </div>
              <div _ngcontent-cni-c196="" className="col-xl-4 col-md-12">
                <Form form={form} onFinish={handleFormSubmit}>
                <div _ngcontent-cni-c196="">
                  <div _ngcontent-cni-c196="" className="edit-pd">
                    <span _ngcontent-cni-c196="" className="lbl_fone">
                      {" "}
                      Savings interest rates{" "}
                    </span>
                  </div>
                  <mbb-deposit-interest-rates
                    _ngcontent-cni-c196=""
                    _nghost-cni-c194=""
                  >
                    <div _ngcontent-cni-c194="" className="panel padd-css1">
                      <mat-tab-group
                        _ngcontent-cni-c194=""
                        mat-stretch-tabs=""
                        animationduration="0ms"
                        className="mat-tab-group mat-primary"
                      >
                        <mat-tab-header className="mat-tab-header">
                          <button
                            aria-hidden="true"
                            type="button"
                            mat-ripple=""
                            tabIndex={-1}
                            className="mat-ripple mat-tab-header-pagination mat-tab-header-pagination-before mat-elevation-z4 mat-tab-header-pagination-disabled"
                            disabled=""
                          >
                            <div className="mat-tab-header-pagination-chevron" />
                          </button>
                          <div className="mat-tab-label-container">
                            <div
                              role="tablist"
                              className="mat-tab-list"
                              style={{ transform: "translateX(0px)" }}
                            >
                              <div className="mat-tab-labels">
                                <div
                                  role="tab"
                                  mattablabelwrapper=""
                                  mat-ripple=""
                                  cdkmonitorelementfocus=""
                                  className="mat-ripple mat-tab-label mat-focus-indicator mat-tab-label-active ng-star-inserted"
                                  id="mat-tab-label-3-0"
                                  tabIndex={0}
                                  aria-posinset={1}
                                  aria-setsize={2}
                                 
                                  aria-selected="true"
                                  aria-disabled="false"
                                  onClick={() => toggleCollapse2(8)}
                                  aria-controls="tinhlai-colapse"
                                  aria-expanded={openCollapse2 === 8}
                                >
                                  <div className="mat-tab-label-content">
                                  INTEREST CALCULATION TOOL{/**/}
                                    {/**/}
                                  </div>
                                </div>
                                {/* <div
                                  role="tab"
                                  mattablabelwrapper=""
                                  mat-ripple=""
                                  cdkmonitorelementfocus=""
                                  className="mat-ripple mat-tab-label mat-focus-indicator ng-star-inserted"
                                  id="mat-tab-label-3-1"
                                  tabIndex={-1}
                                  aria-posinset={2}
                                  aria-setsize={2}
                                
                                  aria-selected="false"
                                  aria-disabled="false"
                                  onClick={() => toggleCollapse2(7)}
                                aria-controls="laitiengui-colapse"
                                aria-expanded={openCollapse2 === 7}
                                >
                                  <div className="mat-tab-label-content">
                                    BIỂU LÃI TIỀN GỬI
                                   
                                  </div>
                                </div> */}
                                {/**/}
                              </div>
                              <Collapse in={openCollapse2 === 7}>
                                <div id="laitiengui-colapse" className="mt-3">
                                BIỂU LÃI TIỀN GỬI content
                                </div>
                            </Collapse>
                              <mat-ink-bar
                                className="mat-ink-bar"
                                style={{
                                  visibility: "visible",
                                  left: 0,
                                  width: 384
                                }}
                              />
                            </div>
                          </div>
                          <button
                            aria-hidden="true"
                            type="button"
                            mat-ripple=""
                            tabIndex={-1}
                            className="mat-ripple mat-tab-header-pagination mat-tab-header-pagination-after mat-elevation-z4 mat-tab-header-pagination-disabled"
                            disabled=""
                          >
                            <div className="mat-tab-header-pagination-chevron" />
                          </button>
                        </mat-tab-header>
                        <Collapse in={openCollapse2 === 8}>
                                <div id="tinhlai-colapse" className="mt-3">
                                
                                   <div className="mat-tab-body-wrapper">
                          <mat-tab-body
                            role="tabpanel"
                            className="mat-tab-body ng-tns-c135-20 mat-tab-body-active ng-star-inserted"
                            id="mat-tab-content-3-0"
                            aria-labelledby="mat-tab-label-3-0"
                          >
                            <div
                              cdkscrollable=""
                              className="mat-tab-body-content ng-tns-c135-20 ng-trigger ng-trigger-translateTab"
                              style={{ transform: "none" }}
                            >
                              <div
                                _ngcontent-cni-c194=""
                                className="panel-body ng-star-inserted"
                                style={{}}
                              >
                                <div
                                  _ngcontent-cni-c194=""
                                  className="interest-calculator"
                                >
                                  <img
                                    _ngcontent-cni-c194=""
                                    src="https://online.mbbank.com.vn/assets/images/finance.svg"
                                    className="img-fluid"
                                  />
                                  <div
                                    _ngcontent-cni-c194=""
                                    className="expected-interest"
                                  >
                                    <span
                                      _ngcontent-cni-c194=""
                                      className="desription-2"
                                    >
                                      Estimated interest (USD)
                                    </span>
                                    <br _ngcontent-cni-c194="" />
                                    <span
                                      _ngcontent-cni-c194=""
                                      className="desription-3"
                                    >
                                      0
                                    </span>
                                  </div>
                                </div>
                                <span
                                  _ngcontent-cni-c194=""
                                  className="desription-1"
                                >
                                  The spreadsheet is for reference only and applies to interest payments at the end of the period
                                </span>
                                <div
                                  _ngcontent-cni-c194=""
                                  className="form-group row mrl-0 mrr-0 choose-row d-flex align-items-start"
                                >
                                  <label
                                    _ngcontent-cni-c194=""
                                    className="col-sm-4 col-form-label pdl-0"
                                  >
                                    Savings
                                  </label>
                                  <Form.Item
                                      _ngcontent-cni-c194=""
                                      className="col-sm-8 pd-0"
                                      name="DepositAmount"
                                      rules={[
                                        { required: true, message: 'Please enter the savings value!' }
                                      ]}
                                    >
                                      <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <Input
                                          style={{ flex: 1 }}
                                          placeholder="Enter the savings value"
                                          maxLength={16}
                                        />
                                        <span
                                          style={{
                                            width: '60px',
                                            padding: '4px 0',
                                            textAlign: 'center',
                                            background: '#f5f5f5',
                                            border: '1px solid #d9d9d9',
                                            borderLeft: 'none',
                                          }}
                                        >
                                          USD
                                        </span>
                                      </div>
                                    </Form.Item>

                                </div>
                                <div
                                  _ngcontent-cni-c194=""
                                  className="form-group row mrl-0 mrr-0 choose-row d-flex align-items-start"
                                >
                                  <label
                                    _ngcontent-cni-c194=""
                                    className="col-sm-4 col-form-label pdl-0"
                                  >
                                    Interest term
                                  </label>
                                  <Form.Item
                                    _ngcontent-cni-c194=""
                                    className="col-sm-8 pd-0"
                                    name= 'Term'
                                    rules={[
                                      { required: true, message: 'Please select an interest term!' }
                                    ]}
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
                                </div>
                                
                                {!isResult ? (
                                  isProgess ? (
                                    <Progress percent={percent} status="active" />
                                  ) : (
                                    ''
                                  )
                                ) : (
                                  <>
                                    <div className="form-group row mrl-0 mrr-0 choose-row">
                                     
                                      <Descriptions title="Result:" bordered items={items} />
                                    
                                    </div>
                                  </>
                                )}

                                {/**/}
                                <button
                                  _ngcontent-cni-c194=""
                                  type="primary"
                                  htmlType="submit" 
                                  className="btn btn-primary col-12 mrt-16"
                                  disabled=""
                                >
                                  {" "}
                                  Calculate{" "}
                                </button>
                              </div>
                              {/**/}
                            </div>
                          </mat-tab-body>
                          <mat-tab-body
                            role="tabpanel"
                            className="mat-tab-body ng-tns-c135-21 ng-star-inserted"
                            id="mat-tab-content-3-1"
                            aria-labelledby="mat-tab-label-3-1"
                          >
                            <div
                              cdkscrollable=""
                              className="mat-tab-body-content ng-tns-c135-21 ng-trigger ng-trigger-translateTab"
                              style={{
                                transform: "translate3d(100%, 0px, 0px)",
                                minHeight: 1
                              }}
                            >
                              {/**/}
                            </div>
                          </mat-tab-body>
                          {/**/}
                        </div>
                              
                                </div>
                         </Collapse>
                        
                      </mat-tab-group>
                    </div>
                  </mbb-deposit-interest-rates>
                </div>

                </Form>
                <mbb-your-promotion _ngcontent-cni-c196="" _nghost-cni-c195="">
                  <div _ngcontent-cni-c195="" className="edit-pd">
                    <span _ngcontent-cni-c195="" className="lbl_fone">
                      {" "}
                      Promotion for you{" "}
                    </span>
                  </div>
                  <div _ngcontent-cni-c195="" className="panel">
                    <img
                      _ngcontent-cni-c195=""
                      src="/images/qc/qc-1.jpg"
                      className="img-fluid"
                      style={{width: '100%', height: '100%'}}
                    />
                  </div>
                </mbb-your-promotion>
              </div>
            </div>
          </div>
        </mbb-dashboard>
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
    );
}

export default Home;