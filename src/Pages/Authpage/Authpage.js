import React from 'react';
import auth from '../../assets/auth.png'
import './Authpage.scss'
import Authform from "./Authform/Authform"
const Authpage = () => {
  
  return (
    <div className='container d-flex justify-content-center align-items-center' style={{height:"100vh"}}>
        <div className='section row w-75  d-flex-inline justify-content-center auth' >
            <div className='col col-lg-4 d-none d-lg-block d-xl-block d-flex '  >
            <img src={auth} alt=".." className='	' style={{height:"26rem"}}/>

            </div>
            <div className='right col col-xl-4 col-lg-4 col-md-8 col-sm-12 text-center ' style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
              
                  <Authform/>

            </div>

        </div>
  
    </div>
  );
}

export default Authpage;
