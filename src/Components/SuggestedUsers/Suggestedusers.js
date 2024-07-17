import React from 'react'
import Suggestedheader from './Suggestedheader'
import Suggesteduser from './Suggesteduser'
import useGetSuggestedUser from '../../Hooks/useGetSuggestedUser'


const Suggestedusers = () => {
  const{isLoading,SuggestedUsers}=useGetSuggestedUser();
  return (
    <div className='d-flex flex-column'>
      <Suggestedheader/>
      <div className='d-flex justify-content-between align-items-center my-2'>
        <span>
         <text style={{fontSize:"15px",fontWeight:"500",color:"gray"}}>Suggested for you</text>
         </span>
         <span>
         <text role="button" style={{fontSize:"15px",fontWeight:"400",color:"white",cursor:"pointer"}}>See All</text>
         </span>
      </div>
      {SuggestedUsers.map((users)=>(
       
              <Suggesteduser users={users} name={users.username} followers={users.followers.length} avatar={users.profilePicURL}/>
             
      ))}
      
    </div>
  )
}

export default Suggestedusers
