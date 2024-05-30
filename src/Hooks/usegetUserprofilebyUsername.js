import { useEffect, useState } from "react";
import useShowtoast from "./useShowtoast";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/Firebase"
import { useDispatch, useSelector } from "react-redux";
import { setUserProfile } from "../Redux/Useprofileslice"

const useGetUserProfileByUsername = (username) => {
  const [isLoading, setIsLoading] = useState(true);
  const showToast = useShowtoast();
  const dispatch = useDispatch();
  //const userProfile = useSelector((state) => state.userProfile);

  useEffect(() => {
    const getUserProfile = async () => {
      setIsLoading(true);
      try {
        const q = query(collection(firestore, "users"), where("username", "==", username));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) return dispatch(setUserProfile(null));

        let userDoc;
        querySnapshot.forEach((doc) => {
          userDoc = doc.data();
        });

        dispatch(setUserProfile(userDoc));
        console.log(userDoc);
      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setIsLoading(false);
      }
    };

    getUserProfile();
  }, [dispatch,username]);

  return { isLoading};
};

export default useGetUserProfileByUsername;
