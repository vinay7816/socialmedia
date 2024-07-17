import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import EditProfile from './EditProfile';
import './Profileheader.scss';
import useFollowUser from '../../Hooks/usefollowUser';

const Profileheader = () => {
  const details = useSelector(state => state.user);
  const [open, setOpen] = useState(false);
  const userProfile = useSelector((state) => state.information);
  const visitingOwnProfileAndAuth = details && details.username === userProfile.username;
	const visitingAnotherProfileAndAuth = details && details.username !== userProfile.username;
  const { isFollowing, isUpdating, handleFollowUser } = useFollowUser(userProfile.uid);
  const Posts=useSelector((state)=>state.FetchedPosts);
  
  return (
    <>
      <div className='profile-header d-flex justify-content-center align-items-center text-white gap-md-3 gap-sm-1'>
        <div className='d-flex profile-img '>
          <img
            src={userProfile.profilePicURL}
            className="profile-img rounded-circle  align-self-start img-fluid"
            
            alt="Avatar"
          />
        </div>
        <div className='d-flex my-content flex-column w-100'>
          <div className='d-flex flex-row align-items-center w-100'>
            <span className='username text mx-1 fs-sm-5 fs-md-4'>{userProfile.username}</span>
            <div className='mx-3 my-content'>
             {visitingOwnProfileAndAuth
             &&  <button
             className='text5 edit-profile-btn btn btn-primary'
             onClick={() => setOpen(true)}
             style={{  fontWeight: "550" }}
           >
             Edit Profile
           </button>} 
           {visitingAnotherProfileAndAuth&&<button
                className='text5 edit-profile-btn btn btn-primary'
                
                style={{  fontWeight: "550" }}
                onClick={handleFollowUser}
								isLoading={isUpdating}
              >
                {isFollowing?"UnFollow":"follow"}
              </button>}
            </div>
          </div>
          <div className='d-flex flex-row mt-1 my-content'>
            <h6 className='text1 mx-1 my-content fs-sm-7 fs-auto fs-md-4'>{Posts.length} Posts</h6>
            <h6 className='text1 mx-1 my-content fs-sm-7 fs-auto fs-md-4'>{userProfile.followers.length} Followers</h6>
            <h6 className='text1 mx-1  my-content fs-sm-7 fs-auto fs-md-4'>{userProfile.following.length} Following</h6>
          </div>
          <div>
            <h6 className='text1 mx-1 fs-sm-7 fs-auto fs-md-4'>As a programmer</h6>
          </div>
          <div>
            <h6 className='text1 mx-1 fs-sm-12 fs-auto fs-md-4'>{userProfile.bio}</h6>
          </div>
        </div>
      </div>

      {open && <EditProfile open={open} onClose={() => setOpen(false)} />}
    </>
  );
};

export default Profileheader;
