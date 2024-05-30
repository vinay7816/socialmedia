import React from 'react'
import { useSelector } from 'react-redux';
import logo from "../assets/logo.png"

const Navbar = () => {
    
  return (
    <>
      <div class="container-lg my-4">
    <div class="d-flex justify-content-between align-items-center">
      <img src={logo} alt="Logo" height="80" class="d-none d-sm-block" style={{cursor: "pointer"}}/>
      <div class="d-flex gap-4">
        <a href="/auth" class="btn btn-primary btn-sm">Login</a>
        <a href="/auth" class="btn btn-outline-primary btn-sm">Signup</a>
      </div>
    </div>
  </div>
    </>
  )
}

export default Navbar
