import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import useFollowUser from '../../Hooks/usefollowUser';
const Suggesteduser = ({users,name,followers,avatar,following}) => {
  const details=useSelector((state)=>state.user);
  const { isFollowing, isUpdating, handleFollowUser } = useFollowUser(users.uid);
    const[Followed,Notfollowed]=useState(false);
  return (
    <div className='d-flex justify-content-between align-items-center w-100 my-1 '>
        <div className='d-flex align-items-center '>
        <img
          src={avatar}
          class="my-1 rounded-circle shadow-4 align-self-start"
          style={{height: "6vh", width: "6vh" }}
          alt="Avatar"
        />
        <div className='d-flex flex-column justify-content-center mx-1' >
          <span className='mx-1' style={{fontSize:"16px",fontWeight:"400"}}>{name}</span>
           <span className=' mx-1' style={{fontSize:"12px", color:"grey"}}>{followers} followers</span>
        </div>
      </div>
      <div >
        <span className='text unflw' role='button' style={{fontSize:"16px",fontWeight:"400"}} 
        onClick={handleFollowUser}
        isLoading={isUpdating}>{isFollowing?"UnFollow":"follow"}</span>
      </div>
    </div>
  )
}

export default Suggesteduser
