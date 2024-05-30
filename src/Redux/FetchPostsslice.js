import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const FetchPostsslice = createSlice({
  name: "CreatePosts",
  initialState,
  reducers: {
    FetchPosts: (state, action) => {
      return action.payload 
    },
    addFetchPost: (state, action) => {
      return [...state, action.payload]; 
    },
    addFetchComments:(state,action)=>{
      return state.map(post => 
        post.id === action.payload.postId 
          ? { ...post, comments: [...post.comments, ...action.payload.comments] } 
          : post
      );
    },
    Clear: () => initialState,
    deletePost: (state, action) => {
      return state.filter(FetchedPosts=>FetchedPosts.id!== action.payload);
    }
  },
});

export const { FetchPosts, Clear, deletePost,addFetchPost,addFetchComments} = FetchPostsslice.actions;

export default FetchPostsslice.reducer;
