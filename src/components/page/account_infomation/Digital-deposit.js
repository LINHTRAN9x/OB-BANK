import { useParams } from "react-router-dom";
import SlideLeft from "../../common/Slide-left";

const DigitalDeposit = () => {
    const target = 0;
    const {digitalDeposit} = useParams();

    return (
        <>
            <main>
            <div className="row main-container">
            <div className="col-2 slide-left">

              <SlideLeft target={target} digitalDeposit={digitalDeposit}/>
            </div>
                <div className="col-10 slide-right deposit-container">
                <div cdkscrollable="" className="scroll-content">
                <div className="container-fluid h-100">
  <div className="row h-100">
    <div className="col-12 pd-6 pdr-4 h-100">
      <router-outlet />
      <mbb-information-account _nghost-dig-c209="" className="ng-star-inserted">
        <router-outlet _ngcontent-dig-c209="" />
        <mbb-i-deposit-account _nghost-dig-c227="" className="ng-star-inserted">
          <router-outlet _ngcontent-dig-c227="" />
          <mbb-deposit-account _nghost-dig-c226="" className="ng-star-inserted">
            <div
              _ngcontent-dig-c226=""
              className="mbb-container deposit-account"
            >
              <div _ngcontent-dig-c226="" className="block-info">
                <div _ngcontent-dig-c226="" className="row">
                  <div
                    _ngcontent-dig-c226=""
                    className="col-xl-6 col-lg-12 block-amount"
                  >
                    <div
                      _ngcontent-dig-c226=""
                      className="panel panel-default img-block block-container"
                    >
                      <div
                        _ngcontent-dig-c226=""
                        className="panel-body block-one img-block"
                      >
                        <div _ngcontent-dig-c226="" className="total-balance">
                          <div _ngcontent-dig-c226="" className="block-info">
                            <span
                              _ngcontent-dig-c226=""
                              className="text-total-1"
                            >
                              TOTAL BALANCE{" "}
                              <img
                                _ngcontent-dig-c226=""
                                className="eyes"
                                src="https://online.mbbank.com.vn/assets/images/icons/eye-2.svg"
                              />
                            </span>
                            <span
                              _ngcontent-dig-c226=""
                              className="text-total-2"
                            >
                              0
                              <span
                                _ngcontent-dig-c226=""
                                className="text-total-3"
                              >
                                VND
                              </span>
                            </span>
                          </div>
                        </div>
                        <div
                          _ngcontent-dig-c226=""
                          className="monthly-interest"
                        >
                          <div
                            _ngcontent-dig-c226=""
                            className="block-info"
                            style={{
                              backgroundImage:
                                'url("/images/profit.png")'
                            }}
                          >
                            <span
                              _ngcontent-dig-c226=""
                              className="text-interest-1"
                            >
                              INTEREST ACCRUED AT THE END OF THE PERIOD
                            </span>
                            <br />
                            <span
                              _ngcontent-dig-c226=""
                              className="text-interest-2"
                              
                            >
                              0
                              <span
                                _ngcontent-dig-c226=""
                                className="text-interest-3"
                              >
                                VND
                              </span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    _ngcontent-dig-c226=""
                    className="col-xl-3 col-lg-12 block-saving"
                  >
                    <div
                      _ngcontent-dig-c226=""
                      className="panel panel-default img-block block-container"
                      style={{ cursor: "pointer" }}
                    >
                      <div
                        _ngcontent-dig-c226=""
                        className="panel-body d-flex flex-column justify-content-center align-items-center img-block"
                      >
                        <img
                          _ngcontent-dig-c226=""
                          alt=""
                          src="https://online.mbbank.com.vn/assets/images/icons/group-4.svg"
                        />
                        <span _ngcontent-dig-c226="" className="text-account">
                          Open digital deposit account
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/**/}
              {/**/}
            </div>
          </mbb-deposit-account>
          {/**/}
        </mbb-i-deposit-account>
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
export default DigitalDeposit;