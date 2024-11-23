import { useParams } from "react-router-dom";
import SlideLeft from "../../common/Slide-left";
import { IoIosArrowDown } from "react-icons/io";

const ListCard = () => {
    const {listCard} = useParams();
    const target = 0;
    return (
        <>
         <main>
            <div className="row main-container">
            <div className="col-2 slide-left">

              <SlideLeft target={target} listCard={listCard} />
            </div>
                <div className="col-10 slide-right">
                    <div cdkscrollable="" className="scroll-content">
                    <div className="container-fluid h-100">
  <div className="row h-100">
    <div className="col-12 pd-6 pdr-4 h-100">
      <router-outlet />
      <mbb-information-account _nghost-dig-c209="" className="ng-star-inserted">
        <router-outlet _ngcontent-dig-c209="" />
        <mbb-card-base _nghost-dig-c211="" className="ng-star-inserted">
          <router-outlet _ngcontent-dig-c211="" />
          <mbb-i-card _nghost-dig-c213="" className="ng-star-inserted">
            <div _ngcontent-dig-c213="" className="mbb-container">
              <div _ngcontent-dig-c213="" className="my-card">
                <div _ngcontent-dig-c213="" className="edit-pd">
                  <span _ngcontent-dig-c213="" className="lbl-begin">
                    My card (3)
                  </span>
                  
                </div>
                <div _ngcontent-dig-c213="" className="my-card-main">
                  <div _ngcontent-dig-c213="" className="row ng-star-inserted">
                    <div _ngcontent-dig-c213="" className="col-6">
                      <mbb-card
                        _ngcontent-dig-c213=""
                        _nghost-dig-c212=""
                        className="ng-tns-c212-57 ng-star-inserted"
                      >
                        <div
                          _ngcontent-dig-c212=""
                          className="panel panel-default ng-tns-c212-57"
                        >
                          <div
                            _ngcontent-dig-c212=""
                            className="panel-body ng-tns-c212-57"
                          >
                            <span
                              _ngcontent-dig-c212=""
                              className="label ng-tns-c212-57"
                            >
                              ACTIVE PLUS
                            </span>
                            <div
                              _ngcontent-dig-c212=""
                              className="my-card-body ng-tns-c212-57"
                            >
                              <div
                                _ngcontent-dig-c212=""
                                className="my-card-img ng-tns-c212-57"
                              >
                                <mbb-img
                                  _ngcontent-dig-c212=""
                                  customclass="img-fluid"
                                  className="ng-tns-c212-57"
                                  _nghost-dig-c187=""
                                >
                                  <img
                                    _ngcontent-dig-c187=""
                                    src="https://mobile.mbbank.com.vn/verpilot/rs/img/card/img_card/Active.png"
                                    alt="undefined"
                                    className="img-fluid ng-star-inserted"
                                  />
                                  {/**/}
                                  {/**/}
                                  {/**/}
                                </mbb-img>
                              </div>
                              <div
                                _ngcontent-dig-c212=""
                                className="my-card-info ng-tns-c212-57"
                              >
                                <div
                                  _ngcontent-dig-c212=""
                                  className="one-line ng-tns-c212-57"
                                >
                                  <div
                                    _ngcontent-dig-c212=""
                                    className="d-flex flex-column ng-tns-c212-57"
                                  >
                                    <span
                                      _ngcontent-dig-c212=""
                                      className="name_span_1 ng-tns-c212-57"
                                    >
                                      Account name
                                    </span>
                                    <span
                                      _ngcontent-dig-c212=""
                                      className="name_span_2 ng-tns-c212-57"
                                    >
                                      TRAN VAN LINH
                                    </span>
                                  </div>
                                  {/**/}
                                </div>
                                <div
                                  _ngcontent-dig-c212=""
                                  className="one-line ng-tns-c212-57"
                                >
                                  <div
                                    _ngcontent-dig-c212=""
                                    className="d-flex flex-column ng-tns-c212-57"
                                  >
                                    <span
                                      _ngcontent-dig-c212=""
                                      className="name_span_1 ng-tns-c212-57"
                                    >
                                      Card number
                                    </span>
                                    <span
                                      _ngcontent-dig-c212=""
                                      className="name_span_2 ng-tns-c212-57"
                                    >
                                      970422XXXXXX4278
                                    </span>
                                  </div>
                                  {/**/}
                                </div>
                                <div
                                  _ngcontent-dig-c212=""
                                  className="one-line block ng-tns-c212-57"
                                >
                                  <hr
                                    _ngcontent-dig-c212=""
                                    className="ng-tns-c212-57"
                                  />
                                </div>
                                <div
                                  _ngcontent-dig-c212=""
                                  className="one-line ng-tns-c212-57"
                                >
                                  <div
                                    _ngcontent-dig-c212=""
                                    className="d-flex flex-column ng-tns-c212-57"
                                  >
                                    <span
                                      _ngcontent-dig-c212=""
                                      className="name_span_1 ng-tns-c212-57"
                                    >
                                      Status
                                    </span>
                                    <span
                                      _ngcontent-dig-c212=""
                                      className="name_span_3 ng-tns-c212-57"
                                    >
                                      ACTIVE
                                    </span>
                                  </div>
                                  <button
                                    _ngcontent-dig-c212=""
                                    type="button"
                                    className="btn-unlock ng-tns-c212-57 ng-star-inserted"
                                  >
                                    {" "}
                                    CARD LOCK{" "}
                                  </button>
                                  {/**/}
                                </div>
                              </div>
                              {/**/}
                            </div>
                          </div>
                          <div
                            _ngcontent-dig-c212=""
                            className="line-block ng-tns-c212-57"
                          />
                          {/**/}
                          <div
                            _ngcontent-dig-c212=""
                            className="ng-tns-c212-57 ng-star-inserted"
                          >
                            <div
                              _ngcontent-dig-c212=""
                              className="text-center ng-tns-c212-57 ng-star-inserted"
                            >
                              <a
                                _ngcontent-dig-c212=""
                                className="ng-tns-c212-57"
                              >
                                {" "}
                                See more{" "}
                                <IoIosArrowDown />
                              </a>
                            </div>
                            {/**/}
                            {/**/}
                          </div>
                          {/**/}
                        </div>
                      </mbb-card>
                      {/**/}
                      {/**/}
                      {/**/}
                      {/**/}
                      {/**/}
                      <mbb-card
                        _ngcontent-dig-c213=""
                        _nghost-dig-c212=""
                        className="ng-tns-c212-58 ng-star-inserted"
                      >
                        <div
                          _ngcontent-dig-c212=""
                          className="panel panel-default ng-tns-c212-58"
                        >
                          <div
                            _ngcontent-dig-c212=""
                            className="panel-body ng-tns-c212-58"
                          >
                            <span
                              _ngcontent-dig-c212=""
                              className="label ng-tns-c212-58"
                            >
                              JCB_CREDIT
                            </span>
                            <div
                              _ngcontent-dig-c212=""
                              className="my-card-body ng-tns-c212-58"
                            >
                              <div
                                _ngcontent-dig-c212=""
                                className="my-card-img ng-tns-c212-58"
                              >
                                <mbb-img
                                  _ngcontent-dig-c212=""
                                  customclass="img-fluid"
                                  className="ng-tns-c212-58"
                                  _nghost-dig-c187=""
                                >
                                  <img
                                    _ngcontent-dig-c187=""
                                    src="https://mobile.mbbank.com.vn/verpilot/rs/img/card/img_card/MB_JCB_Gold_Credit.png"
                                    alt="undefined"
                                    className="img-fluid ng-star-inserted"
                                  />
                                  {/**/}
                                  {/**/}
                                  {/**/}
                                </mbb-img>
                              </div>
                              <div
                                _ngcontent-dig-c212=""
                                className="my-card-info ng-tns-c212-58"
                              >
                                <div
                                  _ngcontent-dig-c212=""
                                  className="one-line ng-tns-c212-58"
                                >
                                  <div
                                    _ngcontent-dig-c212=""
                                    className="d-flex flex-column ng-tns-c212-58"
                                  >
                                    <span
                                      _ngcontent-dig-c212=""
                                      className="name_span_1 ng-tns-c212-58"
                                    >
                                      Account name
                                    </span>
                                    <span
                                      _ngcontent-dig-c212=""
                                      className="name_span_2 ng-tns-c212-58"
                                    >
                                      TRAN VAN LINH
                                    </span>
                                  </div>
                                  <div
                                    _ngcontent-dig-c212=""
                                    className="d-flex flex-column ng-tns-c212-58 ng-star-inserted"
                                  >
                                    <span
                                      _ngcontent-dig-c212=""
                                      className="name_span_1 ng-tns-c212-58"
                                    >
                                      Credit card balance
                                    </span>
                                    <span
                                      _ngcontent-dig-c212=""
                                      className="name_span_2 ng-tns-c212-58"
                                    >
                                      0 VND
                                    </span>
                                  </div>
                                  {/**/}
                                  {/**/}
                                </div>
                                <div
                                  _ngcontent-dig-c212=""
                                  className="one-line ng-tns-c212-58"
                                >
                                  <div
                                    _ngcontent-dig-c212=""
                                    className="d-flex flex-column ng-tns-c212-58"
                                  >
                                    <span
                                      _ngcontent-dig-c212=""
                                      className="name_span_1 ng-tns-c212-58"
                                    >
                                      Card number
                                    </span>
                                    <span
                                      _ngcontent-dig-c212=""
                                      className="name_span_2 ng-tns-c212-58"
                                    >
                                      356419XXXXXX9184
                                    </span>
                                  </div>
                                  <div
                                    _ngcontent-dig-c212=""
                                    className="d-flex flex-column ng-tns-c212-58 ng-star-inserted"
                                  >
                                    <span
                                      _ngcontent-dig-c212=""
                                      className="name_span_1 ng-tns-c212-58"
                                    >
                                      Balance
                                    </span>
                                    <span
                                      _ngcontent-dig-c212=""
                                      className="name_span_2 ng-tns-c212-58 ng-star-inserted"
                                    >
                                      0 VND
                                    </span>
                                    {/**/}
                                    {/**/}
                                    {/**/}
                                  </div>
                                  {/**/}
                                  {/**/}
                                </div>
                                <div
                                  _ngcontent-dig-c212=""
                                  className="one-line block ng-tns-c212-58"
                                >
                                  <hr
                                    _ngcontent-dig-c212=""
                                    className="ng-tns-c212-58"
                                  />
                                </div>
                                <div
                                  _ngcontent-dig-c212=""
                                  className="one-line ng-tns-c212-58"
                                >
                                  <div
                                    _ngcontent-dig-c212=""
                                    className="d-flex flex-column ng-tns-c212-58"
                                  >
                                    <span
                                      _ngcontent-dig-c212=""
                                      className="name_span_1 ng-tns-c212-58"
                                    >
                                      Status
                                    </span>
                                    <span
                                      _ngcontent-dig-c212=""
                                      className="name_span_3 ng-tns-c212-58"
                                    >
                                      ACTIVE
                                    </span>
                                  </div>
                                  <button
                                    _ngcontent-dig-c212=""
                                    type="button"
                                    className="btn-unlock ng-tns-c212-58 ng-star-inserted"
                                  >
                                    {" "}
                                    CARD LOCK{" "}
                                  </button>
                                  {/**/}
                                </div>
                              </div>
                              {/**/}
                            </div>
                          </div>
                          <div
                            _ngcontent-dig-c212=""
                            className="line-block ng-tns-c212-58"
                          />
                          {/**/}
                          <div
                            _ngcontent-dig-c212=""
                            className="ng-tns-c212-58 ng-star-inserted"
                          >
                            <div
                              _ngcontent-dig-c212=""
                              className="text-center ng-tns-c212-58 ng-star-inserted"
                            >
                              <a
                                _ngcontent-dig-c212=""
                                className="ng-tns-c212-58"
                              >
                                {" "}
                                See more{" "}
                                <IoIosArrowDown />
                              </a>
                            </div>
                            {/**/}
                            {/**/}
                          </div>
                          {/**/}
                        </div>
                      </mbb-card>
                      {/**/}
                      {/**/}
                      {/**/}
                      {/**/}
                    </div>
                    <div _ngcontent-dig-c213="" className="col-6">
                      {/**/}
                      {/**/}
                      <mbb-card
                        _ngcontent-dig-c213=""
                        _nghost-dig-c212=""
                        className="ng-tns-c212-59 ng-star-inserted"
                      >
                        <div
                          _ngcontent-dig-c212=""
                          className="panel panel-default ng-tns-c212-59"
                        >
                          <div
                            _ngcontent-dig-c212=""
                            className="panel-body ng-tns-c212-59"
                          >
                            <span
                              _ngcontent-dig-c212=""
                              className="label ng-tns-c212-59"
                            >
                              VISA_DEBIT_NORMAL
                            </span>
                            <div
                              _ngcontent-dig-c212=""
                              className="my-card-body ng-tns-c212-59"
                            >
                              <div
                                _ngcontent-dig-c212=""
                                className="my-card-img ng-tns-c212-59"
                              >
                                <mbb-img
                                  _ngcontent-dig-c212=""
                                  customclass="img-fluid"
                                  className="ng-tns-c212-59"
                                  _nghost-dig-c187=""
                                >
                                  <img
                                    _ngcontent-dig-c187=""
                                    src="https://mobile.mbbank.com.vn/verpilot/rs/img/card/img_card/MB_Visa_Classic_Debit.png"
                                    alt="undefined"
                                    className="img-fluid ng-star-inserted"
                                  />
                                  {/**/}
                                  {/**/}
                                  {/**/}
                                </mbb-img>
                              </div>
                              <div
                                _ngcontent-dig-c212=""
                                className="my-card-info ng-tns-c212-59"
                              >
                                <div
                                  _ngcontent-dig-c212=""
                                  className="one-line ng-tns-c212-59"
                                >
                                  <div
                                    _ngcontent-dig-c212=""
                                    className="d-flex flex-column ng-tns-c212-59"
                                  >
                                    <span
                                      _ngcontent-dig-c212=""
                                      className="name_span_1 ng-tns-c212-59"
                                    >
                                      Account name
                                    </span>
                                    <span
                                      _ngcontent-dig-c212=""
                                      className="name_span_2 ng-tns-c212-59"
                                    >
                                      TRAN VAN LINH
                                    </span>
                                  </div>
                                  {/**/}
                                </div>
                                <div
                                  _ngcontent-dig-c212=""
                                  className="one-line ng-tns-c212-59"
                                >
                                  <div
                                    _ngcontent-dig-c212=""
                                    className="d-flex flex-column ng-tns-c212-59"
                                  >
                                    <span
                                      _ngcontent-dig-c212=""
                                      className="name_span_1 ng-tns-c212-59"
                                    >
                                      Card number
                                    </span>
                                    <span
                                      _ngcontent-dig-c212=""
                                      className="name_span_2 ng-tns-c212-59"
                                    >
                                      408904XXXXXX4638
                                    </span>
                                  </div>
                                  {/**/}
                                </div>
                                <div
                                  _ngcontent-dig-c212=""
                                  className="one-line block ng-tns-c212-59"
                                >
                                  <hr
                                    _ngcontent-dig-c212=""
                                    className="ng-tns-c212-59"
                                  />
                                </div>
                                <div
                                  _ngcontent-dig-c212=""
                                  className="one-line ng-tns-c212-59"
                                >
                                  <div
                                    _ngcontent-dig-c212=""
                                    className="d-flex flex-column ng-tns-c212-59"
                                  >
                                    <span
                                      _ngcontent-dig-c212=""
                                      className="name_span_1 ng-tns-c212-59"
                                    >
                                      Status
                                    </span>
                                    <span
                                      _ngcontent-dig-c212=""
                                      className="name_span_3 ng-tns-c212-59"
                                    >
                                      LOCKED
                                    </span>
                                  </div>
                                  <button
                                    _ngcontent-dig-c212=""
                                    type="button"
                                    className="btn-unlock ng-tns-c212-59 ng-star-inserted"
                                  >
                                    {" "}
                                    UNLOCK{" "}
                                  </button>
                                  {/**/}
                                </div>
                              </div>
                              {/**/}
                            </div>
                          </div>
                          <div
                            _ngcontent-dig-c212=""
                            className="line-block ng-tns-c212-59"
                          />
                          {/**/}
                          {/**/}
                        </div>
                      </mbb-card>
                      {/**/}
                      {/**/}
                      {/**/}
                      {/**/}
                      {/**/}
                      {/**/}
                    </div>
                  </div>
                  {/**/}
                  {/**/}
                  {/**/}
                </div>
              </div>
            </div>
          </mbb-i-card>
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
export default ListCard;