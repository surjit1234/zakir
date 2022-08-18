import React, { useState,useEffect,useRef }  from 'react';
import people from '../../assets/people.png';
import ai from '../../assets/ai.png';
import './header.css';
import validator from 'validator';
import { Auth } from 'aws-amplify';

const Header = (props) => {
  const [emailError, setEmailError] = useState('')
  const [userEmail,setUserEmail]=useState('');
  const [code,setCode]= useState('');
  const [hideOpt,setHideOpt]=useState(true);
  const [counter,setCounter]=useState(60);
  const timerRef = useRef(counter);

  useEffect(() => {
    if(!hideOpt){
    const timerId = setInterval(() => {
      timerRef.current -= 1;
      if(timerRef.current===0){
        hideOpt(true)
      }
      if (timerRef.current < 0) {
        clearInterval(timerId);
      } else {       
        setCounter(timerRef.current);
      }
    }, 1000);
    return () => {
      clearInterval(timerId);
    };
   }
  }, [hideOpt]);

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
           setHideOpt(false)  
          // navigate("/verifyopt",{state:{emailId:userEmail}})
       }catch(e){          
         if(e.message.indexOf('already exists')>0){
           const res=await Auth.signIn(username,'welcome123')  
           await Auth.deleteUser();
           const response=await Auth.signUp({
             username,password})  
             setHideOpt(false)        
            // navigate("/verifyopt",{state:{emailId:userEmail}})
         }
         else{
           alert(e.message)
         }
         
       }
      // setLoading(false)
   }


   const onConfirmPressed=async(data)=>{
    try{
       await Auth.confirmSignUp(userEmail,code) ;  
       const response=await Auth.signIn(userEmail,'welcome123')  
       props.setEnableDownload(false)  
       setHideOpt(true)         
       //navigate("/finalpage")
    }catch(e){
      alert(e.message)
    }
  }

  const onChangeOpt = (e) => {
    var email = e.target.value
    setCode(email);  
  }

  return (
  <div className="gpt3__header section__padding" id="home">
    <div className="gpt3__header-content">
      <h1 className="gradient__text">Description we can write </h1>
      <p>Write anything </p>

      <div className="gpt3__header-content__input">
        <input type="email" readOnly={!hideOpt} placeholder="Your Email Address"  onChange={(e) => validateEmail(e)}/>
        <button type="button" disabled={!hideOpt} className={hideOpt?"enableButton":"disableButton"} onClick={()=>onRegisterPressed()}>Get Started</button>        
      </div>
      <span style={{
            fontWeight: 'bold',
            marginLeft:'100px',
            color: 'red',
          }}>{emailError}</span>
           {!hideOpt && 
         <div className='gpt3__header-content__div'> Resend OTP available in <span style={{color:'red',paddingLeft:'5px'}}>{counter}</span></div>
         }
          {!hideOpt && 
        <div className="gpt3__header-otp__input">
        <input type="email" placeholder="Enter OPT" onChange={(e) => onChangeOpt(e)}/>
        <button type="button" onClick={()=>onConfirmPressed()}>Verify</button>        
      </div>
}
      {/* <div className="gpt3__header-content__people">
        <img src={people} />
        <p>1,600 people requested access a visit in last 24 hours</p>
      </div> */}
    </div>

    <div className="gpt3__header-image">
      {/* <img src={ai} /> */}
    </div>
  </div>
);

    }

export default Header;
