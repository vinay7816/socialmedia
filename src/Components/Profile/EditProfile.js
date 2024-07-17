import React, { useState, useEffect } from 'react';
import img from "../../assets/img1.png";
import { useSelector } from 'react-redux';
import './EditProfile.scss';
import useShowtoast from '../../Hooks/useShowtoast';
import usePreviewImg from '../../Hooks/usePreviewImg';
import useEditprofile from '../../Hooks/useEditprofile';


const EditProfile = ({ open, onClose }) => {
  const [input, setInput] = useState({
    fullname: "",
    username: "",
    bio: ""
  });
  const details = useSelector(state => state.user);
const{handleImagechange,selectedFile,setSelectedFile}=usePreviewImg();
const{isUpdating,editProfile}=useEditprofile();
const { toast, showToast } = useShowtoast();
  const handleEditProfile = async(e) => {
     e.preventDefault();
    try{
      await editProfile(input,selectedFile);
      setSelectedFile(null);
      onClose();
    }
    catch(error){
      showToast("Error", error.message, "error");
    }
    
  };

 

  if (!open) return null;

  return (
    <div className="modal-overlay   "  onClick={onClose}>
      {toast.visible && (
        <div className={`toast ${toast.status}`} role="alert" aria-live="assertive" aria-atomic="true">
          <div className="toast-header">
            <strong className="me-auto">{toast.title}</strong>
            <button type="button" className="btn-close" onClick={() => showToast('', '', '')} aria-label="Close"></button>
          </div>
          <div className="toast-body">
            {toast.description}
          </div>
        </div>
      )}
      <div className="modal-dialog1" onClick={e => e.stopPropagation()}>
        <div className="modal-content" style={{overflowY:"hidden"}}>
          <div className="modal-header">
            <h1 className="modal-title">Edit Profile</h1>
            <button type="button" className="close-btn" onClick={onClose}>
              &times;
            </button>
          </div>
          <form onSubmit={handleEditProfile}>
            <div className="modal-body">
              <div className="modal-body-content">
                <div className="form-group">
                  <div className="avatar-section d-flex justify-content-around">
                    <img src={selectedFile||details.profilePicURL} alt="Avatar" className="profile-img" />
                    <label className="edit-pic-btn" htmlFor="inputGroupFile01">
                      Edit Profile Picture
                    </label>
                    <input
                      type="file"
                      id="inputGroupFile01"
                      className="hidden-create"
                      onChange={handleImagechange}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="fullName" className="label">Full Name</label>
                  <input
                    type="text"
                    className="input"
                    id="fullName"
                    value={details.fullName || input.fullname}
                    onChange={(e) => setInput({ ...input, fullname: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="username" className="label">Username</label>
                  <input
                    type="text"
                    className="input"
                    id="username"
                    value={input.username}
                    onChange={(e) => setInput({ ...input, username: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="bio" className="label">Bio</label>
                  <input
                    type="text"
                    className="input"
                    id="bio"
                    value={input.bio}
                    onChange={(e) => setInput({ ...input, bio: e.target.value })}
                  />
                </div>
                <div className="modal-footer">
                  <button type="button" className="close-btn" onClick={onClose}>
                    Close
                  </button>
                  <button type="submit" className="save-btn">
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
