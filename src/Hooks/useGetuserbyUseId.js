import useShowtoast from "./useShowtoast";
import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../firebase/Firebase";

const useGetuserbyUseId = (userId) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);
  const showToast = useShowtoast();

  useEffect(() => {
    if (!userId) {
      setIsLoading(false);
      setUserProfile(null);
      return;
    }

    const getUserProfile = async () => {
      setIsLoading(true);
      setUserProfile(null);
      try {
        const userRef = await getDoc(doc(firestore, "users", userId));
        if (userRef.exists()) {
          setUserProfile(userRef.data());
        } else {
          showToast("Error", "User not found", "error");
        }
      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setIsLoading(false);
      }
    };

    getUserProfile();
  }, [userId]);

  return { isLoading, userProfile, setUserProfile };
};

export default useGetuserbyUseId;
