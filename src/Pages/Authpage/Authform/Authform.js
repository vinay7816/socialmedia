import React, { useState } from 'react';
import logo from '../../../assets/logo.png'
import play from "../../../assets/playstore.png"
import microsoft from "../../../assets/microsoft.png"
import { useNavigate } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import GoogleAuth from './GoogleAuth';
const Authform = () => {
    const[mode,setmode]=useState('login');
   
    const navigate=useNavigate();
   
  return (
    <>
      <form className='form-control mx-3 text-center '>
              <img className='text-center  ' src={logo} alt=".." style={{height:"11vh"}}/>
           {mode==="login"?<Login/>:<Signup/>}
<div class="row align-items-center justify-content-center my-4">
    <div class="col col-lg-4" style={{border:"1px solid grey"}}>
    </div>
    <span className='col col-lg-2 px-2'><h6 className='text-center '>OR</h6></span>
    <div class="col col-lg-4" style={{border:"1px solid grey"}}>
    </div>
  </div>
  
        <GoogleAuth prefix={mode==="login"?"Log in":"Signup"}/>
    
      
    
  
</form>
<form className='form-control my-2 mx-3 py-2 px-0'>
  <div className='d-flex align-items-center justify-content-center'>
    <div>
    <p className='px-1 mb-0'>{mode==='login'?"Don't have an account?":"Already have an account?"}</p>
    </div>
    <div>
    <a href="#" className="btn btn-link" onClick= {(e)=>{setmode(mode==='login'?'signup':'login')}} style={{ textDecoration: "none" }}>
    {mode==='login'?"Sign up":"Login"}
        </a>
    </div>
    
  </div>
</form>
<div style={{marginLeft:"20px"}}>
<span className='mb-3 text-white' >
  Get the app
</span>
<div className='d-flex align-items-center my-2 mx-3 justify-content-center'>
      <img src={play} alt=".." style={{height:"2rem"}} className=' px-2'/>
      <img src={microsoft} alt=".." style={{height:"2rem"}} className=' px-2'/>
    </div>
    </div>
    </>
   
  );
}

export default Authform;
