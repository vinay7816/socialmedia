import React from 'react';
import avatar from "../../assets/profilepic.png";
import img2 from "../../assets/img1.png";
import "./Feedheader.scss";
import useGetuserbyUseId from '../../Hooks/useGetuserbyUseId';
import useFollowUser from '../../Hooks/usefollowUser';
import { timeAgo } from '../../utils/utils';
const Feedheader = ({ post }) => {
  const { isLoading, userProfile } = useGetuserbyUseId(post.createdBy);
  const { isFollowing, isUpdating, handleFollowUser } = useFollowUser(post.createdBy);

  if (isLoading) {
    return <div>Loading...</div>; 
  }

  if (!userProfile) {
    return <div>User not found</div>; 
  }

  return (
    <div className='d-flex justify-content-between mt-2 align-items-center my-1'>
      <div className='d-flex align-items-center '>
        <img
          src={userProfile.profilePicURL || avatar} 
          className="my-1 rounded-circle shadow-4 align-self-start"
          style={{ height: "5vh", width: "5vh" }}
          alt="Avatar"
        />
        <span className='user-details'>
          <span className='text mx-1 '>{userProfile.username}</span>
          <span className='text6 mx-1' style={{ color: "grey" }}>.{timeAgo(post.createdAt)}</span>
        </span>
      </div>
      <div>
        <span className='text6 unflw' role='button' onClick={handleFollowUser}
								isLoading={isUpdating}>{isFollowing?"UnFollow":"follow"}</span>
      </div>
    </div>
  );
};

export default Feedheader;
