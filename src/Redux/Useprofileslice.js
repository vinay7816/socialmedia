import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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

const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {
    setUserProfile: (state, action) => {
      return {
        ...state,
        ...action.payload,
        isLoading: false,
      };
    },
    updateUserProfile: (state, action) => {
      return {
        ...state,
        followers: action.payload.followers !== undefined ? action.payload.followers : state.followers,
        isLoading: false,
      };
    }
  },
  addPosts:(state,action)=>{
    return{
      ...state,
      ...action.payload,
    }
  }
});

export const { setUserProfile, updateUserProfile,addPosts } = userProfileSlice.actions;
export default userProfileSlice.reducer;
