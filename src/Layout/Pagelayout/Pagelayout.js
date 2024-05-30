import React from 'react';
import Sidebar from '../../Components/Sidebar/Sidebar';
import { useLocation } from 'react-router-dom';
const Pagelayout = ({children}) => {
    const pathname=useLocation();
  return (
    <div className='container-fluid d-flex'>
        {
            pathname!=='/auth'?( <div className='col mx-0'>
              
              </div>):null
        }
     <div>
       {children}
     </div>
    </div>
  );
}

export default Pagelayout;
