import React from 'react'
import { useSelector } from 'react-redux';
import Profileposts from '../../Components/Profile/Profileposts'
import Profiletabs from '../../Components/Profile/Profiletabs';
import useGetUserProfileByUsername from '../../Hooks/usegetUserprofilebyUsername';
import Profileheader from '../../Components/Profile/Profileheader';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Navbar from '../../Navbar/Navbar';
import './Profilepage.scss'
const Profilepage = () => {
  const  user = useSelector(state => state.user.uid);
  const { username } = useParams();
  const userProfile = useSelector((state) => state.information.uid);
	const { isLoading } = useGetUserProfileByUsername(username);

	const userNotFound = !isLoading && !userProfile;
	if (userNotFound) return <UserNotFound />;
 
  return (
    <>
    
			
    <div className='d-flex w-100 flex-column  justify-content-center align-items-center'>
    {!user&&<Navbar/>}
    <div className=' d-flex flex-column profile-main w-100 justify-content-center align-items-center' >
        <div className='py-5 px-4 w-100  d-flex align-self-center justify-content-center'>
        {!isLoading && userProfile && <Profileheader />}
        </div>
        <div className='d-flex flex-column custom-profile w-75  px-4 mx-5 ' style={{borderTop:"solid 1px grey"}}>
          <Profiletabs/>
          </div>
          <div className='w-75 '>
          <Profileposts/>
        </div>
    </div>
    </div>
    </>
  )
}
const UserNotFound = () => {
  return (
    <div className="d-flex flex-column align-items-center text-center my-5">
      <h2>User Not Found</h2>
      <Link to="/" className="text-primary">
        Go home
      </Link>
    </div>
  );
};

export default Profilepage
