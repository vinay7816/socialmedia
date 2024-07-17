import React from 'react';
import Feedheader from './Feedheader';
import Feedfooter from './Feedfooter';
import img1 from "../../assets/img1.png"
import { useSelector } from 'react-redux';
import useGetFeedPosts from '../../Hooks/useGetFeedPosts';
import "./Feedpost.scss"
import useGetuserbyUseId from '../../Hooks/useGetuserbyUseId';
const Feedpost = () => {
  const { isLoading,posts } = useGetFeedPosts();
  //const posts=useSelector((state)=>state.FetchedPosts)
  const postsArray = Object.values(posts);
  

  return (
    
   <>
   
      
      {postsArray.map((post) => (
        <div  className="feedpost my-3 py-0 px-2" style={{  border:" solid 2px #1b1b1b",borderRadius:"1rem"}} >

        <Feedheader post={post}/>
        <div className=' my-0' >
        <img className="  img-fluid px-0 mx-0" style={{ borderRadius:"1rem"}} src={post.imageURL}  alt=".."  />
        </div>
						 <Feedfooter post={post}/>
             </div>
					))}
      
      
      
     
     
      </>
  );
}

export default Feedpost;
