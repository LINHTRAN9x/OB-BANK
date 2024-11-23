import { useParams } from "react-router-dom";
import SlideLeft from "../../common/Slide-left";

const Loan = () => {
    const target = 0;
    const {loan} = useParams();
    return (
        <>
            <main>
            <div className="row main-container">
            <div className="col-2 slide-left">

              <SlideLeft target={target} loan={loan}/>
            </div>
                <div className="col-10 slide-right loan-container">
                <div cdkscrollable="" className="scroll-content">
                <div className="container-fluid h-100">
  <div className="row h-100">
    <div className="col-12 pd-6 pdr-4 h-100">
      <router-outlet />
      <mbb-information-account _nghost-mda-c209="" className="ng-star-inserted">
        <router-outlet _ngcontent-mda-c209="" />
        <mbb-i-loan _nghost-mda-c211="" className="ng-star-inserted">
          <router-outlet _ngcontent-mda-c211="" />
          <mbb-loan-list _nghost-mda-c215="" className="ng-star-inserted">
            <div
              _ngcontent-mda-c215=""
              className="mbb-container deposit-account"
            >
              <div _ngcontent-mda-c215="" className="block-info">
                <div _ngcontent-mda-c215="" className="row">
                  <div
                    _ngcontent-mda-c215=""
                    className="col-xl-3 col-md-6 col-sm-12 block-amount"
                  >
                    <div _ngcontent-mda-c215="" className="panel panel-default">
                      <div
                        _ngcontent-mda-c215=""
                        className="panel-body block-one"
                      >
                        <div _ngcontent-mda-c215="" className="total-balance">
                          <img
                            _ngcontent-mda-c215=""
                            alt=""
                            className="img-fluid"
                            src="/images/total.png"
                          />
                          <div _ngcontent-mda-c215="" className="block-info">
                            <span _ngcontent-mda-c215="" className="loan-sum">
                              TOTAL LOANS
                            </span>
                            <span
                              _ngcontent-mda-c215=""
                              className="loan-sum-amount"
                            >
                              <span _ngcontent-mda-c215="">0 </span>
                              <span _ngcontent-mda-c215="">VND</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/**/}
              <div _ngcontent-mda-c215="" className="my-card">
                <div _ngcontent-mda-c215="" className="edit-pd">
                  <span _ngcontent-mda-c215="" className="lbl-begin">
                    {" "}
                    Online loan list (0)
                  </span>
                </div>
                <div _ngcontent-mda-c215="" className="my-card-main">
                  <div _ngcontent-mda-c215="" className="row ng-star-inserted">
                    <div _ngcontent-mda-c215="" className="col-6">
                      {/**/}
                    </div>
                    <div _ngcontent-mda-c215="" className="col-6">
                      {/**/}
                    </div>
                  </div>
                  {/**/}
                  {/**/}
                  {/**/}
                </div>
              </div>
            </div>
          </mbb-loan-list>
          {/**/}
        </mbb-i-loan>
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
export default Loan;