import React,{ useState} from 'react';

import { Footer, Blog, Possibility, Features, WhatGPT3, Header } from './containers';
import { CTA, Brand, Navbar } from './components';

import './App.css';

const App = () =>{
  const [enableDownload,setEnableDownload]=useState(true);

return (
  <div className="App">
    <div className="gradient__bg">
      <Navbar enableDownload={enableDownload}/>
      <Header setEnableDownload={setEnableDownload}/>
    </div>
    {/* <Brand /> */}
    <WhatGPT3 />
    {/* <Features />
    <Possibility />
    <CTA />
    <Blog /> */}
    <Footer />
  </div>
);
  }

export default App;
