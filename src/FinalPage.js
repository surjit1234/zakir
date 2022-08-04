import React, { useState } from "react";
import validator from 'validator';
import Button from '@mui/material/Button';
import { saveAs } from "file-saver";
import { Amplify, Auth } from 'aws-amplify'
function FinalPage() {
    const [emailError, setEmailError] = useState('')
    const validateEmail = (e) => {
      var email = e.target.value
    
      if (validator.isEmail(email)) {
        setEmailError('')
      } else {
        setEmailError('Enter valid Email!')
      }
    }
    const saveFile = async() => {
      try{
       const userData = await Auth.currentAuthenticatedUser();
       if(userData){
       saveAs(
        "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        "example.pdf"
         );
       }
       // navigate("/finalpage")
     }catch(e){
       alert(e.message)
     }
      
    };
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
        display:"flex",
        alignItems:"center",
        alignContent:"center"}}>
          {/* <h2 style={{marginLeft:'30px'}}>Description of the application</h2> */}
          {/* <div style={{marginLeft:'60px',marginTop:'20px'}}>Enter OTP: <input type="text"></input></div> <br />
          <span style={{
            fontWeight: 'bold',
            color: 'red',
          }}>{emailError}</span> */}
          <div>
            <Button size="small" variant="contained" color="success" onClick={saveFile}>Download</Button>
            </div>
        </div>
       
      </div>
    );
  }
  
  
  export default FinalPage;
  