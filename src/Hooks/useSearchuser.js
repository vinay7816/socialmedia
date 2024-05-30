import React, { useState } from 'react'
import useShowtoast from './useShowtoast';
import { collection, getDocs, query,where } from 'firebase/firestore';
import { firestore } from '../firebase/Firebase';
import { useDispatch } from 'react-redux';
import { SearchProfile } from '../Redux/Searchuserslice';

const useSearchuser = () => {
    const dispatch=useDispatch();
 const[isLoading,setIsLoading]=useState(false);
 const[user,setUser]=useState(null);
 const {showToast, Toast}=useShowtoast();
 const getuserProfile=async (username)=>{
    setIsLoading(true);
    setUser(null);
    try{
       const q=query(collection(firestore,"users"),where("username","==",username));
       const querSnapshot=await getDocs(q);
       if(querSnapshot.empty)
        return showToast("Error","UsernotFound","error");
    querSnapshot.forEach((doc)=>{
        console.log(doc.data())
        dispatch(SearchProfile(doc.data()));
    })

    }
    catch(error){
        showToast("Error",error.message,"error");
        setUser(null);

    }
    finally {
        setIsLoading(false);
    }
 }
 return { isLoading, getuserProfile, user, setUser };
}

export default useSearchuser
