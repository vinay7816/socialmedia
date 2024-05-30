import  { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import useShowtoast from './useShowtoast';
import { uploadString, ref, getDownloadURL } from "firebase/storage";
import {firestore,storage} from "../firebase/Firebase"
import {doc,updateDoc} from "firebase/firestore"
import { loginUser } from '../Redux/Useslice';
    
const useEditprofile = () => {
    const dispatch=useDispatch();
 const[isUpdating,setisUpdating]=useState(false);
 const details=useSelector((state)=>state.user);
 const showToast=useShowtoast();
 const editProfile=async(input,selectedFile)=>{
    console.log("editing");
    if(isUpdating||!details)
        return;
    setisUpdating(true);
    const storageref=ref(storage,`Profilepics/${details.uid}`);
    const userdoc=doc(firestore,"users",details.uid);
    let URL="";
    try{
        if(selectedFile){
            await uploadString(storageref,selectedFile,"data_url");
            URL=await getDownloadURL(ref(storage,`Profilepics/${details.uid}`))
        }
        const updateduser={
            ...details,
            fullname:input.fullname||details.fullname,
            username:input.username||details.username,
            bio:input.bio||details.bio,
            profilePicURL:URL||details.profilePicURL,
        }
        await updateDoc(userdoc,updateduser);
        localStorage.setItem("user-Info", JSON.stringify(updateduser));
        dispatch(loginUser(updateduser))
    }
    catch(error){
  showToast("Error",error.message,"error");
    }
 }
return{editProfile,isUpdating};
}

export default useEditprofile
