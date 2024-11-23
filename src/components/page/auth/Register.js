import { Upload, Modal, Button, notification, Cascader, Input, Spin } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios_instance from "../../../services/axios_instance";
import { register } from "../../../services/apiService";
import Context from "../../../context/context";
import axios from 'axios';
import { IoEyeSharp, PiEyeSlashLight } from 'react-icons/io5';
import { FaRegEyeSlash } from 'react-icons/fa';
import rawAddressData from '../../../vietnamAddress.json';
import { LoadingOutlined } from '@ant-design/icons';

const Register = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [visible, setVisible] = useState(false);
  const [frontFileList, setFrontFileList] = useState([]);
  const [rearFileList, setRearFileList] = useState([]);
  const [isLoangding, setIsLoangding] = useState(false);

  const handleUploadChange = (info, setFileList) => {
    setFileList(info.fileList.slice(-1));
  };
  const togglePassword = () => {
    setIsPasswordVisible(!isPasswordVisible);
};

  const [user, setUser] = useState({});

  const [formValidation, setFormValidation] = useState({
    isValidPassword: false,
    isTypingPassword: false,
    isValidName: false,
    isTypingName: false,
    isValidEmail: false,
    isTypingEmail: false,
    isValidCitizenId: false,
    isTypingCitizenId: false,
    isValidAccountNumber: false,
    isTypingAccountNumber: false,
});



const { dispatch } = useContext(Context);
const navigate = useNavigate();


const handleInput = (e) => {
  if (Array.isArray(e)) {
   
    const address = getAddressName(e); 
   
    const detailedAddress = user.detailedAddress ? `, ${user.detailedAddress}` : ''; 
    const fullAddress = `${address}${detailedAddress}`; 
   
    setUser({ ...user, address: fullAddress });
  } else {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });

    // Xử lý validate cho từng trường hợp
    if (name === 'password') {
      validatePassword(value);
    } else if (name === 'name') {
      validateName(value);
    } else if (name === 'email') {
      validateEmail(value);
    } else if (name === 'citizenId') {
      validateCitizenId(value);
    } else if (name === 'accountNumber') {
      validateAccountNumber(value);
    }
  }
}

const validateName = (name) => {
  const isValid = name.length >= 6; // length of name
  setFormValidation((prev) => ({
      ...prev,
      isValidName: isValid,
      isTypingName: true,
  }));
};

const validatePassword = (password) => {
    const hasUpperCase = /[A-Z]/.test(password); // Checks for at least one uppercase letter
    const hasNumber = /[0-9]/.test(password);    // Checks for at least one number
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasValidLength = password.length >= 6; // Checks if the password length is at least 6
  
    // If all conditions are met, the password is valid
    setFormValidation((prev) => ({
      ...prev,
      isValidPassword: hasUpperCase && hasNumber && hasValidLength && hasSpecialChar,
      isTypingPassword: true,
  }));
  };
  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|hotmail\.com)$/;
    const isValidEmail = emailPattern.test(email);

    setFormValidation((prev) => ({
      ...prev,
      isValidEmail: isValidEmail,
      isTypingEmail: true,
  }));
  }
  const validateCitizenId = (citizenId) => {
    const isValidCitizenId = citizenId.length > 10 && citizenId.length < 20;

   
    setFormValidation((prev) => ({
        ...prev,
        isValidCitizenId: isValidCitizenId,  
        isTypingCitizenId: true, 
    }));
  }

  const validateAccountNumber = (accountNumber) => {
    const isValid = accountNumber.length > 10 && accountNumber.length < 14;

   
    setFormValidation((prev) => ({
        ...prev,
        isValidAccountNumber: isValid,  
        isTypingAccountNumber: true, 
    }));
  }
 
  //convert rawjson address
  const convertAddressData = (data) => {
    return data.map((city) => ({
      value: city.Id,
      label: city.Name,
      children: city.Districts.map((district) => ({
        value: district.Id,
        label: district.Name,
        children: district.Wards.map((ward) => ({
          value: ward.Id,
          label: ward.Name,
        })),
      })),
    }));
  };
  const addressData = convertAddressData(rawAddressData);

  //convert id to address name
  const getAddressName = (ids) => {
    const [cityId, districtId, wardId] = ids;

    
    const city = addressData.find((city) => city.value === cityId); 
    if (!city) return '';
  
    const district = city.children.find((district) => district.value === districtId); 
    if (!district) return '';
  
    const ward = district.children.find((ward) => ward.value === wardId); 
    if (!ward) return '';
  
    return `${ward.label}, ${district.label}, ${city.label}`; 
  };


const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('file', file); // `file` img upload

  try {
    const response = await axios.post(
      'https://demoapihistory-hsgagzgtcse4daby.japaneast-01.azurewebsites.net/api/Upload/upload-image',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
   
    return response.data; 
  } catch (error) {
    //console.error('Lỗi khi upload ảnh:', error);
    return null;
  }
};

//notification
const openNotification = (type, message) => {
  notification[type]({
      message: type === 'error' ? 'Error' : 'Success',
      description: message,
  });
};


const submitForm = async (e) => {
  setIsLoangding(true);
    e.preventDefault();

    //validate the form
    if (!formValidation.isValidName){
      openNotification("error","Full name must be at least 6 characters long!");
      return;
    }
    if (!formValidation.isValidPassword){
      openNotification("error","Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character!");
      return;
    }
    if (!formValidation.isValidEmail){
      openNotification("error","Email must be gmail, yahoo mail or hot mail!");
      return;
    }
    if (!formValidation.isValidCitizenId){
      openNotification("error","Citizen ID must be between 10 and 20 characters!");
      return;
    }
    if (!formValidation.isValidAccountNumber){
      openNotification("error","Account Number must be between 10 and 14 characters!");
      return;
    }

    if (!frontFileList[0] || !rearFileList[0]) {
      openNotification("error","Both front and rear Citizen ID images are required!");
      return;
    }

    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Upload image Citizen
  const CitizenIdFront = frontFileList[0] ? await uploadImage(frontFileList[0].originFileObj) : null;
  const CitizenIdRear = rearFileList[0] ? await uploadImage(rearFileList[0].originFileObj) : null;

  const userData = {
    ...user,
    CitizenIdFront: CitizenIdFront?.link,
    CitizenIdRear : CitizenIdRear?.link,
  };



   
    
  

    try {
      const data = await register(userData);

      if (data && data.success !== false) {
  
        setIsLoangding(false);
        openNotification("success","Registration successful. A confirmation email has been sent to your email address.")
        setTimeout(() => {
          window.location.href = "/auth/log-in"; 
        }, 3000);
      } else {
        setIsLoangding(false);
        openNotification("error",data.message ||"Registration failed! Please try again.");
      }
    } catch (error) {
      setIsLoangding(false);
      //console.error("Registration error:", error);
      openNotification("error","An error occurred during registration. Please check your information and try again.");
    } 
}

 useEffect(() => {
  localStorage.removeItem('state');
  localStorage.removeItem('jwt');
 },[]);

    return (
      <>
        <div _ngcontent-vnu-c164="" id="main-content" className="register-container">
          <router-outlet _ngcontent-vnu-c164="" />
          <mbb-welcome _nghost-vnu-c206="" className="ng-star-inserted">
            <div _ngcontent-vnu-c206="" className="img-background" />
            <div
              _ngcontent-vnu-c206=""
              className="body-welcome body_ibanking-mb"
            >
              <mbb-login-header _ngcontent-vnu-c206="" _nghost-vnu-c205="">
                <div _ngcontent-vnu-c205="" className="nav-header">
                  <div _ngcontent-vnu-c205="" className="d-flex">
                    <div _ngcontent-vnu-c205="" className="left h-100" />
                    <div _ngcontent-vnu-c205="" className="right">
                      <div _ngcontent-vnu-c205="" className="cf-wt" />
                      <div _ngcontent-vnu-c205="" className="header-content">
                        <div _ngcontent-vnu-c205="" className="phone">
                          <div _ngcontent-vnu-c205="" className="icn">
                           
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
                     
                      <div
                        _ngcontent-vnu-c204=""
                        className="content-login-1 ng-star-inserted"
                      ></div>
                      <div
                        _ngcontent-vnu-c204=""
                        className="content-login-2 ng-star-inserted"
                      >
                        {isLoangding ? (
                                  <>
                                  <Spin indicator={<LoadingOutlined spin />} />
                                  </>
                                ) : ('Register Account')}
                        
                      </div>
                      <form
                         onSubmit={submitForm}
                        _ngcontent-vnu-c204=""
                        noValidate=""
                        autoComplete="off"
                        id="form1"
                        className="ng-untouched ng-pristine ng-invalid ng-star-inserted"
                      >
                        <div _ngcontent-vnu-c204="" className="info-login">
                          <div _ngcontent-vnu-c204="" className="row">
                            <div className="col">
                              <div
                                _ngcontent-vnu-c204=""
                                className="content-login-3"
                              >
                                Full name
                              </div>
                              <mbb-input
                               
                                className="box-login col-lg-12 col-xl-12"
                              
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
                                   
                                    className="input_cs name-comp ng-untouched ng-pristine ng-invalid"
                                    type="text"
                                    placeholder="Enter your username"
                                    value={user.name}
                                    onChange={handleInput}
                                    name="name"
                                    autoComplete="off"
                                    maxLength={2000}
                                    
                                    
                                  />
                                  {/**/}
                                  {/**/}
                                  {/**/}
                                  {/**/}
                                  {/**/}
                                </div>
                                { formValidation.isTypingName && !formValidation.isValidName && (

                                <p style={{color: "red", fontSize: ".8em"}}>Full name must be at least 6 characters long!</p>
                                ) }
                              </mbb-input>
                            </div>
                            <div className="col">
                              <div
                                _ngcontent-vnu-c204=""
                                className="content-login-3"
                              >
                                Mobile number
                              </div>
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
                                    type="number"
                                    placeholder="Number"
                                    id="user-id"
                                    value={user.phone}
                                    name="phone"
                                    onChange={handleInput}
                                    autoComplete="off"
                                    maxLength={2000}
                                    
                                    
                                  />
                                  {/**/}
                                  {/**/}
                                  {/**/}
                                  {/**/}
                                  {/**/}
                                </div>
                              </mbb-input>
                            </div>
                          </div>
                          <div _ngcontent-vnu-c204="" className="row">
                          <div className="col">
                              <div
                                _ngcontent-vnu-c204=""
                                className="content-login-3"
                              >
                                Login Name
                              </div>
                              <mbb-input
                               
                               
                                className="box-login col-lg-12 col-xl-12"
                              
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
                                   id='customerId'
                                    name="customerId"
                                    value={user.customerId}
                                    onChange={handleInput}
                                    autoComplete="off"
                                    maxLength={2000}
                                    
                                    
                                  />
                                  {/**/}
                                  {/**/}
                                  {/**/}
                                  {/**/}
                                  {/**/}
                                </div>
                              </mbb-input>
                            </div>
                            
                            
                          </div>
                          <div className="row">
      <div className="content-login-3">Address</div>
      <div className="box-login col-lg-12 col-xl-12">
        <div className="box-input ng-untouched ng-pristine ng-invalid">
          <div className="name">
            <div className="txt"></div>
          </div>
          <Cascader
            options={addressData}
            placeholder="Select your address"
            onChange={handleInput}
            className="input_cs name-comp ng-untouched ng-pristine ng-invalid"
            value={user.address ? user.address.split(', ') : []} 
          />
          <Input
            name="detailedAddress"
            placeholder="Enter additional address details (e.g., house number, street name)"
            value={user.detailedAddress || ''}
            onChange={handleInput}
            className="input_cs name-comp"
            maxLength={200}
            style={{ marginTop: '10px' }} // Cách dòng một chút cho rõ ràng
          />
        </div>
      </div>
    </div>
                          <div _ngcontent-vnu-c204="" className="row">
                           
                            <div className="col">
                              <div
                               
                                className="content-login-3"
                              >
                                Email
                              </div>
                              <mbb-input
                               
                                className="box-login col-lg-12 col-xl-12"
                               
                              >
                                <div
                                  
                                  className="box-input ng-untouched ng-pristine ng-invalid"
                                >
                                  <div _ngcontent-vnu-c202="" className="name">
                                    <div
                                   
                                      className="txt"
                                    ></div>
                                  </div>
                                  <input
                                   
                                    
                                    className="input_cs name-comp ng-untouched ng-pristine ng-invalid"
                                    type="email"
                                    placeholder="Enter your email"
                                   
                                    name="email"
                                    value={user.email}
                                    onChange={handleInput}
                                    autoComplete="off"
                                    maxLength={2000}
                                    
                                    
                                  />

                                  {/**/}
                                  {/**/}
                                  {/**/}
                                  {/**/}
                                  {/**/}
                                </div>
                                { formValidation.isTypingEmail && !formValidation.isValidEmail && (

                                <p style={{color: "red", fontSize: ".8em"}}>Email must be gmail, yahoo mail or hot mail!</p>
                                ) }
                              </mbb-input>
                            </div>
                          </div>
                          <div _ngcontent-vnu-c204="" className="row">
                            <div className="col">
                              <div
                                _ngcontent-vnu-c204=""
                                className="content-login-3"
                              >
                                Account Number
                              </div>
                              <mbb-input
                             
                               
                                className="box-login col-lg-12 col-xl-12"
                           
                              >
                                <div
                              
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
                                  
                                    className="input_cs name-comp ng-untouched ng-pristine ng-invalid"
                                    type="number"
                                    placeholder="10 to 14 digits desired"
                                
                                    name="accountNumber"
                                    value={user.accountNumber}
                                    onChange={handleInput}
                                  
                                    maxLength={20}
                                  />
                                  {/**/}
                                  {/**/}
                                  {/**/}
                                  {/**/}
                                  {/**/}
                                  <div
                                    _ngcontent-vnu-c202=""
                                    id="password-mask-toggle"
                                    style={{
                                      width: 50,
                                      height: 50,
                                      position: "absolute",
                                      top: 10,
                                      right: 0,
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                    }}
                                  >
                                    <mat-icon
                                      _ngcontent-vnu-c202=""
                                      className="mbb-icon ic-eye fs-18"
                                      style={{
                                        cursor: "pointer",
                                        opacity: "0.5",
                                        marginRight: 0,
                                      }}
                                    />
                                  </div>
                                </div>
                                { formValidation.isTypingAccountNumber && !formValidation.isValidAccountNumber && (

                                <p style={{color: "red", fontSize: ".8em"}}>Account Number must be between 10 and 14 characters!</p>
                                ) }
                              </mbb-input>
                            </div>
                            
                          </div>
                          <div _ngcontent-vnu-c204="" className="row">
                            <div className="col">
                              <div
                                _ngcontent-vnu-c204=""
                                className="content-login-3"
                              >
                                Enter password
                              </div>
                              
                                   <mbb-input
                             
                               
                                   className="box-login col-lg-12 col-xl-12"
                              
                                 >
                                   <div
                                 
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
                                     
                                       className="input_cs name-comp ng-untouched ng-pristine ng-invalid"
                                       type={isPasswordVisible ? "text" : "password"}
                                       placeholder="Enter password"
                                   
                                       name="password"
                                       value={user.password}
                                       onChange={handleInput}
                                       
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
                                         cursor: "pointer",
                                       }}
                                     >
                                       {isPasswordVisible ? <IoEyeSharp fontSize={25}/> : <FaRegEyeSlash fontSize={25}/>}
                                     </span>
                                   </div>
                                   { formValidation.isTypingPassword && !formValidation.isValidPassword && (

                                   <p style={{color: "red", fontSize: ".8em"}}>Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character!</p>
                                   ) }
                                 </mbb-input>
                             
                             
                            </div>
                            
                          </div>
                          <div _ngcontent-vnu-c204="" className="row">
                          <div className="col">
                              <div
                                _ngcontent-vnu-c204=""
                                className="content-login-3"
                              >
                                Citizen Code
                              </div>
                              <mbb-input
                              
                            
                                className="box-login col-lg-12 col-xl-12"
                           
                              >
                                <div
                                
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
                                  
                                    className="input_cs name-comp ng-untouched ng-pristine ng-invalid"
                                    type="text"
                                    placeholder="Enter citizen identification"
                                    
                                    name="citizenId"
                                    value={user.citizenId}
                                    onChange={handleInput}
                                    autoComplete="new-password"
                                    maxLength={30}
                                  />
                                  {/**/}
                                  {/**/}
                                  {/**/}
                                  {/**/}
                                  {/**/}
                                  <div
                                    
                                    _ngcontent-vnu-c202=""
                                    id="password-mask-toggle"
                                    style={{
                                      width: 50,
                                      height: 50,
                                      position: "absolute",
                                      top: 10,
                                      right: 0,
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                    }}
                                  >
                                    
                                  </div>
                                </div>
                                { formValidation.isTypingCitizenId && !formValidation.isValidCitizenId && (

                                <p style={{color: "red", fontSize: ".8em"}}>Citizen ID must be between 10 and 20 characters!!</p>
                                ) }
                              </mbb-input>
                            </div>
                            <div className="col mt-5">
                              <Button onClick={() => setVisible(true)}>
                                Upload Citizen ID
                              </Button>

                              <Modal
                                title="Upload Citizen ID Image(.jpg and .png only)"
                                visible={visible}
                                onCancel={() => setVisible(false)}
                                footer={null}
                              >
                                <p>Upload Front Side:</p>
                                <Upload
                                  listType="picture-card"
                                  fileList={frontFileList}
                                  onChange={(info) =>
                                    handleUploadChange(info, setFrontFileList)
                                  }
                                  beforeUpload={() => false}
                                >
                                  {frontFileList.length < 1 && <PlusOutlined />}
                                </Upload>

                                <p>Upload Rear Side:</p>
                                <Upload
                                  listType="picture-card"
                                  fileList={rearFileList}
                                  onChange={(info) =>
                                    handleUploadChange(info, setRearFileList)
                                  }
                                  beforeUpload={() => false}
                                >
                                  {rearFileList.length < 1 && <PlusOutlined />}
                                </Upload>
                              </Modal>
                            </div>
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
                                  Create {/**/}
                                </span>
                                <span
                                  matripple=""
                                  className="mat-ripple mat-button-ripple"
                                />
                                <span className="mat-button-focus-overlay" />
                              </button>
                            </div>
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
}
export default Register;