import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useShowtoast from "./useShowtoast";
import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import { firestore } from "../firebase/Firebase";

const useGetSuggestedUser = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [SuggestedUsers, setSuggestedUsers] = useState([]);
    const authuser = useSelector((state) => state.user);
    const showToast = useShowtoast();

    useEffect(() => {
        const getSuggestedUsers = async () => {
            setIsLoading(true);
            try {
                const UserRef = collection(firestore, "users");
                const q = query(
                    UserRef,
                    where("uid", "!=", authuser.uid ),
                    orderBy("uid"),
                    limit(5)
                );

                const querySnapshot = await getDocs(q);
                const users = [];
                querySnapshot.forEach((doc) => {
                    users.push({ ...doc.data(), id: doc.id });
                });

                setSuggestedUsers(users);
            } catch (error) {
                showToast("Error", error.message, "error");
            } finally {
                setIsLoading(false);
            }
        };

        if (authuser) {
            getSuggestedUsers();
        }
    }, [authuser, showToast]);

    return { isLoading, SuggestedUsers };
}

export default useGetSuggestedUser;
