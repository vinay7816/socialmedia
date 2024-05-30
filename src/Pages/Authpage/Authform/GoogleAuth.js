import React from 'react'
import google from "../../../assets/google.png"
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { auth,firestore} from '../../../firebase/Firebase';
import useShowtoast from '../../../Hooks/useShowtoast';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../Redux/Useslice';
import { doc,setDoc,getDoc } from 'firebase/firestore';
const GoogleAuth = ({prefix}) => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);  
  const showToast=useShowtoast();
  const dispatch=useDispatch();
  const handleGoogleAuth = async () => {
		try {
			const newUser = await signInWithGoogle();
			if (!newUser && error) {
				showToast("Error", error.message, "error");
				return;
			}
			const userRef = doc(firestore, "users", newUser.user.uid);
			const userSnap = await getDoc(userRef);

			if (userSnap.exists()) {
				// login
				const userDoc = userSnap.data();
				localStorage.setItem("user-info", JSON.stringify(userDoc));
				dispatch(loginUser(userDoc));
			} else {
				// signup
				const userDoc = {
					uid: newUser.user.uid,
					email: newUser.user.email,
					username: newUser.user.email.split("@")[0],
					fullName: newUser.user.displayName,
					bio: "",
					profilePicURL: newUser.user.photoURL,
					followers: [],
					following: [],
					posts: [],
					createdAt: Date.now(),
				};
				await setDoc(doc(firestore, "users", newUser.user.uid), userDoc);
				localStorage.setItem("user-info", JSON.stringify(userDoc));
				dispatch(loginUser(userDoc));
			}
		} catch (error) {
			showToast("Error", error.message, "error");
		}
	};
  return (
    <>
        <div className='d-flex align-items-center justify-content-center' onClick={handleGoogleAuth}>
      <img src={google} alt=".." style={{height:"1.5rem"}} className=' px-2 mb-2'/>
      <a href="#" type='button' role='submit' className='mb-2' style={{textDecoration:"none"}}>{prefix} with Google</a>
    </div>
    </>
  )
}

export default GoogleAuth
