
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { firestore } from "../firebase/Firebase";
import { loginUser } from "../Redux/Useslice";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/Firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc,getDoc } from "firebase/firestore";
import useShowToast from "./useShowtoast";

const useLogin = () => {
  const dispatch = useDispatch();
  const { showToast } = useShowToast();

  const login = async (input) => {
      const { email, password } = input;
      try {
          await signInWithEmailAndPassword(auth, email, password);
      } catch (error) {
        //window.confirm(error.message,"user doesn't exist")
        showToast("error",error.message,"kkkkkkk")
      }
  };

  useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
          if (user) {
              const snapshot = await getDoc(doc(firestore, "users", user.uid));
              const userData = snapshot.data();
              localStorage.setItem("user-Info", JSON.stringify(userData));
              dispatch(loginUser(userData));
          }
      });

      return () => unsubscribe();
  }, [dispatch]);

  return { login,showToast };
};

export default useLogin;