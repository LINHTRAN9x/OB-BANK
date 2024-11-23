import { useParams } from "react-router-dom";
import SlideLeft from "../../common/Slide-left";
import { IoSearch } from "react-icons/io5";

const TransferMoneyByBatch = () => {
    const target = 1;
    const {transferMoneyByBatch} = useParams();

    return (
        <>
            <main>
            <div className="row main-container">
            <div className="col-2 slide-left">

              <SlideLeft target={target} transferMoneyByBatch={transferMoneyByBatch}/>
            </div>
                <div className="col-10 slide-right transferMoneyByBatch-container">
                <div cdkscrollable="" className="scroll-content">
                <div className="container-fluid h-100">
  <div className="row h-100">
    <div className="col-12 pd-6 pdr-4 h-100">
      <router-outlet />
      <mbb-transfer-management
        _nghost-mda-c235=""
        className="ng-tns-c235-56 ng-star-inserted"
      >
        <div
          _ngcontent-mda-c235=""
          className="ng-tns-c235-56 ng-trigger ng-trigger-routeAnimations"
        >
          <router-outlet _ngcontent-mda-c235="" className="ng-tns-c235-56" />
          <mbb-tranfer-by-batch
            _nghost-mda-c227=""
            className="ng-star-inserted"
            style={{}}
          >
            <div _ngcontent-mda-c227="" className="mbb-container">
              <div _ngcontent-mda-c227="" className="tranfer-by-batch-header">
                <div _ngcontent-mda-c227="" className="edit-pd">
                  <span _ngcontent-mda-c227="" className="lbl-begin">
                    Transfer money by batch
                  </span>
                </div>
                <div
                  _ngcontent-mda-c227=""
                  className="col-sm-8 tranfer-search d-flex flex-row align-items-center"
                >
                  <div
                    _ngcontent-mda-c227=""
                    className="col-sm-4 btn-create-group"
                  >
                    <button
                      _ngcontent-mda-c227=""
                      className="w-100 btn btn-header btn-smm"
                      tabIndex={0}
                    >
                      {" "}
                      ADD TRANFER{" "}
                    </button>
                  </div>
                  <div
                    _ngcontent-mda-c227=""
                    className="tranfer-by-batch-search mat-elevation-z10 col-sm-8"
                  >
                    <IoSearch />
                    <input
                      _ngcontent-mda-c227=""
                      matinput=""
                      placeholder="Search"
                      spellCheck="false"
                      data-ms-editor="true"
                    />
                  </div>
                </div>
              </div>
              <div _ngcontent-mda-c227="" className="panel panel-default">
                <div _ngcontent-mda-c227="" className="panel-body">
                  <div _ngcontent-mda-c227="" className="table-container">
                    <div _ngcontent-mda-c227="" className="table-responsive-lg">
                      <table
                        _ngcontent-mda-c227=""
                        className="table table-striped"
                      >
                        <thead _ngcontent-mda-c227="">
                          <tr _ngcontent-mda-c227="">
                            <th
                              _ngcontent-mda-c227=""
                              scope="col"
                              style={{ width: 40 }}
                            >
                              {" "}
                              No{" "}
                            </th>
                            <th
                              _ngcontent-mda-c227=""
                              scope="col"
                              className="text-left"
                            >
                              {" "}
                              Day tranfer{" "}
                            </th>
                            <th
                              _ngcontent-mda-c227=""
                              scope="col"
                              className="text-left"
                            >
                              {" "}
                              Account number{" "}
                            </th>
                            <th
                              _ngcontent-mda-c227=""
                              scope="col"
                              className="text-left"
                            >
                              {" "}
                              Amount{" "}
                            </th>
                            <th
                              _ngcontent-mda-c227=""
                              scope="col"
                              className="text-left"
                            >
                              {" "}
                              Content tranfer{" "}
                            </th>
                            <th
                              _ngcontent-mda-c227=""
                              scope="col"
                              className="text-left"
                            >
                              {" "}
                              Status tranfer{" "}
                            </th>
                            <th
                              _ngcontent-mda-c227=""
                              scope="col"
                              className="text-left"
                            />
                          </tr>
                        </thead>
                        <tbody _ngcontent-mda-c227="">{/**/}</tbody>
                      </table>
                      <div
                        _ngcontent-mda-c227=""
                        className="no-tranfer ng-star-inserted"
                      >
                        <div
                          _ngcontent-mda-c227=""
                          className="no-tranfer-child"
                        >
                          <img
                            _ngcontent-mda-c227=""
                            src="/images/img-empty.png"
                          />
                          <span _ngcontent-mda-c227="" className="text">
                            {" "}
                            No record to display{" "}
                          </span>
                        </div>
                      </div>
                      {/**/}
                      {/**/}
                    </div>
                  </div>
                
                </div>
              </div>
            </div>
          </mbb-tranfer-by-batch>
          {/**/}
        </div>
      </mbb-transfer-management>
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
export default TransferMoneyByBatch;