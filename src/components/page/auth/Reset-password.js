


import { Link, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios_instance from "../../../services/axios_instance";
import { login } from "../../../services/apiService";
import Context from "../../../context/context";
import { notification } from "antd";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { IoEyeSharp } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa";
import axios from "axios";





const ResetPassword = () => {
const [newPassword, setNewPassword] = useState('');
  const { state, dispatch } = useContext(Context);
  const navigate = useNavigate();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const location = useLocation();
  
  // get token from URL query
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');
 
 
  const handleInput = (e)=>{
    const { value } = e.target;
    setNewPassword(value);
  }

  const togglePassword = () => {
    setIsPasswordVisible(!isPasswordVisible);
};

  const handleResetPassword = async (e)=>{
    e.preventDefault();
    try {
        const response = await axios.post(
          'https://demoapihistory-hsgagzgtcse4daby.japaneast-01.azurewebsites.net/api/auth/change-password',
          { newPassword, token }
        );
        if (response.status === 200) {
          
          openNotification('success','Password change complete.');
          navigate('/auth/log-in'); 
        }
      } catch (error) {
        //console.error('Lỗi khi đặt lại mật khẩu:', error.response.data.message);
        openNotification('error',error.response.data.message);
      }
  }

  const openNotification = (type, message) => {
    notification[type]({
        message: type === 'error' ? 'Error' : 'Success',
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
                     
                    </div>
                    <div
                      _ngcontent-vnu-c204=""
                      className="content-login-2 ng-star-inserted"
                    >
                      Reset Password
                    </div>
                    <form
                      onSubmit={handleResetPassword}
                      _ngcontent-vnu-c204=""
                      noValidate=""
                      autoComplete="off"
                      id="form1"
                      className="ng-untouched ng-pristine ng-invalid ng-star-inserted"
                    >
                      <div _ngcontent-vnu-c204="" className="info-login">
                      
                        <div _ngcontent-vnu-c204="" className="content-login-3">
                          New password
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
                              <div style={{position: "relative",}}>

                              <input
                                _ngcontent-vnu-c202=""
                                formcontrolname="controlName"
                                className="input_cs name-comp ng-untouched ng-pristine ng-invalid"
                                type={isPasswordVisible ? "text" : "password"}
                                placeholder="Enter your new password"
                                value={newPassword}
                                onChange={handleInput}
                                id="newPassword"
                                name="newPassword"
                                autoComplete="off"
                                maxLength={30}
                                style={{position: "relative"}}
                              />


                             
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
                                  cursor: "pointer"
                                }}
                              >
                                {isPasswordVisible ? <IoEyeSharp fontSize={25}/> : <FaRegEyeSlash fontSize={25}/>}
                              </span>
                              </div>
                            
                            </div>
                           
                          </mbb-input>
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
                                Send {/**/}
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
                        }} to="/auth/log-in">Login</Link>
                        <Link style={{
                          marginTop: "10px",
                          display: "inline-block"
                        }} to="/auth/register">Create a account</Link>
                       
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
        {/**/}
      </div>
    </>
  );
};
export default ResetPassword;
