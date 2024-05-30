import React from 'react';
import useGetuserbyUseId from '../../Hooks/useGetuserbyUseId';

const Comment = ({ comment }) => {
  const { isLoading, userProfile } = useGetuserbyUseId(comment.createdBy);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!userProfile) {
    return <div>User not found</div>;
  }

  return (
    <div className='container'>
      <div className='d-flex'>
        <div>
          <img className='rounded-circle img-fluid avatar' src={userProfile.profilePicURL} alt="profile" style={{ height: "3rem", width: "2rem" }} />
        </div>
        <div className='d-flex justify-content-center'>
          <div className='mx-1 d-flex-inline flex-column'>
            <p style={{ fontWeight: "bolder" }}>{userProfile.username}</p>
            <p style={{ marginTop: "-20px" }}>{comment.comment}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
