import React, { useState } from 'react';
import { SearchLogo } from '../../assets/constants';
import './Search.scss'; // Ensure the correct path to your SCSS file
import { useRef } from 'react';
import useSearchuser from '../../Hooks/useSearchuser';
import { useSelector } from 'react-redux';
import Suggesteduser from '../SuggestedUsers/Suggesteduser';
import { useDispatch } from 'react-redux';
import { SearchProfile, removeSearch } from '../../Redux/Searchuserslice';
import { Link } from 'react-router-dom';

const Search = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };



  return (
    <div className="search-container gx-0">
      <div className='sbi' role="button" onClick={handleOpen}>
        <a
          href='#'
          className='nav-link text-white fs-5'
          aria-current="page"
        >
          <SearchLogo />
          <span className='ms-3 d-none d-md-inline' >Search</span>
        </a>
      </div>
      {open && <Modal onClose={handleClose} />}
    </div>
  );
};

export default Search;


const Modal = ({ onClose }) => {
    const searchRef=useRef(null);
    const{user,isLoading,getuserProfile}=useSearchuser();
          const dispatch=useDispatch();
const handleSearchuser=(e)=>{
  e.preventDefault();
  getuserProfile(searchRef.current.value);

}

  const info=useSelector((state)=>state.searchinfo);
  const handlesearch=(e)=>{
    e.preventDefault();
    dispatch(removeSearch(info));
    
  }
  return (
    <div className="modal-overlay  " onClick={onClose}>
    <div className="modal-dialog bg-black my-3" onClick={e => e.stopPropagation()}>
      <div className="modal-content">
        <div className="modal-header">
          <h1 className="modal-title">Search user</h1>
          <button type="button" className="close-btn" onClick={onClose}>
            &times;
          </button>
        </div>
        <form onSubmit={handleSearchuser} >
          <div className="modal-body">
            <div className="modal-body-content">
              <div className="form-group">
                <div className="avatar-section">
                 
                 
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="fullName" className="label">Username</label>
                <input
                  type="text"
                  className="input bg-black text-white"
                  id="fullName"
                  ref={searchRef}
                  
                />
              </div>
             
              <div className="modal-footer ">
                      
                <button type="submit text-white" isLoading={isLoading} style={{color:"white"}} className=" pop-up-button ">
                  Search
                </button>
              </div>
              
              
               {info.uid && 
               <div className='d-flex flex-column'>
               <button type="button" className="close-btn align-self-end my-2 bg-black text-white"  onClick={handlesearch}>
               &times;
             </button>
             <Link to={`/${info.username}`} style={{textDecoration:"none",color:"white"}}>
               <Suggesteduser users={info} name={info.username} followers={info.followers.length} following={info.following.length} avatar={info.profilePicURL}/>
               </Link>
               </div>
               }
            </div>
            
          </div>
        </form>
      </div>
    </div>
  </div>
  );
};


