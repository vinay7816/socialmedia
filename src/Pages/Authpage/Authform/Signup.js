import React from 'react'
import { useState } from 'react';
import useSignUpWithEmailAndPassword from '../../../Hooks/useSignUpWithEmailAndPassword';
import useShowtoast from '../../../Hooks/useShowtoast';
const Signup = () => {
    const [input, Setinput] = useState({
        fullname:"",
        username:"",
        email: "",
        password: "",
      });
      const[show,hide]=useState(false);
      const { loading, error, signup } = useSignUpWithEmailAndPassword();
      if (!loading && error) {
        return <h1>Hello</h1>;
      }
  return (
    <>
     <div class="mb-3 ">
     <input
        class="form-control  "
        type="email"
        id="emailfile"
        style={{height:"2rem"}}
        value={input.email}
        onChange={(e) => Setinput({ ...input, email: e.target.value })}
        placeholder="Email"
        required="true"
      />
     </div>
      
      <div class="mb-3 ">
      <input
        class="form-control  "
        type="text"
        id="namefile"
        
        value={input.fullname}
        style={{height:"2rem"}}
        onChange={(e) => Setinput({ ...input, fullname: e.target.value })}
        placeholder="Fullname"
        required="true"
      />
      </div>
       
      <div class="mb-3 ">
      <input
        class="form-control  "
        type="text"
        id="namefile"
        style={{height:"2rem"}}
        value={input.username}
        onChange={(e) => Setinput({ ...input, username: e.target.value })}
        placeholder="Username"
        required="true"
      />
      </div>
       


<div class="input-group mb-3  ">

   <input
        class="form-control required"
        type={!show?"password":"text"}
        id="emailpassword"
        style={{height:"2rem"}}
        value={input.password}
        onChange={(e) => Setinput({ ...input, password: e.target.value })}
        required="true"
        placeholder="Password"
        
      />
   <span className='input-group-text' onClick={()=>{hide(!show)}}>
      {show?<i class="fa-solid fa-eye  fa-xs"></i>:<i class="fa-solid fa-eye-slash fa-xs"></i>}
      </span>

      
      
</div>
<div class="d-grid gap-2 d-md-block  " style={{height:"2rem"}}>
  <button class="btn btn-primary form-control submit " type="submit" value='submit' onClick={(e)=>{signup(input)}} >Sign up</button>
  
</div>
      
    </>
  )
}

export default Signup
