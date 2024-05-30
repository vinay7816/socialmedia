import React from 'react'
import Home from './Home'
import Search from './Search'
import Notifications from './Notifications'
import Createposts from './Createposts'
import Profile from './Profile'

const SidebarItems = () => {
  return (
    <div>
      <Home/>
      <Search/>
      <Notifications/>
      <Createposts/>
      <Profile/>
    </div>
  )
}

export default SidebarItems
