import { useState } from "react";
import { Collapse } from "react-bootstrap";
import { FaChevronDown, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  BankOutlined,
} from '@ant-design/icons';
import { Button, Menu } from 'antd';
import { GrContactInfo } from "react-icons/gr";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { MdOutlineSavings } from "react-icons/md";
import { RiBillLine } from "react-icons/ri";
import { BsCreditCard2Back } from "react-icons/bs";
import { TbReceiptTax, TbSettingsCog } from "react-icons/tb";



const SlideLeft = ({
  target,
  sourceAccount,
  continent,
  listCard,
  digitalDeposit,
  loan,
  transfersMoney,
  beneficiaryList,
  transferMoneyByBatch,
  listCardService,
  cardTransactionHistory,
  savings,
  savingList
}) => {
  const [openCollapse, setOpenCollapse] = useState(target);

  const toggleCollapse = (index) => {
    setOpenCollapse(openCollapse === index ? null : index);
  };

  const items = [
    { key: 'sub1', icon: <BankOutlined/>, label: <a href="/">Dashboard</a> },
    { key: 'sub2',
      icon: <GrContactInfo />,
      label:  "Account Informations",
      children: [
        { key: '3', label: <Link to="/information-account/source-account/:?">SourceAccount</Link> },
        { key: '4',label: <Link to="/information-account/digital-deposit/:?">Digital</Link> },
        { key: '5',label:  <Link to="/information-account/list-card/:?">List Card</Link>},
        { key: '6',label:  <Link href="/information-account/loan/:?">Loan</Link>},
      ],
    },
    
    {
      key: 'sub3',
      label: 'Transfers',
      icon: <FaMoneyBillTransfer />,
      children: [
        { key: '7', label:  <Link to="/transfer/transfers-money/:?">Transfers Money</Link>},
        { key: '8', label:  <Link  to="/transfer/beneficiary-list/:?">Beneficiary List</Link>},
        { key: '9', label:  <Link  to="/transfer/transfer-money-by-batch/:?">Transfer money by Batch</Link>},
        
      ],
    },
    { key: 'sub4',
       icon: <MdOutlineSavings />,
       label: 'Savings and investment',
      children: [
        { key: '10', label:  <Link  to='/deposit/savings/:?'>Transfer money by Batch</Link>},
      ]
     },
    { key: 'sub5', icon: <RiBillLine />, label: 'Pay the bill' },
    {
      key: 'sub6',
      label: 'Card service',
      icon: <BsCreditCard2Back />,
      children: [
        { key: '11', label: 'Option 9' },
        { key: '12', label: 'Option 10' },
        {
          key: 'sub3',
          label: 'Submenu',
          children: [
            { key: '13', label: 'Option 11' },
            { key: '14', label: 'Option 12' },
          ],
        },
      ],
    },
    { key: 'sub7', icon: <TbReceiptTax />, label: 'Loan' },
    { key: 'sub8', icon: <TbSettingsCog />, label: 'Utilities' },
  ];
  return (
    <>
      <div _ngcontent-wkl-c177="" className="sidebar-sticky ng-tns-c177-2">
        <perfect-scrollbar
          _ngcontent-wkl-c177=""
          className="ps-mbb-vb ng-tns-c177-2"
          style={{ maxWidth: "100%", maxHeight: "100%" }}
        >
          <div style={{ position: "static" }} className="ps ps--active-y">
            <div className="ps-content">
              <div _ngcontent-wkl-c177="" className="scrollable-content">
                <mat-tree
                  _ngcontent-wkl-c177=""
                  role="tree"
                  className="mat-tree cdk-tree mbb-tree ng-tns-c177-2"
                >
                  <mat-tree-node
                    _ngcontent-wkl-c177=""
                    mattreenodetoggle=""
                    className="mat-tree-node cdk-tree-node ng-tns-c177-2 ng-star-inserted"
                    role="treeitem"
                    aria-level={1}
                    aria-expanded="true"
                  >
                    <a
                      _ngcontent-wkl-c177=""
                      routerlinkactive="active"
                      className="ng-tns-c177-2 active dashboad-active"
                      id="MNU_GCME_000001"
                      href="/"
                    >
                      <li
                        _ngcontent-wkl-c177=""
                        className="mat-tree-node ng-tns-c177-2"
                        style={{
                          borderLeft:
                            continent == "home"
                              ? ".3571428571rem solid #141ed2"
                              : "",
                          paddingLeft: continent ? "" : "",
                          background:
                            continent == "home" ? "rgba(0,0,0,0.11)" : "",
                        }}
                      >
                        <img
                          _ngcontent-wkl-c177=""
                          className="ng-tns-c177-2 ng-star-inserted"
                          src="https://online.mbbank.com.vn/assets/images/icon-menu/home.svg"
                        />
                        {/**/}
                        <span
                          _ngcontent-wkl-c177=""
                          style={{
                            fontFamily: "AvertaStdCY !important",
                          }}
                          className="ng-tns-c177-2"
                        >
                          {" "}
                          Dashboard{" "}
                        </span>
                      </li>
                    </a>
                  </mat-tree-node>
                  <mat-nested-tree-node
                    _ngcontent-wkl-c177=""
                    className="mat-nested-tree-node cdk-nested-tree-node cdk-tree-node ng-tns-c177-2 ng-star-inserted"
                    role="treeitem"
                    aria-level={1}
                    onClick={() => toggleCollapse(0)}
                    aria-controls="info-account-collapse"
                    aria-expanded={openCollapse === 0}
                  >
                    <li _ngcontent-wkl-c177="" className="ng-tns-c177-2">
                      <div className="arrow-slide">
                        <div
                          _ngcontent-wkl-c177=""
                          mat-icon-button=""
                          mattreenodetoggle=""
                          className="mat-tree-node ng-tns-c177-2"
                          id="MNU_GCME_040000"
                          aria-label="menu.parent.accountstatement"
                        >
                          <img
                            _ngcontent-wkl-c177=""
                            className="ng-tns-c177-2 ng-star-inserted"
                            src="https://online.mbbank.com.vn/assets/images/icon-menu/info_account.svg"
                          />
                          {/**/}

                          <span
                            _ngcontent-wkl-c177=""
                            className="float-left ng-tns-c177-2"
                            style={{
                              fontFamily: "AvertaStdCY !important",
                            }}
                          >
                            {" "}
                            Account information{" "}
                          </span>
                        </div>

                        <span
                          _ngcontent-wkl-c177
                          role="img"
                          className="icon-slide"
                          aria-hidden="true"
                          data-mat-icon-type="font"
                          style={{ transform: "rotate(0deg)" }}
                        >
                          {openCollapse === 0 ? (
                            <FaChevronDown />
                          ) : (
                            <FaChevronRight />
                          )}
                        </span>
                      </div>

                      <Collapse in={openCollapse === 0}>
                        <ul
                          _ngcontent-wkl-c177=""
                          className="ng-tns-c177-2 mat-tree-invisible ng-trigger ng-trigger-sidebarAnimation"
                        >
                          <mat-tree-node
                            _ngcontent-wkl-c177=""
                            mattreenodetoggle=""
                            className="mat-tree-node cdk-tree-node ng-tns-c177-2 ng-star-inserted"
                            role="treeitem"
                            aria-level={2}
                            aria-expanded="false"
                            style={{}}
                          >
                            <Link
                              _ngcontent-wkl-c177=""
                              routerlinkactive="active"
                              className="ng-tns-c177-2"
                              id="MNU_GCME_040001"
                              to="/information-account/source-account/:?"
                            >
                              <li
                                _ngcontent-wkl-c177=""
                                className="mat-tree-node ng-tns-c177-2"
                                style={{
                                  borderLeft: sourceAccount
                                    ? ".3571428571rem solid #141ed2"
                                    : "",
                                  paddingLeft: sourceAccount
                                    ? "3.3571428571rem"
                                    : "3.3571428571rem",
                                  background: sourceAccount
                                    ? "rgba(0,0,0,0.11)"
                                    : "",
                                }}
                              >
                                {/**/}
                                <span
                                  _ngcontent-wkl-c177=""
                                  style={{
                                    fontFamily: "AvertaStdCY !important",
                                  }}
                                  className="ng-tns-c177-2"
                                >
                                  {" "}
                                  Source account{" "}
                                </span>
                              </li>
                            </Link>
                          </mat-tree-node>
                          <mat-tree-node
                            _ngcontent-wkl-c177=""
                            mattreenodetoggle=""
                            className="mat-tree-node cdk-tree-node ng-tns-c177-2 ng-star-inserted"
                            role="treeitem"
                            aria-level={2}
                            aria-expanded="false"
                            style={{}}
                          >
                            <Link
                              _ngcontent-wkl-c177=""
                              routerlinkactive="active"
                              className="ng-tns-c177-2"
                              id="MNU_GCME_040002"
                              to="/information-account/list-card/:?"
                            >
                              <li
                                _ngcontent-wkl-c177=""
                                className="mat-tree-node ng-tns-c177-2"
                                style={{
                                  borderLeft: listCard
                                    ? ".3571428571rem solid #141ed2"
                                    : "",
                                  paddingLeft: listCard
                                    ? "3.3571428571rem"
                                    : "3.3571428571rem",
                                  background: listCard
                                    ? "rgba(0,0,0,0.11)"
                                    : "",
                                }}
                              >
                                {/**/}
                                <span
                                  _ngcontent-wkl-c177=""
                                  style={{
                                    fontFamily: "AvertaStdCY !important",
                                  }}
                                  className="ng-tns-c177-2"
                                >
                                  {" "}
                                  List card{" "}
                                </span>
                              </li>
                            </Link>
                          </mat-tree-node>
                          <mat-tree-node
                            _ngcontent-wkl-c177=""
                            mattreenodetoggle=""
                            className="mat-tree-node cdk-tree-node ng-tns-c177-2 ng-star-inserted"
                            role="treeitem"
                            aria-level={2}
                            aria-expanded="false"
                            style={{}}
                          >
                            <Link
                              _ngcontent-wkl-c177=""
                              routerlinkactive="active"
                              className="ng-tns-c177-2"
                              id="MNU_GCME_990610"
                              to="/information-account/digital-deposit/:?"
                            >
                              <li
                                _ngcontent-wkl-c177=""
                                className="mat-tree-node ng-tns-c177-2"
                                style={{
                                  borderLeft: digitalDeposit
                                    ? ".3571428571rem solid #141ed2"
                                    : "",
                                  paddingLeft: digitalDeposit
                                    ? "3.3571428571rem"
                                    : "3.3571428571rem",
                                  background: digitalDeposit
                                    ? "rgba(0,0,0,0.11)"
                                    : "",
                                }}
                              >
                                {/**/}
                                <span
                                  _ngcontent-wkl-c177=""
                                  style={{
                                    fontFamily: "AvertaStdCY !important",
                                  }}
                                  className="ng-tns-c177-2"
                                >
                                  {" "}
                                  Digital deposit{" "}
                                </span>
                              </li>
                            </Link>
                          </mat-tree-node>
                          <mat-tree-node
                            _ngcontent-wkl-c177=""
                            mattreenodetoggle=""
                            className="mat-tree-node cdk-tree-node ng-tns-c177-2 ng-star-inserted"
                            role="treeitem"
                            aria-level={2}
                            aria-expanded="false"
                            style={{}}
                          >
                            {/* <a
                              _ngcontent-wkl-c177=""
                              routerlinkactive="active"
                              className="ng-tns-c177-2"
                              id="MNU_GCME_780101"
                              href="/information-account/loan/:?"
                            >
                              <li
                                _ngcontent-wkl-c177=""
                                className="mat-tree-node ng-tns-c177-2"
                                style={{
                                  borderLeft: loan
                                    ? ".3571428571rem solid #141ed2"
                                    : "",
                                  paddingLeft: loan
                                    ? "3.3571428571rem"
                                    : "3.3571428571rem",
                                  background: loan ? "rgba(0,0,0,0.11)" : "",
                                }}
                              >
                               
                                <span
                                  _ngcontent-wkl-c177=""
                                  style={{
                                    fontFamily: "AvertaStdCY !important",
                                  }}
                                  className="ng-tns-c177-2"
                                >
                                  
                                  Loan
                                </span>
                              </li>
                            </a> */}
                          </mat-tree-node>
                          {/**/}
                        </ul>
                      </Collapse>
                    </li>
                  </mat-nested-tree-node>
                  <mat-nested-tree-node
                    _ngcontent-wkl-c177=""
                    className="mat-nested-tree-node cdk-nested-tree-node cdk-tree-node ng-tns-c177-2 ng-star-inserted"
                    role="treeitem"
                    aria-level={1}
                    onClick={() => toggleCollapse(1)}
                    aria-controls="transfer-colapse"
                    aria-expanded={openCollapse === 1}
                  >
                    <li _ngcontent-wkl-c177="" className="ng-tns-c177-2">
                      <div className="arrow-slide">
                        <div
                          _ngcontent-wkl-c177=""
                          mat-icon-button=""
                          mattreenodetoggle=""
                          className="mat-tree-node ng-tns-c177-2"
                          id="MNU_GCME_050000"
                          aria-label="menu.parent.transfermanagement"
                        >
                          <img
                            _ngcontent-wkl-c177=""
                            className="ng-tns-c177-2 ng-star-inserted"
                            src="https://online.mbbank.com.vn/assets/images/icon-menu/transfer.svg"
                          />
                          {/**/}
                          <span
                            _ngcontent-wkl-c177=""
                            className="float-left ng-tns-c177-2"
                            style={{
                              fontFamily: "AvertaStdCY !important",
                            }}
                          >
                            {" "}
                            Transfers{" "}
                          </span>
                        </div>
                        <span
                          _ngcontent-wkl-c177=""
                          role="img"
                          className="icon-slide"
                          aria-hidden="true"
                          data-mat-icon-type="font"
                          style={{ transform: "rotate(0deg)" }}
                        >
                          {openCollapse === 1 ? (
                            <FaChevronDown />
                          ) : (
                            <FaChevronRight />
                          )}
                        </span>
                      </div>

                      <Collapse in={openCollapse === 1}>
                        <div id="transfer-colapse">
                          <ul
                            _ngcontent-wkl-c177=""
                            className="ng-tns-c177-2 mat-tree-invisible ng-trigger ng-trigger-sidebarAnimation"
                          >
                            <mat-tree-node
                              _ngcontent-wkl-c177=""
                              mattreenodetoggle=""
                              className="mat-tree-node cdk-tree-node ng-tns-c177-2 ng-star-inserted"
                              role="treeitem"
                              aria-level={2}
                              aria-expanded="false"
                              style={{}}
                            >
                              <Link
                                _ngcontent-wkl-c177=""
                                routerlinkactive="active"
                                className="ng-tns-c177-2"
                                id="MNU_GCME_050301"
                                to="/transfer/transfers-money/:?"
                              >
                                <li
                                  _ngcontent-wkl-c177=""
                                  className="mat-tree-node ng-tns-c177-2"
                                  style={{
                                    borderLeft: transfersMoney
                                      ? ".3571428571rem solid #141ed2"
                                      : "",
                                    paddingLeft: transfersMoney
                                      ? "3.3571428571rem"
                                      : "3.3571428571rem",
                                    background: transfersMoney
                                      ? "rgba(0,0,0,0.11)"
                                      : "",
                                  }}
                                >
                                  {/**/}
                                  <span
                                    _ngcontent-wkl-c177=""
                                    style={{
                                      fontFamily: "AvertaStdCY !important",
                                    }}
                                    className="ng-tns-c177-2"
                                  >
                                    {" "}
                                    Transfers money{" "}
                                  </span>
                                </li>
                              </Link>
                            </mat-tree-node>
                            <mat-tree-node
                              _ngcontent-wkl-c177=""
                              mattreenodetoggle=""
                              className="mat-tree-node cdk-tree-node ng-tns-c177-2 ng-star-inserted"
                              role="treeitem"
                              aria-level={2}
                              aria-expanded="false"
                              style={{}}
                            >
                              <Link
                                _ngcontent-wkl-c177=""
                                routerlinkactive="active"
                                className="ng-tns-c177-2"
                                id="MNU_GCME_050100"
                                to="/transfer/beneficiary-list/:?"
                              >
                                <li
                                  _ngcontent-wkl-c177=""
                                  className="mat-tree-node ng-tns-c177-2"
                                  style={{
                                    borderLeft: beneficiaryList
                                      ? ".3571428571rem solid #141ed2"
                                      : "",
                                    paddingLeft: beneficiaryList
                                      ? "3.3571428571rem"
                                      : "3.3571428571rem",
                                    background: beneficiaryList
                                      ? "rgba(0,0,0,0.11)"
                                      : "",
                                  }}
                                >
                                  {/**/}
                                  <span
                                    _ngcontent-wkl-c177=""
                                    style={{
                                      fontFamily: "AvertaStdCY !important",
                                    }}
                                    className="ng-tns-c177-2"
                                  >
                                    {" "}
                                    Beneficiary list{" "}
                                  </span>
                                </li>
                              </Link>
                            </mat-tree-node>
                            <mat-tree-node
                              _ngcontent-wkl-c177=""
                              mattreenodetoggle=""
                              className="mat-tree-node cdk-tree-node ng-tns-c177-2 ng-star-inserted"
                              role="treeitem"
                              aria-level={2}
                              aria-expanded="false"
                              style={{}}
                            >
                              <Link
                                _ngcontent-wkl-c177=""
                                routerlinkactive="active"
                                className="ng-tns-c177-2"
                                id="MNU_GCME_050302"
                                to="/transfer/transfer-money-by-batch/:?"
                              >
                                <li
                                  _ngcontent-wkl-c177=""
                                  className="mat-tree-node ng-tns-c177-2"
                                  style={{
                                    borderLeft: transferMoneyByBatch
                                      ? ".3571428571rem solid #141ed2"
                                      : "",
                                    paddingLeft: transferMoneyByBatch
                                      ? "3.3571428571rem"
                                      : "3.3571428571rem",
                                    background: transferMoneyByBatch
                                      ? "rgba(0,0,0,0.11)"
                                      : "",
                                  }}
                                >
                                  {/**/}
                                  <span
                                    _ngcontent-wkl-c177=""
                                    style={{
                                      fontFamily: "AvertaStdCY !important",
                                    }}
                                    className="ng-tns-c177-2"
                                  >
                                    {" "}
                                    Transfers money by batch{" "}
                                  </span>
                                </li>
                              </Link>
                            </mat-tree-node>
                            {/**/}
                          </ul>
                        </div>
                      </Collapse>
                    </li>
                  </mat-nested-tree-node>
                  <mat-nested-tree-node
                    _ngcontent-wkl-c177=""
                    className="mat-nested-tree-node cdk-nested-tree-node cdk-tree-node ng-tns-c177-2 ng-star-inserted"
                    role="treeitem"
                    aria-level={1}
                    onClick={() => toggleCollapse(2)}
                    aria-controls="saving-colapse"
                    aria-expanded={openCollapse === 2}
                  >
                    <li _ngcontent-wkl-c177="" className="ng-tns-c177-2">
                      <div className="arrow-slide">
                        <div
                          _ngcontent-wkl-c177=""
                          mat-icon-button=""
                          mattreenodetoggle=""
                          className="mat-tree-node ng-tns-c177-2"
                          id="MNU_GCME_990699"
                          aria-label="menu.parent.saving"
                        >
                          <img
                            _ngcontent-wkl-c177=""
                            className="ng-tns-c177-2 ng-star-inserted"
                            src="https://online.mbbank.com.vn/assets/images/icon-menu/saving.svg"
                          />
                          {/**/}
                          <span
                            _ngcontent-wkl-c177=""
                            className="float-left ng-tns-c177-2"
                            style={{
                              fontFamily: "AvertaStdCY !important",
                            }}
                          >
                            {" "}
                            Savings and investment{" "}
                          </span>
                        </div>
                        <span
                          _ngcontent-wkl-c177=""
                          role="img"
                          className="icon-slide"
                          aria-hidden="true"
                          data-mat-icon-type="font"
                          style={{ transform: "rotate(0deg)" }}
                        >
                          {openCollapse === 2 ? (
                            <FaChevronDown />
                          ) : (
                            <FaChevronRight />
                          )}
                        </span>
                      </div>
                      <Collapse in={openCollapse === 2}>
                        <div id="saving-colapse">
                          <ul
                            _ngcontent-wkl-c177=""
                            className="ng-tns-c177-2 mat-tree-invisible ng-trigger ng-trigger-sidebarAnimation"
                          >
                            <mat-tree-node
                              _ngcontent-wkl-c177=""
                              mattreenodetoggle=""
                              className="mat-tree-node cdk-tree-node ng-tns-c177-2 ng-star-inserted"
                              role="treeitem"
                              aria-level={2}
                              aria-expanded="false"
                              style={{}}
                            >
                              <Link
                                _ngcontent-wkl-c177=""
                                routerlinkactive="active"
                                className="ng-tns-c177-2"
                                id="MNU_GCME_990600"
                                to="/deposit/savings/:?"
                              >
                                <li
                                  _ngcontent-wkl-c177=""
                                  className="mat-tree-node ng-tns-c177-2"
                                  style={{
                                    borderLeft: savings
                                      ? ".3571428571rem solid #141ed2"
                                      : "",
                                    paddingLeft: savings
                                      ? "3.3571428571rem"
                                      : "3.3571428571rem",
                                    background: savings
                                      ? "rgba(0,0,0,0.11)"
                                      : "",
                                  }}
                                >
                                  {/**/}
                                  <span
                                    _ngcontent-wkl-c177=""
                                    style={{
                                      fontFamily: "AvertaStdCY !important",
                                    }}
                                    className="ng-tns-c177-2"
                                  >
                                    {" "}
                                    Open digital savings account{" "}
                                  </span>
                                </li>
                              </Link>
                            </mat-tree-node>
                            <mat-tree-node
                              _ngcontent-wkl-c177=""
                              mattreenodetoggle=""
                              className="mat-tree-node cdk-tree-node ng-tns-c177-2 ng-star-inserted"
                              role="treeitem"
                              aria-level={2}
                              aria-expanded="false"
                              style={{}}
                            >
                              <Link
                                _ngcontent-wkl-c177=""
                                routerlinkactive="active"
                                className="ng-tns-c177-2"
                                id="MNU_GCME_990611"
                                to="/deposit/savingList/:?"
                              >
                                <li
                                  _ngcontent-wkl-c177=""
                                  className="mat-tree-node ng-tns-c177-2"
                                  style={{
                                    borderLeft: savingList
                                      ? ".3571428571rem solid #141ed2"
                                      : "",
                                    paddingLeft: savingList
                                      ? "3.3571428571rem"
                                      : "3.3571428571rem",
                                    background: savingList
                                      ? "rgba(0,0,0,0.11)"
                                      : "",
                                  }}
                                >
                                  {/**/}
                                  <span
                                    _ngcontent-wkl-c177=""
                                    style={{
                                      fontFamily: "AvertaStdCY !important",
                                    }}
                                    className="ng-tns-c177-2"
                                  >
                                    {" "}
                                    Digital deposit{" "}
                                  </span>
                                </li>
                              </Link>
                            </mat-tree-node>
                            {/**/}
                          </ul>
                        </div>
                      </Collapse>
                    </li>
                  </mat-nested-tree-node>
                  <mat-tree-node
                    _ngcontent-wkl-c177=""
                    mattreenodetoggle=""
                    className="mat-tree-node cdk-tree-node ng-tns-c177-2 ng-star-inserted"
                    role="treeitem"
                    aria-level={1}
                    aria-expanded="false"
                  >
                    <Link
                      _ngcontent-wkl-c177=""
                      routerlinkactive="active"
                      className="ng-tns-c177-2 dashboad-active"
                      id="MNU_GCME_060000"
                      to="/cheque"
                    >
                      <li
                        _ngcontent-wkl-c177=""
                        className="mat-tree-node ng-tns-c177-2"
                        style={{
                          borderLeft:
                            continent == "cheque"
                              ? ".3571428571rem solid #141ed2"
                              : "",
                          paddingLeft: continent ? "" : "",
                          background:
                            continent == "cheque" ? "rgba(0,0,0,0.11)" : "",
                        }}
                      >
                        <img
                          _ngcontent-wkl-c177=""
                          className="ng-tns-c177-2 ng-star-inserted"
                          src="https://online.mbbank.com.vn/assets/images/icon-menu/payment.svg"
                        />
                        {/**/}
                        <span
                          _ngcontent-wkl-c177=""
                          style={{
                            fontFamily: "AvertaStdCY !important",
                          }}
                          className="ng-tns-c177-2"
                        >
                          {" "}
                          Cheque{" "}
                        </span>
                      </li>
                    </Link>
                  </mat-tree-node>
                  <mat-nested-tree-node
                    _ngcontent-wkl-c177=""
                    className="mat-nested-tree-node cdk-nested-tree-node cdk-tree-node ng-tns-c177-2 ng-star-inserted"
                    role="treeitem"
                    aria-level={1}
                    onClick={() => toggleCollapse(3)}
                    aria-controls="service-card-colapse"
                    aria-expanded={openCollapse === 3}
                  >
                    <li _ngcontent-wkl-c177="" className="ng-tns-c177-2">
                      <div className="arrow-slide">
                        <div
                          _ngcontent-wkl-c177=""
                          mat-icon-button=""
                          mattreenodetoggle=""
                          className="mat-tree-node ng-tns-c177-2"
                          id="MNU_GCME_700000"
                          aria-label="menu.parent.service_card"
                        >
                          <img
                            _ngcontent-wkl-c177=""
                            className="ng-tns-c177-2 ng-star-inserted"
                            src="https://online.mbbank.com.vn/assets/images/icon-menu/service_card.svg"
                          />
                          {/**/}
                          <span
                            _ngcontent-wkl-c177=""
                            className="float-left ng-tns-c177-2"
                            style={{
                              fontFamily: "AvertaStdCY !important",
                            }}
                          >
                            {" "}
                            Card service{" "}
                          </span>
                        </div>
                        <span
                          _ngcontent-wkl-c177=""
                          role="img"
                          className="icon-slide"
                          aria-hidden="true"
                          data-mat-icon-type="font"
                          style={{ transform: "rotate(0deg)" }}
                        >
                          {openCollapse === 3 ? (
                            <FaChevronDown />
                          ) : (
                            <FaChevronRight />
                          )}
                        </span>
                      </div>
                      <Collapse in={openCollapse === 3}>
                        <div id="service-card-colapse">
                          <ul
                            _ngcontent-wkl-c177=""
                            className="ng-tns-c177-2 mat-tree-invisible ng-trigger ng-trigger-sidebarAnimation"
                          >
                            <mat-tree-node
                              _ngcontent-wkl-c177=""
                              mattreenodetoggle=""
                              className="mat-tree-node cdk-tree-node ng-tns-c177-2 ng-star-inserted"
                              role="treeitem"
                              aria-level={2}
                              aria-expanded="false"
                              style={{}}
                            >
                              <Link
                                _ngcontent-wkl-c177=""
                                routerlinkactive="active"
                                className="ng-tns-c177-2"
                                id="MNU_GCME_700001"
                                to="/card-service/list-card/:?"
                              >
                                <li
                                  _ngcontent-wkl-c177=""
                                  className="mat-tree-node ng-tns-c177-2"
                                  style={{
                                    borderLeft: listCardService
                                      ? ".3571428571rem solid #141ed2"
                                      : "",
                                    paddingLeft: listCardService
                                      ? "3.3571428571rem"
                                      : "3.3571428571rem",
                                    background: listCardService
                                      ? "rgba(0,0,0,0.11)"
                                      : "",
                                  }}
                                >
                                  {/**/}
                                  <span
                                    _ngcontent-wkl-c177=""
                                    style={{
                                      fontFamily: "AvertaStdCY !important",
                                    }}
                                    className="ng-tns-c177-2"
                                  >
                                    {" "}
                                    List card{" "}
                                  </span>
                                </li>
                              </Link>
                            </mat-tree-node>
                            <mat-tree-node
                              _ngcontent-wkl-c177=""
                              mattreenodetoggle=""
                              className="mat-tree-node cdk-tree-node ng-tns-c177-2 ng-star-inserted"
                              role="treeitem"
                              aria-level={2}
                              aria-expanded="false"
                              style={{}}
                            >
                              <a
                                _ngcontent-wkl-c177=""
                                routerlinkactive="active"
                                className="ng-tns-c177-2"
                                id="MNU_GCME_701500"
                                href="/information-account/i-card/card-credit"
                              >
                                <li
                                  _ngcontent-wkl-c177=""
                                  className="mat-tree-node ng-tns-c177-2"
                                >
                                  {/**/}
                                  <span
                                    _ngcontent-wkl-c177=""
                                    style={{
                                      fontFamily: "AvertaStdCY !important",
                                      paddingLeft: '3.3571428571rem'
                                    }}
                                    className="ng-tns-c177-2"
                                  >
                                    {" "}
                                    Pay off credit card debt{" "}
                                  </span>
                                </li>
                              </a>
                            </mat-tree-node>
                            <mat-tree-node
                              _ngcontent-wkl-c177=""
                              mattreenodetoggle=""
                              className="mat-tree-node cdk-tree-node ng-tns-c177-2 ng-star-inserted"
                              role="treeitem"
                              aria-level={2}
                              aria-expanded="false"
                              style={{}}
                            >
                              <Link
                                _ngcontent-wkl-c177=""
                                routerlinkactive="active"
                                className="ng-tns-c177-2"
                                id="MNU_GCME_701111"
                                to="/card-service/card-transaction-history/:?"
                              >
                                <li
                                  _ngcontent-wkl-c177=""
                                  className="mat-tree-node ng-tns-c177-2"
                                  style={{
                                    borderLeft: cardTransactionHistory
                                      ? ".3571428571rem solid #141ed2"
                                      : "",
                                    paddingLeft: cardTransactionHistory
                                      ? "3.3571428571rem"
                                      : "3.3571428571rem",
                                    background: cardTransactionHistory
                                      ? "rgba(0,0,0,0.11)"
                                      : "",
                                  }}
                                >
                                  {/**/}
                                  <span
                                    _ngcontent-wkl-c177=""
                                    style={{
                                      fontFamily: "AvertaStdCY !important",
                                    }}
                                    className="ng-tns-c177-2"
                                  >
                                    {" "}
                                    Card transaction history{" "}
                                  </span>
                                </li>
                              </Link>
                            </mat-tree-node>
                            {/**/}
                          </ul>
                        </div>
                      </Collapse>
                    </li>
                  </mat-nested-tree-node>
                  <mat-tree-node
                    _ngcontent-wkl-c177=""
                    mattreenodetoggle=""
                    className="mat-tree-node cdk-tree-node ng-tns-c177-2 ng-star-inserted"
                    role="treeitem"
                    aria-level={1}
                    aria-expanded="false"
                  >
                    <a
                      _ngcontent-wkl-c177=""
                      routerlinkactive="active"
                      className="ng-tns-c177-2 dashboad-active"
                      id="MNU_GCME_780000"
                      href="/information-account/i-loan"
                    >
                      <li
                        _ngcontent-wkl-c177=""
                        className="mat-tree-node ng-tns-c177-2"
                      >
                        <img
                          _ngcontent-wkl-c177=""
                          className="ng-tns-c177-2 ng-star-inserted"
                          src="https://online.mbbank.com.vn/assets/images/icon-menu/info_account.svg"
                        />
                        
                        <span
                          _ngcontent-wkl-c177=""
                          style={{
                            fontFamily: "AvertaStdCY !important",
                          }}
                          className="ng-tns-c177-2"
                        >
                         
                          Loan{" "}
                        </span>
                      </li>
                    </a>
                  </mat-tree-node>
                  <mat-nested-tree-node
                    _ngcontent-wkl-c177=""
                    className="mat-nested-tree-node cdk-nested-tree-node cdk-tree-node ng-tns-c177-2 ng-star-inserted"
                    role="treeitem"
                    aria-level={1}
                    onClick={() => toggleCollapse(4)}
                    aria-controls="untilities-colapse"
                    aria-expanded={openCollapse === 4}
                  >
                    <li _ngcontent-wkl-c177="" className="ng-tns-c177-2">
                      <div className="arrow-slide">
                        <div
                          _ngcontent-wkl-c177=""
                          mat-icon-button=""
                          mattreenodetoggle=""
                          className="mat-tree-node ng-tns-c177-2"
                          id="MNU_GCME_160000"
                          aria-label="menu.parent.utilities"
                        >
                          <img
                            _ngcontent-wkl-c177=""
                            className="ng-tns-c177-2 ng-star-inserted"
                            src="https://online.mbbank.com.vn/assets/images/icon-menu/util.svg"
                          />
                          {/**/}
                          <span
                            _ngcontent-wkl-c177=""
                            className="float-left ng-tns-c177-2"
                            style={{
                              fontFamily: "AvertaStdCY !important",
                            }}
                          >
                            {" "}
                            Utilities{" "}
                          </span>
                        </div>
                        <span
                          _ngcontent-wkl-c177=""
                          role="img"
                          className="icon-slide"
                          aria-hidden="true"
                          data-mat-icon-type="font"
                          style={{ transform: "rotate(0deg)" }}
                        >
                          {openCollapse === 4 ? (
                            <FaChevronDown />
                          ) : (
                            <FaChevronRight />
                          )}
                        </span>
                      </div>
                      <Collapse in={openCollapse === 4}>
                        <div id="untilities-colapse">
                          <ul
                            _ngcontent-wkl-c177=""
                            className="ng-tns-c177-2 mat-tree-invisible ng-trigger ng-trigger-sidebarAnimation"
                          >
                            <mat-tree-node
                              _ngcontent-wkl-c177=""
                              mattreenodetoggle=""
                              className="mat-tree-node cdk-tree-node ng-tns-c177-2 ng-star-inserted"
                              role="treeitem"
                              aria-level={2}
                              aria-expanded="false"
                              style={{}}
                            >
                              <a
                                _ngcontent-wkl-c177=""
                                routerlinkactive="active"
                                className="ng-tns-c177-2"
                                id="MNU_GCME_160500"
                                 href="/auth/forgot-password"
                              >
                                <li
                                  _ngcontent-wkl-c177=""
                                  className="mat-tree-node ng-tns-c177-2"
                                >
                                  {/**/}
                                  <span
                                    _ngcontent-wkl-c177=""
                                    style={{
                                      fontFamily: "AvertaStdCY !important",
                                      paddingLeft: '3.3571428571rem'
                                    }}
                                    className="ng-tns-c177-2"
                                  >
                                    {" "}
                                    Change password{" "}
                                  </span>
                                </li>
                              </a>
                            </mat-tree-node>
                            
                            {/**/}
                          </ul>
                        </div>
                      </Collapse>
                    </li>
                  </mat-nested-tree-node>
                  {/**/}
                </mat-tree>
              </div>
              <div
                _ngcontent-wkl-c177=""
                className="botton-sidebar ng-tns-c177-2 ng-star-inserted"
              >
                <div
                  _ngcontent-wkl-c177=""
                  className="deposit-img ng-tns-c177-2"
                >
                  <img
                    _ngcontent-wkl-c177=""
                    src="https://online.mbbank.com.vn/assets/images/gift-pana.svg"
                    className="img-sidebar ng-tns-c177-2"
                  />
                </div>
                <div
                  _ngcontent-wkl-c177=""
                  className="deposit-content-1 ng-tns-c177-2"
                >
                  <span _ngcontent-wkl-c177="" className="ng-tns-c177-2">
                  FAQ and support please click {" "}
                    <a
                      _ngcontent-wkl-c177=""
                      href="/faq"
                      className="a-css ng-tns-c177-2"
                    >
                      here
                    </a>
                  </span>
                </div>
                <div
                  _ngcontent-wkl-c177=""
                  className="deposit-content-2 ng-tns-c177-2"
                >
                  <span _ngcontent-wkl-c177="" className="ng-tns-c177-2">
                    Hotline: 1900 545426
                  </span>
                </div>
              </div>
              {/**/}
            </div>
            {/**/}
            <div className="ps__rail-x" style={{ left: 0, bottom: 0 }}>
              <div
                className="ps__thumb-x"
                tabIndex={0}
                style={{ left: 0, width: 0 }}
              />
            </div>
            <div
              className="ps__rail-y"
              style={{ top: 0, height: 604, right: 8 }}
            >
              <div
                className="ps__thumb-y"
                tabIndex={0}
                style={{ top: 0, height: 505 }}
              />
            </div>
          </div>
        </perfect-scrollbar>
        <div
          _ngcontent-wkl-c177=""
          className="ps-mbb-vb ng-tns-c177-2"
          style={{ maxWidth: "100%", maxHeight: "100%" }}
        >
           <div style={{ position: "static" }} className="ps ps--active-y">
           <div className="ps-content">
           <div className="sidebar-2">
      
      <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['1']}
        mode="inline"
        theme="light"
        inlineCollapsed={<MenuFoldOutlined />}
        items={items}
      />
  </div>
           </div>
           </div>

       
        </div>
      </div>
    </>
  );
};
export default SlideLeft;