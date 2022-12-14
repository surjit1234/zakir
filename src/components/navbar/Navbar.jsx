import React, { useState } from 'react';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import logo from '../../logo.svg';
import './navbar.css';
import { saveAs } from "file-saver";
import { Amplify, Auth } from 'aws-amplify'

const Navbar = (props) => {
  const [toggleMenu, setToggleMenu] = useState(false);
  //const [enableDownload,setEnableDownload]=useState(false);

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
    <div className="gpt3__navbar">
      <div className="gpt3__navbar-links">
        {/* <div className="gpt3__navbar-links_logo">
          <img src={logo} />
        </div> */}
        <div className="gpt3__navbar-links_container">
          <p><a href="#home">Home</a></p>
          <p><a href="#wgpt3">What is BOLT?</a></p>         
          <p><a href="#features">Case Studies</a></p>
          <p><a href="#blog">Library</a></p>
        </div>
      </div>
      <div className="gpt3__navbar-sign">
        {/* <p>Sign in</p> */}
        <button type="button" disabled={props.enableDownload}  onClick={saveFile} className={!props.enableDownload?"enableButton":"disableButton"}>Download</button>
      </div>
      <div className="gpt3__navbar-menu">
        {toggleMenu
          ? <RiCloseLine color="#fff" size={27} onClick={() => setToggleMenu(false)} />
          : <RiMenu3Line color="#fff" size={27} onClick={() => setToggleMenu(true)} />}
        {toggleMenu && (
        <div className="gpt3__navbar-menu_container scale-up-center">
          <div className="gpt3__navbar-menu_container-links">
            <p><a href="#home">Home</a></p>
            <p><a href="#wgpt3">What is BOLT?</a></p>          
            <p><a href="#features">Case Studies</a></p>
            <p><a href="#blog">Library</a></p>
          </div>
          <div className="gpt3__navbar-menu_container-links-sign">
            {/* <p>Sign in</p> */}
            <button type="button">Sign in</button>
          </div>
        </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
