import logo from './logo.svg';
import './App.css';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Home from './components/page/Home';
import Login from './components/page/auth/Login';
import { UserProvider } from './context/context';
import { useEffect, useReducer, useState } from 'react';
import reducer from './context/reducer';
import STATE from './context/initState';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Header from './components/common/Header';
import SlideLeft from './components/common/Slide-left';

import Loader from './components/common/Loader';
import ListCard from './components/page/account_infomation/List-card';
import SourceAccount from './components/page/SourceAccount';
import DigitalDeposit from './components/page/account_infomation/Digital-deposit';
import Loan from './components/page/account_infomation/Loan';
import Register from './components/page/auth/Register';
import TransfersMoney from './components/page/transfers/TransfersMoney';
import BeneficiaryList from './components/page/transfers/BeneficiaryList';
import TransferMoneyByBatch from './components/page/transfers/Transfer-money-by-batch';
import ListCardService from './components/page/card_service/List-card';
import CardTransactionHistory from './components/page/card_service/Card-transaction-history';
import ForgotPassword from './components/page/auth/Forgot-password';
import ResetPassword from './components/page/auth/Reset-password';
import Cheque from './components/page/Cheque';
import errorT from './components/page/error/ErrorT';
import Faq from './components/page/support/faq';
import Chat from './components/page/Chat';
import SavingsAccount from './components/deposit/SavingsAccount';
import SavingList from './components/deposit/SavingList';


function App() {
  const location = useLocation();
  //const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); 
  const data = localStorage.getItem('state')? JSON.parse(localStorage.getItem('state')): STATE;

  const [state,dispatch] = useReducer(reducer,data);

  useEffect(() => {
    localStorage.setItem('state', JSON.stringify(state));

    //clear state from local storage after 1 day
    const timeoutId = setTimeout(() => {
      localStorage.removeItem('state');
      localStorage.removeItem('jwt');
    }, 24 * 60 * 60 * 1000); // 24 h
    return () => clearTimeout(timeoutId);
  }, [state]);

  const warnMessage = `
%cWarning! 🚨
%cYou are now opening Developer Tools.

Changing or running code in here could:
- Cause data loss.
- Reveal personal information.
- Lead to account hijacking.

Please only proceed if you are a developer and understand the risks!
  `;

  const stylesTitle = 'color: red; font-size: 20px; font-weight: bold;';
  const stylesBody = 'color: white; font-size: 14px;';
  
 
   
      console.log(warnMessage, stylesTitle, stylesBody);



// Sử dụng detectDevTools trong useEffect


  // useEffect(() => {
  //   const handleStart = () => setLoading(true); 
  //   const handleComplete = () => setLoading(false);  

  //   handleStart(); 
  //   setTimeout(() => {
  //     handleComplete();
  //   }, 700);
  //   return () => {
  //     handleComplete(); 
  //   };
  // }, [location]);


  // useEffect(() => {
    
  //   if (data.jwt === "") {
  //     navigate('/auth/log-in'); 
  //   }
  // }, [navigate]);

  const hideHeaderAndChatPaths = ['/auth/log-in', '/auth/register', '/auth/forgot-password', '/api/auth/reset-password'];

  const shouldHideHeaderAndChat = hideHeaderAndChatPaths.includes(location.pathname);

  return (
    <UserProvider value={{state,dispatch}}>
        
        {!shouldHideHeaderAndChat && <Header />}
        {!shouldHideHeaderAndChat && <Chat />}
       
        
        <HelmetProvider>
      <Routes>
        <Route path='auth/log-in' element={
          <>
                <Helmet>
                  <title>Login - OB online banking</title>
                </Helmet>
                <Login />
              </>
            }/>
         <Route path='auth/register' element={
           <>
                <Helmet>
                  <title>Register - OB online banking</title>
                </Helmet>
                <Register />
              </>
            }/>  
           <Route path='auth/forgot-password' element={
          <>
                <Helmet>
                  <title>Forgot password - OB online banking</title>
                </Helmet>
                <ForgotPassword />
              </>
            }/>  
            <Route path='api/auth/reset-password' element={
          <>
                <Helmet>
                  <title>Reset password - OB online banking</title>
                </Helmet>
                <ResetPassword />
              </>
            }/>  
            
              <>
              
        <Route path='/' element={
          <>
          <Helmet>
            <title>Dashboard - OB online banking</title>
          </Helmet>
          <Home continent="home"/>
        </>
        } /> 
        <Route path='/cheque' element={
          <>
          <Helmet>
            <title>Cheque - OB online banking</title>
          </Helmet>
          <Cheque continent="cheque"/>
        </>
        } />
       
              <Route path='/information-account/source-account/:sourceAccount' element={
              <>
                <Helmet>
                  <title>Infomation Account - OB online banking</title>
                </Helmet>
                <SourceAccount />
              </>
            }/>
              <Route path='/information-account/list-card/:listCard' element={
              <>
                <Helmet>
                  <title>List Card - OB online banking</title>
                </Helmet>
                <ListCard />
              </>
            }/>
            <Route path='/information-account/digital-deposit/:digitalDeposit' element={
              <>
                <Helmet>
                  <title>Digital Deposit - OB online banking</title>
                </Helmet>
                <DigitalDeposit />
              </>
            }/>
            <Route path='/information-account/loan/:loan' element={
              <>
                <Helmet>
                  <title>Loan - OB online banking</title>
                </Helmet>
                <Loan />
              </>
            }/>
          
            <Route path='/transfer/transfers-money/:transfersMoney' element={
              <>
                <Helmet>
                  <title>Transfers Money - OB online banking</title>
                </Helmet>
                <TransfersMoney />
              </>
            }/> 
            <Route path='/transfer/beneficiary-list/:beneficiaryList' element={
              <>
                <Helmet>
                  <title>Beneficiary List - OB online banking</title>
                </Helmet>
                <BeneficiaryList />
              </>
            }/>
             <Route path='/transfer/transfer-money-by-batch/:transferMoneyByBatch' element={
              <>
                <Helmet>
                  <title>Transfer Money By Batch - OB online banking</title>
                </Helmet>
                <TransferMoneyByBatch />
              </>
            }/>
            <Route path='/card-service/list-card/:listCardService' element={
              <>
                <Helmet>
                  <title>List Card - OB online banking</title>
                </Helmet>
                <ListCardService />
              </>
            }/>
            <Route path='/card-service/card-transaction-history/:cardTransactionHistory' element={
              <>
                <Helmet>
                  <title>Card transaction history - OB online banking</title>
                </Helmet>
                <CardTransactionHistory />
              </>
            }/>

            <Route path='/error/403' element={
              <>
                <Helmet>
                  <title>ERROR 403 - OB online banking</title>
                </Helmet>
                <errorT />
              </>
            }/>
             <Route path='/faq' element={
              <>
                <Helmet>
                  <title>FAQ - OB online banking</title>
                </Helmet>
                <Faq />
              </>
            }/>
            <Route path='/deposit/savings/:savings' element={
              <>
                <Helmet>
                  <title>Open Savings account - OB online banking</title>
                </Helmet>
                <SavingsAccount />
              </>
            }/>
            <Route path='/deposit/savingList/:savingList' element={
              <>
                <Helmet>
                  <title>Savings account - OB online banking</title>
                </Helmet>
                <SavingList />
              </>
            }/>
            
            </>
          
            
        
    </Routes>
    
      </HelmetProvider>
      
    </UserProvider>
    
  );
}

export default App;
