import { useState } from "react";
import useShowToast from "./useShowtoast";
import { arrayUnion, doc, updateDoc, getDoc } from "firebase/firestore";
import { firestore } from "../firebase/Firebase";
import { useDispatch, useSelector } from "react-redux";
import { addFetchComments } from "../Redux/FetchPostsslice";

const usePostComment = () => {
  const [isCommenting, setIsCommenting] = useState(false);
  const dispatch = useDispatch();
  const { showToast } = useShowToast();
  const authUser = useSelector((state) => state.information);

  const handlePostComment = async (postId, comment) => {
    if (isCommenting) return;
    if (!authUser) {
      showToast("Error", "You must be logged in to comment", "error");
      return;
    }

    setIsCommenting(true);

    const newComment = {
      comment,
      createdAt: Date.now(),
      createdBy: authUser.uid,
      postId,
    };

    try {
      // Update Firestore document with new comment
      await updateDoc(doc(firestore, "posts", postId), {
        comments: arrayUnion(newComment),
      });

      // Dispatch action to update Redux state with new comment
      dispatch(addFetchComments({ postId, comments: [newComment] }));

      // Fetch updated post data to ensure Redux state is synchronized with Firestore
    
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setIsCommenting(false);
    }
  };

  return { isCommenting, handlePostComment };
};

export default usePostComment;
