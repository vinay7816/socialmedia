import React, { useState } from 'react';
import { doc } from 'firebase/firestore';
import { storage, firestore } from '../../firebase/Firebase';
import { ref, deleteObject } from 'firebase/storage';
import { deleteDoc, updateDoc, arrayRemove } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import useShowtoast from '../../Hooks/useShowtoast';
import { deletePost } from '../../Redux/FetchPostsslice';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import './Profilepost.scss'; // Assuming you have this CSS file for styling
import Comment from '../Comments/Comment';
import Feedfooter from '../Feedposts/Feedfooter';

const Modal = ({ open, onClose, post, userProfile, authUser, handleDeletePost, isDeleting }) => {
  if (!open) return null;

  return (
    <div className="custom-modal-overlay" onClick={onClose}>
      <div className="custom-modal-content " onClick={(e) => e.stopPropagation()}>
      <div className="custom-flex-container d-flex justify-content-center align-items-center position-sticky 	col col-lg-6 col-xl-6 col-md-6 col-sm-5" >
              <div className="custom-image-container d-flex align-self-center " >
                <img src={post.imageURL} alt="profile post" className=' ' />
              </div>
              </div>
              <div className="d-flex flex-column custom-details-container col col-xl-6 col-md-6 col-lg-6 col-sm-7" style={{ overflowY: "auto", maxHeight: "23rem" }}>
                
               
               
                <div className="custom-user-info d-flex justify-content-between">
                  <div>
                  <img src={userProfile.profilePicURL} alt="user profile" className="custom-avatar" />
                  <span className="custom-username mx-2">{userProfile.username}</span>
                  </div>
                  <div className='d-flex' style={{marginLeft:"5px"}}>
                {authUser?.uid === userProfile.uid && (
                  <button className="custom-delete-button" onClick={handleDeletePost} disabled={isDeleting}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                )}
                <div>
                   <button type="button" className="custom-close-btn text-white align-self-end" onClick={onClose} aria-label="Close">
            &times;
          </button>
          </div>
                </div>
              
         
          
               </div>
              <div className="custom-divider"></div>
              <div className="custom-content " style={{}}>
                {post.comments.map((comment) => (
                  <div key={comment.id} className="custom-comment">
                  <Comment comment={comment}/>
                  </div>
                ))}
                
              </div>
              <Feedfooter post={post}/> 
            </div>
      </div>
    </div>
  );
};

const Profilepost = ({ post }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [open, setOpen] = useState(false);
  const authUser = useSelector((state) => state.information);
  const dispatch = useDispatch();
  const {toast,showToast} = useShowtoast();

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  const handleDeletePost = async (id) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    if (isDeleting) return;

    setIsDeleting(true);

    try {
      const imageRef = ref(storage, `posts/${post.id}`);
      await deleteObject(imageRef);
      const userRef = doc(firestore, 'users', authUser.uid);
      await deleteDoc(doc(firestore, 'posts', post.id));

      await updateDoc(userRef, {
        posts: arrayRemove(post.id),
      });

      dispatch(deletePost(post.id));
      showToast('Success', 'Post deleted successfully', 200);
    } catch (error) {
      showToast('Error', error.message, 'error');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className="mb-3">
      {toast.visible && (
        <div>
          <h4>{toast.title}</h4>
          <p>{toast.description}</p>
          <span>{toast.status}</span>
        </div>
      )}
        <div className="card card-custom" onClick={handleOpen} style={{ border:" solid 2px #1b1b1b",borderRadius:"1rem",backgroundColor:"none"}}>
          <img
            className="card-img-top card-img-custom img-fluid"
            src={post.imageURL}
            alt="post"
            style={{ objectFit: 'fill', height: '10rem',width:"10rem", border:" solid 2px #1b1b1b",borderRadius:"1rem" }}
          />
        </div>
      </div>
      {open && (
        <Modal
          open={open}
          onClose={handleClose}
          post={post}
          userProfile={authUser}
          authUser={authUser}
          handleDeletePost={() => handleDeletePost(post.id)}
          isDeleting={isDeleting}
        />
      )}
    </>
  );
};

export default Profilepost;
