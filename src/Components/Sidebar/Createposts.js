import { CreatePostLogo } from '../../assets/constants';
import { useState } from 'react';
import usePreviewImg from '../../Hooks/usePreviewImg';
import { useRef } from 'react';
import useShowtoast from '../../Hooks/useShowtoast';
import { useSelector } from 'react-redux';
import { ref } from 'firebase/storage';
import { arrayUnion } from 'firebase/firestore';
import { doc } from 'firebase/firestore';
import { useLocation } from 'react-router-dom';
import { addDoc, collection, updateDoc } from 'firebase/firestore';
import { firestore, storage } from '../../firebase/Firebase';
import { getDownloadURL, uploadString } from 'firebase/storage';
import { CreatePosts } from '../../Redux/CreatePostsslice';
import { useDispatch } from 'react-redux';
import { addPosts, setUserProfile } from '../../Redux/Useprofileslice';
import { FetchPosts, addFetchPost} from '../../Redux/FetchPostsslice';
const Createposts = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  

  return (
    <>
      <div className='sbi' onClick={handleOpen}>
        <a href='#' className='nav-link text-white fs-5' aria-current="page">
          <CreatePostLogo />
          <span className='ms-3 d-none d-md-inline'>Create</span>
        </a>
      </div>
      {open && <Modal onClose={handleClose} />}
    </>
  );
}

const Modal = ({ onClose }) => {
  const [caption, setCaption] = useState("");
	const imageRef = useRef(null);
	const{handleImagechange,selectedFile,setSelectedFile}=usePreviewImg();
  const{isLoading,handleCreatePost}=useCreatePost();
  const showToast=useShowtoast();
  const handlePostCreation =async (e) => {
    e.preventDefault();
    try{
      await handleCreatePost(selectedFile,caption);
      onClose();
      setCaption("");
      setSelectedFile(null);
    }
    catch(error){
     showToast("Error", error.message, "error")
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose} aria-modal="true" role="dialog">
      <div className="modal-dialog bg-black my-3 position-absolute top-0" onClick={e => e.stopPropagation()}>
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title">Create post</h1>
            <button type="button" className="close-btn" onClick={onClose} aria-label="Close">
              &times;
            </button>
          </div>
          <form onSubmit={handlePostCreation}>
            <div className="modal-body">
              <div className="modal-body-content">
                <div className="form-group">
                  <textarea className="form-control bg-black text-white" 
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  id="exampleFormControlTextarea1" rows="3"></textarea>
                </div>
                <div className="modal-footer d-flex justify-content-between">
                  <div>
                    <label htmlFor="inputGroupFile01" className="fa-solid fs-5 fa-image mx-1" role='button'></label>
                    <input
                      type="file"
                      id="inputGroupFile01"
                      className="d-none "
                      onChange={handleImagechange}
                    />
                  </div>
                  <button type="submit" className="pop-up-button text-white px-3">
                    Post
                  </button>
                  {selectedFile&&
                  <div className='d-flex flex-column'>
                  <button type="button" className="close-btn align-self-end my-2 p-0 fs-3 bg-black text-white" onClick={() => {
										setSelectedFile(null);
									}}>
                  &times;
                </button>
                <img src={selectedFile} alt="none" className='rounded  img-fluid'/>
                  </div>
                  }
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Createposts;



function useCreatePost(){
  
  const showToast = useShowtoast();
	const [isLoading, setIsLoading] = useState(false);
	const authUser = useSelector((state) => state.user);
  const userprofile=useSelector((state)=>state.information);
	const { pathname } = useLocation();
      const dispatch=useDispatch();
  const handleCreatePost=async(selectedFile,caption)=>{
    console.log("hanle post")
     if(isLoading)
      return;
    if(!selectedFile)
      throw new Error("Please select an image");
      setIsLoading(true);
      const newpost = {
        caption: caption,
        likes: [],
        comments: [],
        createdAt: Date.now(),
        createdBy: authUser.uid,
      };
  

      
  
  
  try{
    const postDocRef=await addDoc(collection(firestore,"posts"),newpost);
    const userDocRef=doc(firestore,"users",authUser.uid);
    const imageRef=ref(storage,`posts/${postDocRef.id}`);
    await updateDoc(userDocRef,{posts:arrayUnion(postDocRef.id)});
    await uploadString(imageRef,selectedFile,"data_url");
    const downloadURL=await getDownloadURL(imageRef);

    await updateDoc(postDocRef,{imageURL:downloadURL});
    newpost.imageURL=downloadURL;
    const fetchposts=[];
    fetchposts.push({...newpost, id: postDocRef.id}); 
   
    if(userprofile.uid===authUser.uid) dispatch(CreatePosts({...newpost, id: postDocRef.id})) ;
    if (pathname !== "/" && userprofile.uid === authUser.uid) dispatch(addFetchPost({...newpost, id: postDocRef.id}));
   
  }

  catch (error) {
    showToast("Error", error.message, "error");
  } finally {
    setIsLoading(false);
  }
}
  return { isLoading, handleCreatePost };
}
