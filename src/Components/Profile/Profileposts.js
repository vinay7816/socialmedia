
import { useState } from 'react';
import Profilepost from './Profilepost'
import useGetUserPosts from '../../Hooks/useGetuserPosts';
import { useSelector } from 'react-redux';
const Profileposts = () => {
  const posts=useSelector((state)=>state.FetchedPosts)
  const authuser=useSelector((state)=>state.information)
  
  const { isLoading} = useGetUserPosts();
 
  const postsArray = Object.values(posts);
  const noPostsFound = !isLoading && authuser.posts.length === 0;
  
	if (noPostsFound) return ;
  return (
    <div className='w-100   my-5 ' >
      <div className=' d-xl-flex d-md-flex d-lg-flex d-sm-flex d-xs-block  ' style={{columnGap:"20px",display:"flex", flexWrap:"wrap"}} >
     {!isLoading && (
				<>
				
        {postsArray.map((post) => (
						<Profilepost post={post} key={post.id} />
					))}
          </>
				
			)}
      </div>
   
    </div>
  )
}

export default Profileposts
