import { useSignOut } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/Firebase';
import useShowtoast from './useShowtoast';
import { logoutuser } from '../Redux/Useslice';
import { useDispatch } from 'react-redux';

const useLogout = () => {
    const dispatch=useDispatch();
    const [signOut, isLoggingout, error] = useSignOut(auth);
    const showToast=useShowtoast();
    const handleLogout=async()=>{
        try{
            await signOut();
            dispatch(logoutuser('user-Info'))
            localStorage.removeItem('user-Info');
            console.log("logged out");
       
        }
        catch(error){
            showToast("error",error.message,"error")
        }

    }
  return {handleLogout,isLoggingout,error}
}

export default useLogout
