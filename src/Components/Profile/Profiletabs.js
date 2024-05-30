import React from 'react'
import grid from "../../assets/grid.png"
const Profiletabs = () => {
  return (
    <div className='d-flex w-100 justify-content-center align-items-center text-white mt-0'>
      <div className='mx-4 d-flex  align-items-center justify-content-center ' style={{borderTop:"solid 2px white"}}>
        <div>
        <img src={grid} className=' 'style={{height:"1.6rem"}} alt="..."/>
        
        </div>
        <div className='mx-1 d-none d-sm-block'><text className=''>Posts</text></div>
      
      </div>
      <div className='mx-4 d-flex align-items-center justify-content-center' >
        <div>
        <i class="fa-regular fa-bookmark fs-4 py-1"></i>
        
        </div>
        <div className='mx-1 d-none d-sm-block'><text className='mx-1 ' >Saved</text></div>
      
      </div>
      <div className='mx-4 d-flex align-items-center justify-content-center' >
        <div>
        <i class="fa-regular fa-heart fs-4 py-1"></i>
        
        </div>
        <div className='mx-1 d-none d-sm-block'><text className='mx-1 ' >Liked</text></div>
      
      </div>
    </div>
  )
}

export default Profiletabs
