import React, { useState } from "react";
import validator from 'validator';
import Button from '@mui/material/Button';
import {useNavigate,useLocation} from "react-router-dom";
import { Amplify, Auth } from 'aws-amplify'

function SecondPage() {
    const [emailError, setEmailError] = useState('')
     const [code,setCode]= useState('')

    let navigate = useNavigate();
    let location=useLocation();
    let userName=location.state.emailId;
    const validateEmail = (e) => {
      var email = e.target.value
      setCode(email);
    
      // if (validator.isEmail(email)) {
      //   setEmailError('')
      // } else {
      //   setEmailError('Enter valid Email!')
      // }
    }
    const onConfirmPressed=async(data)=>{
      try{
         await Auth.confirmSignUp(userName,code) ;  
         const response=await Auth.signIn(userName,'welcome123')        
         navigate("/finalpage")
      }catch(e){
        alert(e.message)
      }
    }
  
    return (
      <div style={{
        margin: 'auto',     
        display:'flex',
        width:"100%",
        height:'600px',   
        backgroundColor:'lightGrey',
        justifyContent:"center",
        alignItems: 'center',
      }}>
        <div style={{width:'400px',height:'170px',borderWidth:'1px',
        borderColor:'black',
        borderStyle:"solid",
        justifyContent:"center",      
        alignItems:"center",
        alignContent:"center"}}>
          {/* <h2 style={{marginLeft:'30px'}}>Description of the application</h2> */}
          <div style={{marginLeft:'60px',marginTop:'20px'}}>Enter OTP: <input type="text"  onChange={(e) => validateEmail(e)}></input></div> <br />
          <span style={{
            fontWeight: 'bold',
            color: 'red',
          }}>{emailError}</span>
          <div style={{marginTop:"10px",marginLeft:"150px"}}>
            <Button size="small" variant="contained" onClick={()=>onConfirmPressed()}>Verify OTP</Button>
            </div>
        </div>
       
      </div>
    );
  }
  
  
  export default SecondPage;
  