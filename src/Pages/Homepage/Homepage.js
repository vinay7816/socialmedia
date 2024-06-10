import React from 'react';
import Sidebar from '../../Components/Sidebar/Sidebar';
import Feedposts from '../../Components/Feedposts/Feedposts';
import './Home.scss';
import Suggestedusers from '../../Components/SuggestedUsers/Suggestedusers';
const Homepage = () => {
  console.log("home");
  return (
    <div className=' home-box container no-gutter mx-0 text-white'  >
     
    <div className='d-flex no-gutter' style={{columnGap:"1"}}>
      <div className=' custom-home gx-0 col col-lg-7 col-xl-7 col-md-12 col-sm-10  mx-3 ' >
        <Feedposts/>
      </div>
      <div className='container-fluid col-lg-5 col-xl-5 d-none d-xxl-block d-xl-block d-lg-block' style={{maxWidth:"300px"}}>
        <Suggestedusers/>
      </div>

    </div>
      
    </div>
  );
}

export default Homepage;
