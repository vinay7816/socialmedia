import { createSlice } from '@reduxjs/toolkit';
import React from 'react'


  const initialState={
    uid: null,
    email: null,
    username: null,
    fullname: null,
    bio: "",
    profilePicURL: "",
    followers: [],
    following: [],
    posts: [],
    createdAt: Date.now(),
    isLoading: true,
  };
  const Searchuserslice = createSlice({
    name: 'SearchProfile',
    initialState,
     reducers: {
    SearchProfile: (state, action) => {
      return {
        ...state,
        ...action.payload,
        isLoading: false,
      };
    },
    removeSearch:(state)=>{
      return initialState;
      
    }
}
  })

  export const { SearchProfile,removeSearch} = Searchuserslice.actions;
export default Searchuserslice.reducer;
