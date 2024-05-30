import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import {auth,firestore} from '../firebase/Firebase'
import { doc,setDoc } from 'firebase/firestore';
import useShowtoast from './useShowtoast';

const useSignUpWithEmailAndPassword = () => {
    const [
        createUserWithEmailAndPassword,
        loading,
        error,
      ] = useCreateUserWithEmailAndPassword(auth);
      const showToast=useShowtoast();
      const signup=async(input)=>{
        if(!input.email||!input.password||!input.fullname||!input.username){
          <div className='position-absolute top=0 right-50'>
            {showToast("Error","Pleasefill all the fields","error")}
          </div>
          
          return;
        }
        try{
          const newUser=await createUserWithEmailAndPassword(input.email,input.password)
          if(!newUser&&error){
            {showToast("Error","Pleasefill all the fields","error")}
            return;
          }
          if(newUser){
            const userDoc ={
          uid: newUser.user.uid,
					email: input.email,
					username: input.username,
					fullname: input.fullname,
					bio: "",
					profilePicURL: "",
					followers: [],
					following: [],
					posts: [],
					createdAt: Date.now(),

            }
            await setDoc(doc(firestore, "users", newUser.user.uid), userDoc);
            
            
          }

        }
        catch(error){
         console.log(error);
        }

      }
  return {loading,error,signup}
}

export default useSignUpWithEmailAndPassword
