import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateauthuser } from '../Redux/Useslice';
import { updateUserProfile } from '../Redux/Useprofileslice';
import useShowtoast from './useShowtoast';
import { firestore } from '../firebase/Firebase';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';

const useFollowUser = (userId) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const authUser = useSelector((state) => state.user);
  const userProfile = useSelector((state) => state.userProfile);
  const dispatch = useDispatch();
  const {showToast} = useShowtoast();

  const handleFollowUser = async () => {
    setIsUpdating(true);
    try {
      const currentUserRef = doc(firestore, "users", authUser.uid);
      const userToFollowOrUnfollowRef = doc(firestore, "users", userId);

      if (isFollowing) {
        // Unfollow user
        await updateDoc(currentUserRef, {
          following: arrayRemove(userId),
        });
        await updateDoc(userToFollowOrUnfollowRef, {
          followers: arrayRemove(authUser.uid),
        });

        // Update Redux state
        dispatch(updateauthuser({
          following: authUser.following.filter((id) => id !== userId)
        }));
        if (userProfile.uid === userId) {
          dispatch(updateUserProfile({
            followers: userProfile.followers.filter((id) => id !== authUser.uid)
          }));
          console.log( 
             userProfile.followers.filter((id) => id !== authUser.uid)
          );
        }

        setIsFollowing(false);
      } else {
        // Follow user
        await updateDoc(currentUserRef, {
          following: arrayUnion(userId),
        });
        await updateDoc(userToFollowOrUnfollowRef, {
          followers: arrayUnion(authUser.uid),
        });

        // Update Redux state
        dispatch(updateauthuser({
          following: [...authUser.following, userId]
        }));
        if (userProfile.uid === userId) {
          dispatch(updateUserProfile({
            followers: [...userProfile.followers, authUser.uid]
          }));
        }

        setIsFollowing(true);
      }
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    if (authUser && authUser.following) {
      const isUserFollowing = authUser.following.includes(userId);
      setIsFollowing(isUserFollowing);
    }
  }, [authUser, userId]);
  

  return { isUpdating, isFollowing, handleFollowUser };
};

export default useFollowUser;
