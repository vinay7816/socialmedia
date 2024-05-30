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
   <div>
      
      {postsArray.map((post) => (
        <>
        <Feedheader post={post}/>
        <div className='col  col-auto my-0' >
        <img className=" rounded img-fluid" style={{}} src={post.imageURL}  alt=".."  />
        </div>
						 <Feedfooter post={post}/>
             </>
					))}
      
      
      
     
      </div>
      </>
  );
}

export default Feedpost;
