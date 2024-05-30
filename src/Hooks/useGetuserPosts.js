import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/Firebase";
import { useDispatch, useSelector } from "react-redux";
import { Clear, FetchPosts } from "../Redux/FetchPostsslice";

const useGetUserPosts = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.information); // Access userProfile from Redux store

  useEffect(() => {
    const getPosts = async () => {
      if (!userProfile) return; 
      dispatch(Clear())
      setIsLoading(true);

      try {
        const q = query(collection(firestore, "posts"), where("createdBy", "==", userProfile.uid)); // Query by createdBy
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) return dispatch(Clear());

        let fetchedPosts = [];
        querySnapshot.forEach((doc) => {
          fetchedPosts.push({ ...doc.data(), id: doc.id }); 
          
        });
          
        dispatch(FetchPosts(fetchedPosts)); 
        console.log(fetchedPosts);
      } 
      catch (error) {
        console.error("Error fetching posts:", error);
        
      } finally {
        setIsLoading(false);
      }
    };

    getPosts();
  }, [dispatch,userProfile.uid]); 

  return { isLoading }; 
};

export default useGetUserPosts;
