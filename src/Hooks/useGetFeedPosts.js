import { useEffect, useState, useCallback, useRef } from "react";
import useShowToast from "./useShowtoast";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/Firebase";
import { useDispatch, useSelector } from "react-redux";
import { FetchPosts } from "../Redux/FetchPostsslice";

const useGetFeedPosts = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [posts, setPosts] = useState([]);
    const authUser = useSelector((state) => state.user);
    const showToast = useShowToast();
    const dispatch = useDispatch();
    const previousPostsRef = useRef([]);

    const getFeedPosts = useCallback(async () => {
        setIsLoading(true);
        if (!authUser || authUser.following.length === 0) {
            setIsLoading(false);
            setPosts([]);
            return;
        }

        const q = query(collection(firestore, "posts"), where("createdBy", "in", authUser.following));
        try {
            const querySnapshot = await getDocs(q);
            const feedPosts = [];

            querySnapshot.forEach((doc) => {
                feedPosts.push({ id: doc.id, ...doc.data() });
            });

            feedPosts.sort((a, b) => b.createdAt - a.createdAt);
            setPosts(feedPosts);

            // Only dispatch if posts have changed
            if (JSON.stringify(feedPosts) !== JSON.stringify(previousPostsRef.current)) {
                previousPostsRef.current = feedPosts;
                dispatch(FetchPosts(feedPosts));
            }
        } catch (error) {
            showToast("Error", error.message, "error");
        } finally {
            setIsLoading(false);
        }
    }, [authUser, dispatch]);

    useEffect(() => {
        if (authUser) {
            getFeedPosts();
        }
    }, [authUser, getFeedPosts]);

    return { isLoading, posts };
};

export default useGetFeedPosts;
