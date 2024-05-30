import Avatar from "../../assets/profilepic.png"
import useLogout from "../../Hooks/useLogout";
import { useSelector } from "react-redux";
const Suggestedheader = () => {
  const {handleLogout,isLoggingout,error}=useLogout();
  const details=useSelector(state=>state.user);
  return (
    <div className="d-flex justify-content-between align-items-center w100 mt-3">
       <div className='d-flex align-items-center mx-2'>
        <img
          src={details.profilePicURL}
          class="my-1 rounded-circle shadow-4 align-self-start"
          style={{height: "6vh", width: "6vh" }}
          alt="Avatar"
        />
        <span >
          <span className='text mx-2'>{details.username}</span>
        
        </span>
      </div>
      <div >
        <span className='text unflw' role='button' style={{fontSize:"16px",fontWeight:"400"}} 
        onClick={handleLogout}
        >Logout</span>
      </div>
    </div>
  )
}

export default Suggestedheader
