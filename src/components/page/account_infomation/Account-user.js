import { Collapse, Menu, Tooltip } from 'antd';
import { DownOutlined,TransactionOutlined } from '@ant-design/icons';
import { FaMoneyBillTransfer } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const { Panel } = Collapse;

const AccountMenu = ({ userAccount }) => {
    



  return (
    <div
                    _ngcontent-dig-c210=""
                    className="full-account df-srcoll"
                  >
                    <div
                      _ngcontent-dig-c210=""
                      className="my-account ng-star-inserted"
                    >
                      {userAccount.map((item,key) => {
                        return (
                          <div
                          key={key}
                        _ngcontent-dig-c210=""
                        className="d-flex align-items-center tagcard mt-2"
                        style={{ 
                          borderBottom: item.isDefault ?  "10px solid rgb(247, 70, 74)" : "10px solid #83D6BA"
                        }}
                      >
                        
                        <div
                          _ngcontent-dig-c210=""
                          className="mr-1 number-account"
                        >
                          <span _ngcontent-dig-c210="">{item.accountNumber}</span>
                          <span _ngcontent-dig-c210="" className="balance">
                            {item.balance.toLocaleString('en-US')}{" "}
                            <sub _ngcontent-dig-c210="" className="my-currency">
                              USD
                            </sub>
                          </span>
                        </div>
                        <div className=''>

                        <Link to={`/transfer/transfers-money/${item.accountNumber}`} className='text-end d-flex align-items-end flex-column account-transfer'>
                                <Tooltip title="Transfer Funds">
                                    <FaMoneyBillTransfer fontSize={"1.2em"} />
                                </Tooltip> 
                        </Link>
                        </div>
                        <div className="default-acccount" style={{
                          backgroundColor: item.isDefault ? "#F7464A" : "#83D6BA",
                          display: "inline-block",
                          width: "inline-block",
                          padding: "1px 10px",
                          position: "absolute",
                          bottom: "-9px",
                          left: "-5px",
                          borderRadius: "0px 10px 0px 0px",
                          fontFamily: "monospace",
                          fontWeight: "600",
                          color: "#333"
                        }}>
                          {item.isDefault ? 'Default' : ''}
                        </div>
                       
                      </div>
                        )
                      })}
                      
                      
                      
                    </div>
                    {/**/}
                    {/**/}
                    {/**/}
                  </div>
  );
};

export default AccountMenu;
