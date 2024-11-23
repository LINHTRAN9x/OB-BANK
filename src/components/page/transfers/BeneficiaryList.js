import { useParams } from "react-router-dom";
import SlideLeft from "../../common/Slide-left";
import { IoSearch } from "react-icons/io5";

const BeneficiaryList = () => {

    const target = 1;
    const {beneficiaryList} = useParams();


    return (
        <>
            <main>
            <div className="row main-container">
            <div className="col-2 slide-left">

              <SlideLeft target={target} beneficiaryList={beneficiaryList}/>
            </div>
                <div className="col-10 slide-right beneficiary-container">
                <div cdkscrollable="" className="scroll-content">
                <div className="container-fluid h-100">
  <div className="row h-100">
    <div className="col-12 pd-6 pdr-4 h-100">
      <router-outlet />
      <mbb-transfer-management
        _nghost-mda-c235=""
        className="ng-tns-c235-44 ng-star-inserted"
      >
        <div
          _ngcontent-mda-c235=""
          className="ng-tns-c235-44 ng-trigger ng-trigger-routeAnimations"
        >
          <router-outlet _ngcontent-mda-c235="" className="ng-tns-c235-44" />
          <mbb-beneficiary-list
            _nghost-mda-c226=""
            className="ng-star-inserted"
            style={{}}
          >
            <div _ngcontent-mda-c226="" className="mbb-container">
              <div _ngcontent-mda-c226="" className="beneficiary-header">
                <div _ngcontent-mda-c226="" className="edit-pd">
                  <span _ngcontent-mda-c226="" className="lbl-begin">
                    Beneficiary List
                  </span>
                </div>
                <div
                  _ngcontent-mda-c226=""
                  className="beneficiary-search mat-elevation-z10"
                >
                  <IoSearch />
                  <input
                    _ngcontent-mda-c226=""
                    matinput=""
                    placeholder="search"
                    spellCheck="false"
                    data-ms-editor="true"
                  />
                </div>
              </div>
              <div _ngcontent-mda-c226="" className="panel panel-default">
                <div _ngcontent-mda-c226="" className="panel-body">
                  <div _ngcontent-mda-c226="" className="table-container">
                    <div _ngcontent-mda-c226="" className="table-responsive-lg">
                      <table
                        _ngcontent-mda-c226=""
                        className="table table-striped"
                      >
                        <thead _ngcontent-mda-c226="">
                          <tr _ngcontent-mda-c226="">
                            <th
                              _ngcontent-mda-c226=""
                              scope="col"
                              className="stt"
                              style={{ width: 40 }}
                            >
                              No
                            </th>
                            <th
                              _ngcontent-mda-c226=""
                              scope="col"
                              className="name-user text-left"
                              style={{ paddingLeft: 0 }}
                            >
                              {" "}
                              Account holder{" "}
                            </th>
                            <th
                              _ngcontent-mda-c226=""
                              scope="col"
                              className="text-left"
                              style={{ paddingLeft: 0 }}
                            >
                              {" "}
                              Account/card{" "}
                            </th>
                            <th
                              _ngcontent-mda-c226=""
                              scope="col"
                              className="text-left"
                              style={{ minWidth: 300, paddingLeft: 0 }}
                            >
                              {" "}
                              Bank name{" "}
                            </th>
                            <th
                              _ngcontent-mda-c226=""
                              scope="col"
                              className="name-product text-left"
                              style={{ paddingLeft: 0 }}
                            >
                              {" "}
                              Suggest name{" "}
                            </th>
                            <th
                              _ngcontent-mda-c226=""
                              scope="col"
                              className="action"
                            >
                              {" "}
                              Action{" "}
                            </th>
                          </tr>
                        </thead>
                        <tbody _ngcontent-mda-c226="">{/**/}</tbody>
                      </table>
                      <div
                        _ngcontent-mda-c226=""
                        className="no-beneficiary ng-star-inserted"
                        style={{}}
                      >
                        {" "}
                        No record to display{" "}
                      </div>
                      {/**/}
                      {/**/}
                    </div>
                  </div>
                 
                </div>
              </div>
            </div>
          </mbb-beneficiary-list>
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
export default BeneficiaryList;