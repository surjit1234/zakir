import logo from './logo.svg';
import './App.css';
import React, { useState } from "react";
import validator from 'validator';
import Button from '@mui/material/Button';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import FirstPage from './FirstPage';
import SecondPage from './SecondPage';
import FinalPage from './FinalPage';
function App() {
  const [emailError, setEmailError] = useState('')
  const validateEmail = (e) => {
    var email = e.target.value
  
    if (validator.isEmail(email)) {
      setEmailError('')
    } else {
      setEmailError('Enter valid Email!')
    }
  }
  
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<FirstPage />} />
      <Route path="verifyopt" element={<SecondPage/>}/>  
      <Route path="finalpage" element={<FinalPage/>}/>      
    </Routes>
  </BrowserRouter>
  );
}


export default App;
