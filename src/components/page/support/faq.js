import React, { useState } from 'react';
import { Radio, Space, Tabs } from 'antd';
import { Col, Divider, Row } from 'antd';
const Faq = () => {
  const [tabPosition, setTabPosition] = useState('left');
  
  const items = [
    {
      label: 'Which of my transactions require biometric authentication?',
      key: '1',
      children: (
        <div className="help-panel__tab-content-body">
        <p>
        From 01/07/2024 according to Decision 2345/NHNN of the State Bank, transactions exceeding the limit must be authenticated by facial biometrics when making transactions on OB Mobile or OB Online Banking, specifically:
        </p>
        <ul>
            <li>
            Transfer over 1 million USD/transaction, cumulative over 2 million USD/day;
            </li>
            <li>
            Payment transactions over 10 million USD/transaction or cumulative over 10 million USD/day;
            </li>
            <li>International transactions, or foreign exchange trading;</li>
            <li>
            First financial transaction on a new device, first login, or when changing the device where OB Mobile is installed;
            </li>
            <li>
            Batch transfer and payment transactions on eTax Mobile
            </li>
        </ul>
        </div>

      )
    },
    {
      label: 'What should I do if I lose my card?',
      key: '2',
      children: (
        <>
            <div className="help-panel__tab-content-body">
                <p style={{ fontWeight: 600, fontSize: "18.0px", lineHeight: "24.0px" }}>
                Instructions when losing card:
                </p>
                <p style={{ fontWeight: 600, fontSize: "18.0px", lineHeight: "24.0px" }}>
                    &nbsp;
                </p>
                <p>
                    <span style={{ color: "rgb(51,51,51)" }}>
                    When you lose your card, the first thing you should do is lock the card to ensure the safety of your account with the following methods:
                    </span>
                </p>
                <p>
                    <span style={{ color: "rgb(51,51,51)" }}>
                    <b>Method 1:&nbsp;</b>Temporarily lock card via OB Mobile
                    </span>
                </p>
                <ul>
                    <li>
                    <span style={{ color: "rgb(51,51,51)" }}>
                    Step 1: Log in to OB Mobile
                    </span>
                    </li>
                    <li>
                    <span style={{ color: "rgb(51,51,51)" }}>
                    Step 2: Select Account and Cards on the home page
                    </span>
                    </li>
                    <li>
                    <span style={{ color: "rgb(51,51,51)" }}>
                    Step 3: Select the Card to lock
                    </span>
                    </li>
                    <li>
                    <span style={{ color: "rgb(51,51,51)" }}>
                    Step 4: Select Lock card (Locked card will not be able to make online payment transactions, swipe card at POS and withdraw money at ATM)
                    </span>
                    </li>
                </ul>
                <p>
                    <span style={{ color: "rgb(51,51,51)" }}>
                    <b>Method 2:</b>&nbsp;Call the Personal Customer Service Center&nbsp;1900 545426 (free) to request a card lock.&nbsp;
                    </span>
                </p>
                </div>

        </>
      )
    },
    {
      label: 'What is the difference between 24/7 fast transfer service and interbank transfer?',
      key: '3',
      children: (
        <div className="help-panel__tab-content-body">
            <p style={{ fontWeight: 600, fontSize: "18.0px", lineHeight: "24.0px" }}>
            24/7 money transfer and interbank money transfer
            </p>
            <p style={{ fontWeight: 600, fontSize: "18.0px", lineHeight: "24.0px" }}>
                &nbsp;
            </p>
            <p>
                <span style={{ color: "rgb(51,51,51)" }}>
                When using the 24/7 fast transfer service, you will experience simple money transfer operations, shortening the time for receiving and transferring money outside of OB Bank. Money transfers can be made at any time, not depending on the Bank's transaction time. Currently, money transfer transactions on OB Mobile are defaulted to 24/7 transfers.
                </span>
            </p>
            <p>
                <span style={{ color: "rgb(51,51,51)" }}>
                Meanwhile, when transferring normally, you need to wait within 1 business day for the transaction to be completed successfully.
                </span>
            </p>
            </div>

      )
    },
    {
        label: 'I want to increase my transfer limit?',
        key: '4',
        children: (
            <div className="help-panel__tab-content-body">
            <p style={{ fontWeight: 600, fontSize: "18.0px", lineHeight: "24.0px" }}>
            How to increase transfer limit via OB Mobile
            </p>
            <p style={{ fontWeight: 600, fontSize: "18.0px", lineHeight: "24.0px" }}>
              &nbsp;
            </p>
            <p>
              <span style={{ color: "rgb(51,51,51)" }}>
              Your transfer limit is set to 500,000 USD/day on OB Mobile, applicable to 24/7 express transfers and interbank transfers.&nbsp;
              </span>
            </p>
            <p>
              <span style={{ color: "rgb(51,51,51)" }}>
              In case you want to transfer a larger amount but not exceeding 1 billion USD, you can log in to OB Mobile to change the limit. The new limit will be effective within 30 days, then it will return to the default limit of 500,000 USD/day.
              </span>
            </p>
          </div>
          
  
        )
      },
  ];
  return (
    <div style={{background: '#F5F6F8'}}>
    <main style={{background: '#F5F6F8'}}>
        <div className="row main-container" style={{background: '#F5F6F8'}}>

            <div className='' style={{padding: '0 70px'}}>
                <div style={{fontSize: '2.2em'}}>Most frequently asked questions</div>
                <Tabs
                className='mt-2 custom-tabs'
                    tabPosition={tabPosition}
                    items={items}
                />
            </div>
            <div className='' style={{padding: '0px 70px', marginBottom: '30px'}}>
            <div style={{fontSize: '2.2em'}}>FAQ by service</div>
            <Row
                gutter={[24, 16]}
                >
                <Col sm={{span: 24}} md={{span:12}} lg={{span: 8}}   className="gutter-row" span={8}>
                    <div className='faq-2'>
                    <div
                        className="ticket_wrapper leftType"
                       
                        >
                        <span className="ticket_icon leftType">
                            <picture>
                            <img
                                className="leftType__icon-img"
                                src="https://techcombank.com/content/dam/techcombank/public-site/com_img/icon-bao-hiem.svg"
                            />
                            </picture>
                        </span>
                        <div className="ticket-content">
                            <p className="ticket-title">Biometric authentication</p>
                            <div className="ticket-description" />
                        </div>
                        </div>

                    </div>
                </Col>
                <Col sm={{span: 24}} md={{span:12}} lg={{span: 8}} className="gutter-row" span={8}>
                    <div className='faq-2'>
                    <div
                        className="ticket_wrapper leftType"
                       
                        >
                        <span className="ticket_icon leftType">
                            <picture>
                            <img
                                className="leftType__icon-img"
                                src="https://techcombank.com/content/dam/techcombank/public-site/common/others/group-46718-2-4a3ee135c1.png.rendition/cq5dam.web.1280.1280.png"
                            />
                            </picture>
                        </span>
                        <div className="ticket-content">
                            <p className="ticket-title">OB Mobile</p>
                            <div className="ticket-description" />
                        </div>
                    </div>

                    
                    </div>
                </Col>
                <Col sm={{span: 24}} md={{span:12}} lg={{span: 8}} className="gutter-row" span={8}>
                    <div className='faq-2'>
                    <div
                        className="ticket_wrapper leftType"
                       
                        >
                        <span className="ticket_icon leftType">
                            <picture>
                            <img
                                className="leftType__icon-img"
                                src="https://techcombank.com/content/dam/techcombank/public-site/common/others/group-46750-325ce26e89.png.rendition/cq5dam.web.1280.1280.png"
                            />
                            </picture>
                        </span>
                        <div className="ticket-content">
                            <p className="ticket-title">Accounts and cheque</p>
                            <div className="ticket-description" />
                    </div>
                    </div>
                    </div>
                </Col>
                <Col sm={{span: 24}} md={{span:12}} lg={{span: 8}} className="gutter-row" span={8}>
                    <div className='faq-2'>
                    <div
                        className="ticket_wrapper leftType"
                       
                        >
                        <span className="ticket_icon leftType">
                            <picture>
                            <img
                                className="leftType__icon-img"
                                src="https://techcombank.com/content/dam/techcombank/public-site/common/others/icon-loi-ich-dac-quyen-1-a7c0e6b70e.svg"
                            />
                            </picture>
                        </span>
                        <div className="ticket-content">
                            <p className="ticket-title">Insurance</p>
                            <div className="ticket-description" />
                    </div>
                    </div>
                    </div>
                </Col>
                <Col sm={{span: 24}} md={{span:12}} lg={{span: 8}} className="gutter-row" span={8}>
                    <div className='faq-2'>
                    <div
                        className="ticket_wrapper leftType"
                       
                        >
                        <span className="ticket_icon leftType">
                            <picture>
                            <img
                                className="leftType__icon-img"
                                src="https://techcombank.com/content/dam/techcombank/public-site/common/others/icon-receipt-6fdbce87d5.svg"
                                height={51}
                            />
                            </picture>
                        </span>
                        <div className="ticket-content">
                            <p className="ticket-title">Invest</p>
                            <div className="ticket-description" />
                    </div>
                    </div>
                    </div>
                </Col>
                <Col sm={{span: 24}} md={{span:12}} lg={{span: 8}} className="gutter-row" span={8}>
                    <div className='faq-2'>
                    <div
                        className="ticket_wrapper leftType"
                       
                        >
                        <span className="ticket_icon leftType">
                            <picture>
                            <img
                                className="leftType__icon-img"
                                src="https://techcombank.com/content/dam/techcombank/public-site/common/others/icon-banca-shield-63c71bf94f.svg"
                            />
                            </picture>
                        </span>
                        <div className="ticket-content">
                            <p className="ticket-title">Save money</p> 
                            <div className="ticket-description" />
                    </div>
                    </div>
                    </div>
                </Col>
                </Row>
            </div>
        </div>
    </main>
    </div>
  );
};
export default Faq;