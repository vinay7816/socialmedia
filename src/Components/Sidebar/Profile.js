import React from 'react'
import avatar from "../../assets/profilepic.png"
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Profile = () => {
    const  authUser = useSelector(state => state.user);
  return (
    <>
    <Link to={`/${authUser?.username}`} className='w-100' style={{textDecoration:"none"}}>
              <div className='sbi'>
                <a href='#' className='nav-link text-white fs-5' aria-current="page">
                <img src={avatar} alt="mdo" width="26" height="26" class="rounded-circle"/>
                  <span className='ms-3 d-none d-md-inline'>Profile</span>
                </a>
              </div>
              </Link>
      
    </>
  )
}

export default Profile
