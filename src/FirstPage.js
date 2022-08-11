import React, { useState } from "react";
import validator from 'validator';
import Button from '@mui/material/Button';
import {useNavigate} from "react-router-dom";
import { Auth } from 'aws-amplify';

function FirstPage() {
    const [emailError, setEmailError] = useState('')
    const [userEmail,setUserEmail]=useState('')
    let navigate = useNavigate();
    const validateEmail = (e) => {
      var email = e.target.value
    
      if (validator.isEmail(email)) {
        setEmailError('')
        setUserEmail(email)
      } else {
        setEmailError('Enter valid Email!')
      }
    }

    const onRegisterPressed=async(data)  =>{
     // const {username,password,email,name}=data
        const username=userEmail
       
        const password='welcome123'
        // if(loading){
        //   return
        // }  
        // setLoading(true)
        try{
  
          const response=await Auth.signUp({
            username,password})        
            navigate("/verifyopt",{state:{emailId:userEmail}})
        }catch(e){          
          if(e.message.indexOf('already exists')>0){
            const res=await Auth.signIn(username,'welcome123')  
            await Auth.deleteUser();
            const response=await Auth.signUp({
              username,password})        
              navigate("/verifyopt",{state:{emailId:userEmail}})
          }
          else{
            alert(e.message)
          }
          
        }
       // setLoading(false)
    }

    
    return (
      <div style={{
        margin: 'auto',     
        display:'flex',
        width:"100%",
        height:'600px',   
        backgroundColor:'#141416',
        justifyContent:"center",
        alignItems: 'center',
      }}>
        <div style={{width:'400px',height:'170px',
        // borderWidth:'1px',
        // borderColor:'black',
        // borderStyle:"solid",
        justifyContent:"center",
        marginLeft:"20px",
        alignItems:"center",
        alignContent:"center"}}>
          <h2 style={{marginLeft:'30px',color:"white"}}>Description of the application</h2>
          <span style={{marginLeft:'100px'}}></span><input type="text" id="userEmail" 
          placeholder="Enter Email Address"
          onChange={(e) => validateEmail(e)}></input> <br />
          <span style={{
            fontWeight: 'bold',
            marginLeft:'100px',
            color: 'red',
          }}>{emailError}</span>
          <div style={{marginTop:"20px",marginLeft:"150px"}}>
            <Button size="small" variant="contained"  color="success" onClick={()=>onRegisterPressed()}>Sign up</Button>
            </div>
        </div>
       
      </div>
    );
  }
  
  
  export default FirstPage;
  