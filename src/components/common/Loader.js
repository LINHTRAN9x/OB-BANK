import Header from "./Header";
import SlideLeft from "./Slide-left";

const Loader = () => {
    return (
        <>
        <main>
          <Header />
            <div className="row main-container">
            <div className="col-2 slide-left">

              <SlideLeft />
            </div>
                <div className="col-10 slide-right deposit-container">
                <div cdkscrollable="" className="scroll-content">
                <div className="splash-app-loading">
            <div className="logo">
            <img src="/images/logo_mbbank_3.svg" height="50" width="auto" />
            </div>
        <svg className="spinner" viewBox="25 25 50 50">
          <circle className="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"></circle>
        </svg>
      </div>
                </div>
             </div>
            </div>
            </main>  
        
        </>
    )
}
export default Loader;