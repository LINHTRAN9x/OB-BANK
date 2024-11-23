
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios_instance from "../../../services/axios_instance";
import { login } from "../../../services/apiService";
import Context from "../../../context/context";
import { Modal, notification, Spin } from "antd";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { IoEyeSharp } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa";
import { LoadingOutlined } from '@ant-design/icons';





const Login = () => {
  const [user,setUser] = useState({});
  const { state, dispatch } = useContext(Context);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const [captchaToken, setCaptchaToken] = useState(null);
  const [isLoangding, setIsLoangding] = useState(false);
  const [isWarningVisible, setIsWarningVisible] = useState(false); 
  const [isLoading, setIsLoading] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0);
  const [formValidation, setFormValidation] = useState({
    isValidPassword: false,
    isTypingPassword: false,
    isValidLoginName: false,
    isTypingLoginName: false,
});

  var hCapchaSiteKey = "d9882390-c34c-479a-a642-d4927c24350e";

  const handleInput = (e)=>{
    const { name, value } = e.target;
    setUser({...user,[name]:value});

    // look for typing in the input field
    
    if (name === 'password') {
      validatePassword(value);
  } else if (name === 'customerId') {
      validateLoginName(value);
  }
  }
 
  const togglePassword = () => {
    setIsPasswordVisible(!isPasswordVisible);
};
  
  const handleLogin = async (e) => {
    setIsLoangding(true);
    e.preventDefault();
    
    try {


      //validate the form

    if (!formValidation.isValidLoginName){
      openNotification("Login name must be at least 6 characters long!");
      return;
    }
    if (!formValidation.isValidPassword){
      openNotification("Password must be at least 6 characters long,uppercase letter and number!");
      return;
    }

    if (!captchaToken) {
      openNotification("Please complete the captcha");
      return;
  }
      
      localStorage.removeItem("state"); 
      localStorage.removeItem("jwt");

      await new Promise((resolve) => setTimeout(resolve, 3000));
 
      const data = await login(user);
 
      
    
     
      if (data && data.jwt) {
        dispatch({ type: 'LOGIN_SUCCESS', payload: { data, jwt: data.jwt, role: data.role } });

        if (data.role === "USER") {
            navigate('/');
            setIsLoangding(false);
        } else {
            setIsLoangding(false);
            setUser({ customerId: '', password: '' });
            openNotification("Login name or password not corrected!");
        }
    } else if (data && data.error) {
        
        handleLoginFailure(data.error.message || data.error);
        setUser({ customerId: '', password: '' });
        setIsLoangding(false);
    } else {
        setIsLoangding(false);
        setUser({ customerId: '', password: '' });
        handleLoginFailure("Login name or password not correct!");
    }
    } catch (error) {
      
      setUser({ customerId: '', password: '' });
      setIsLoangding(false);
      openNotification("An error occurred during login. Please try again.");
    }
  };

  const handleLoginFailure = (errorMessage) => {
    setAttemptCount((prevCount) => {
        const newCount = prevCount + 1;

        if (newCount === 1) {
            
            setIsWarningVisible(true);
        } 
        // else if (newCount >= 3) {
        //     openNotification("Your account has been locked due to multiple failed login attempts.");
        // } else {
        //     openNotification(
        //         `You have failed to log in ${newCount} times. Your account will be locked after 3 failed attempts.`
        //     );
        // }

        return newCount;
    });

    openNotification(errorMessage);
};


const validateLoginName = (name) => {
  const isValid = name.length >= 6; // length of name
  setFormValidation((prev) => ({
      ...prev,
      isValidLoginName: isValid,
      isTypingLoginName: true,
  }));
};

const validatePassword = (password) => {
    const hasUpperCase = /[A-Z]/.test(password); // Checks for at least one uppercase letter
    const hasNumber = /[0-9]/.test(password);    // Checks for at least one number
    const hasValidLength = password.length >= 6; // Checks if the password length is at least 6
  
    // If all conditions are met, the password is valid
    setFormValidation((prev) => ({
      ...prev,
      isValidPassword: hasUpperCase && hasNumber && hasValidLength,
      isTypingPassword: true,
  }));
  };

  useEffect(() => {

     
      localStorage.removeItem('state');
      localStorage.removeItem('jwt');
   
   },[]);


   //notification
const openNotification = (message) => {
  notification.error({
      message: 'Login Error',
      description: message,
  });
};
  
  return (
    <>
    
      <div _ngcontent-vnu-c164="" id="main-content">
        <router-outlet _ngcontent-vnu-c164="" />
        <mbb-welcome _nghost-vnu-c206="" className="ng-star-inserted">
          <div _ngcontent-vnu-c206="" className="img-background" />
          <div _ngcontent-vnu-c206="" className="body-welcome body_ibanking-mb">
            <mbb-login-header _ngcontent-vnu-c206="" _nghost-vnu-c205="">
              <div _ngcontent-vnu-c205="" className="nav-header">
                <div _ngcontent-vnu-c205="" className="d-flex">
                  <div _ngcontent-vnu-c205="" className="left h-100" />
                  <div _ngcontent-vnu-c205="" className="right">
                    <div _ngcontent-vnu-c205="" className="cf-wt" />
                    <div _ngcontent-vnu-c205="" className="header-content">
                      <div _ngcontent-vnu-c205="" className="phone">
                        <div _ngcontent-vnu-c205="" className="icn">
                          <a _ngcontent-vnu-c205="" href="tel:1900545426">
                            <img
                              _ngcontent-vnu-c205=""
                              src="https://online.mbbank.com.vn/assets/images/img-login/icons-login.svg"
                            />
                          </a>
                        </div>
                        <div
                          _ngcontent-vnu-c205=""
                          className="d-flex d-lg-block txt mrs-2 textcolor-1"
                        >
                          {" "}
                          Hotline:
                        </div>
                        <div _ngcontent-vnu-c205="" className="txt fw-bold">
                          <a
                            _ngcontent-vnu-c205=""
                            href="tel:1900545426"
                            className="fc-black textcolor-2"
                          >
                            {" "}
                            1900 545 426{" "}
                          </a>
                        </div>
                      </div>
                      <div _ngcontent-vnu-c205="" className="language">
                        <div
                          _ngcontent-vnu-c205=""
                          aria-haspopup="true"
                          id="dropdownMenuButton"
                          className="mat-menu-trigger ddown language-content"
                        >
                          <span _ngcontent-vnu-c205=""> EN </span>
                          <img
                            _ngcontent-vnu-c205=""
                            width="auto"
                            alt=""
                            src="/images/64px-Flag_of_the_United_Kingdom.png"
                          />
                        </div>
                        {/**/}
                        <mat-menu
                          _ngcontent-vnu-c205=""
                          matmenu=""
                          className="ng-star-inserted"
                        >
                          {/**/}
                        </mat-menu>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </mbb-login-header>
            <div
              _ngcontent-vnu-c206=""
              className="content d-flex align-items-center justify-content-center"
            >
              <div _ngcontent-vnu-c206="" className="welcome-box flex-sticky">
                <div
                  _ngcontent-vnu-c206=""
                  className="d-flex flex-content justify-content-center"
                >
                  <router-outlet _ngcontent-vnu-c206="" />
                  <mbb-login _nghost-vnu-c204="" className="ng-star-inserted">
                    <a
                      _ngcontent-vnu-c204=""
                      className="navbar-brand ng-star-inserted"
                      href="/"
                    >
                      <img
                        width={150}
                        _ngcontent-vnu-c204=""
                        src="/images/logo_mbbank_3.svg"
                        alt="logo"
                      />
                    </a>
                    <div
                      _ngcontent-vnu-c204=""
                      className="content-login-1 ng-star-inserted"
                    >
                      Welcome to
                    </div>
                    <div
                      _ngcontent-vnu-c204=""
                      className="content-login-2 ng-star-inserted"
                    >
                      OB Online Banking
                    </div>
                    <form
                      onSubmit={handleLogin}
                      _ngcontent-vnu-c204=""
                      noValidate=""
                      autoComplete="off"
                      id="form1"
                      className="ng-untouched ng-pristine ng-invalid ng-star-inserted"
                    >
                      <div _ngcontent-vnu-c204="" className="info-login">
                        <div _ngcontent-vnu-c204="" className="content-login-3">
                          Enter your login name
                        </div>
                        <div _ngcontent-vnu-c204="" className="row">
                          <mbb-input
                            _ngcontent-vnu-c204=""
                            tabIndex={1}
                            className="box-login col-lg-12 col-xl-12"
                            _nghost-vnu-c202=""
                          >
                            <div
                              _ngcontent-vnu-c202=""
                              className="box-input ng-untouched ng-pristine ng-invalid"
                            >
                              <div _ngcontent-vnu-c202="" className="name">
                                <div
                                  _ngcontent-vnu-c202=""
                                  className="txt"
                                ></div>
                              </div>
                              <input
                                _ngcontent-vnu-c202=""
                                formcontrolname="controlName"
                                className="input_cs name-comp ng-untouched ng-pristine ng-invalid"
                                type="text"
                                placeholder="Enter your login name"
                                value={user.customerId}
                                onChange={handleInput}
                                id="customerId"
                                name="customerId"
                                autoComplete="off"
                                maxLength={2000}
                                spellCheck="false"
                                data-ms-editor="true"
                              />
                              {/**/}
                              {/**/}
                              {/**/}
                              {/**/}
                              {/**/}
                            </div>
                            { formValidation.isTypingLoginName && !formValidation.isValidLoginName && (

                            <p style={{color: "red", fontSize: ".8em"}}>Login name must be at least 6 characters long!</p>
                            ) }
                          </mbb-input>
                        </div>
                        <div _ngcontent-vnu-c204="" className="content-login-3">
                          Enter password
                        </div>
                        <div _ngcontent-vnu-c204="" className="row">
                          <mbb-input
                            _ngcontent-vnu-c204=""
                            tabIndex={2}
                            mbbpasswordtoggle=""
                            className="box-login col-lg-12 col-xl-12"
                            _nghost-vnu-c202=""
                          >
                            <div
                              _ngcontent-vnu-c202=""
                              className="box-input ng-untouched ng-pristine ng-invalid"
                              style={{ position: "relative" }}
                            >
                              <div _ngcontent-vnu-c202="" className="name">
                                <div
                                  _ngcontent-vnu-c202=""
                                  className="txt"
                                ></div>
                              </div>
                              <input
                                _ngcontent-vnu-c202=""
                                formcontrolname="controlName"
                                className="input_cs name-comp ng-untouched ng-pristine ng-invalid"
                                type={isPasswordVisible ? "text" : "password"}
                                placeholder="Enter password"
                                value={user.password}
                                onChange={handleInput}
                                id="password"
                                name="password"
                                autoComplete="new-password"
                                maxLength={30}
                              />
                              {/**/}
                              {/**/}
                              {/**/}
                              {/**/}
                              {/**/}
                              <span
                                onClick={togglePassword}
                                _ngcontent-vnu-c202=""
                                id="password-mask-toggle"
                                style={{
                                  width: 50,
                                  height: 50,
                                  position: "absolute",
                                  top: 0,
                                  right: 0,
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                {isPasswordVisible ? <IoEyeSharp fontSize={25}/> : <FaRegEyeSlash fontSize={25}/>}
                              </span>
                            </div>
                            { formValidation.isTypingPassword && !formValidation.isValidPassword && (

                            <p style={{color: "red", fontSize: ".8em"}}>Password must be at least 6 characters long,uppercase letter and number!</p>
                            ) }
                          </mbb-input>
                        </div>
                        <div _ngcontent-vnu-c204="" className="row mt-2">
                        <HCaptcha
                            sitekey= {hCapchaSiteKey}
                            onVerify={(token) => setCaptchaToken(token)}
                            onExpire={() => setCaptchaToken(null)}
                            hl= "en"
                        />
                        </div>
                        <div _ngcontent-vnu-c204="" className="row">
                          <div _ngcontent-vnu-c204="" className="col-lg-12">
                            <button
                              type="submit"
                              _ngcontent-vnu-c204=""
                              id="login-btn"
                              mat-flat-button=""
                              className="mat-focus-indicator btn btnma btn-block mat-flat-button mat-button-base"
                            >
                              <span className="mat-button-wrapper">
                                {" "}
                                {isLoangding ? (
                                  <>
                                  <Spin indicator={<LoadingOutlined spin />} />
                                  </>
                                ) : ('Log in')}
                                 {/**/}
                              </span>
                              <span
                                matripple=""
                                className="mat-ripple mat-button-ripple"
                              />
                              <span className="mat-button-focus-overlay" />
                            </button>
                          </div>
                        </div>
                        <div className="d-flex justify-content-between">

                        <Link style={{
                          marginTop: "10px",
                          display: "inline-block"
                        }} to="/auth/register">Create a account</Link>
                        <Link style={{
                          marginTop: "10px",
                          display: "inline-block"
                        }} to="/auth/forgot-password">Forgot you account?</Link>
                        </div>
                      </div>
                    </form>
                    {/**/}
                    {/**/}
                    {/**/}
                  </mbb-login>
                  {/**/}
                </div>
              </div>
            </div>
            <div _ngcontent-vnu-c206="" className="page-footer rectangle">
              <div _ngcontent-vnu-c206="" className="lablecenter">
                <a _ngcontent-vnu-c206="" className="a-1">
                  {" "}
                  Connect with us
                </a>
                <label _ngcontent-vnu-c206="" className="label-gach">
                  |
                </label>
                <a _ngcontent-vnu-c206="" className="a-2">
                  {" "}
                  Terms and conditions
                </a>
                <label _ngcontent-vnu-c206="" className="label-gach">
                  |
                </label>
                <a _ngcontent-vnu-c206="" className="a-3">
                  {" "}
                  Safe security
                </a>
              </div>
            </div>
          </div>
        </mbb-welcome>
        {/* Modal warning */}
        <Modal
                title="Warning"
                visible={isWarningVisible}
                onOk={() => setIsWarningVisible(false)}
                onCancel={() => setIsWarningVisible(false)}
                okText="I Understand"
                
            >
                <p>
                    You have entered incorrect login information. If you fail to log in 3 times, your account will be
                    locked.
                </p>
            </Modal>
        {/**/}
      </div>
    </>
  );
};
export default Login;
