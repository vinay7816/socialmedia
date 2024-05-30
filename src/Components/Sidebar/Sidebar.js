import React from 'react';
import { InstagramMobileLogo, InstagramLogo, SearchLogo, NotificationsLogo, CreatePostLogo } from '../../assets/constants';
import "./Sidebar.scss"


import useLogout from '../../Hooks/useLogout';
import useShowtoast from '../../Hooks/useShowtoast';
import { useSelector } from 'react-redux';
import SidebarItems from './SidebarItems';
const Sidebar = () => {
    const {handleLogout,isLoggingout,error}=useLogout();
  const [screenWidth, setScreenWidth] = React.useState(window.innerWidth);

  React.useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const showToast=useShowtoast();

  let logoComponent = screenWidth < 769 ? <InstagramMobileLogo /> : <InstagramLogo />;
  

  return (
    <>
         <div className="col-lg-3 col-xl-2 col-auto d-flex flex-column position-fixed vh-100" style={{ backgroundColor: "black", zIndex: "1",borderRight:"solid 1px white" }}>

          
            <div className='mt-2'  >
            
      <div className='px-3 py-3 d-none d-md-block'>
        <InstagramLogo />
      </div>

     
      <div className='px-3 py-3 d-block d-md-none'>
        <InstagramMobileLogo />
      </div>
            <div className='nav nav-pills d-flex flex-column align-items-start justify-content-center'>
            
              
             <SidebarItems/>
              
             
              
            </div>
            </div>
            {/* Logout */}
            <div className=" logout mt-auto  text-start" >
      <div className=" sbi list-unstyled py-2 px-3" style={{textDecoration:"none"}} >
      <a role='button' onClick={handleLogout} className='nav-link text-white fs-5' aria-current="page">
        <i className=" mt-auto fa-solid fa-right-from-bracket fs-4"></i>
        <span className='ms-3 d-none d-md-inline'>Logout</span>
      </a>
      </div>
  </div>
      </div>      
  </>
         
      
     
  
  );
}

export default Sidebar;
