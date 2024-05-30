import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   caption:"",
   likes: [],
   comments: [],
   createdAt: Date.now(),
   createdBy:"",
};

const CreatePostsslice = createSlice({
  name: "CreatePosts",
  initialState,
  reducers: {
    CreatePosts: (state, action) => {
      return {
        
        ...action.payload,
      };
    },
    
  },
});

export const { CreatePosts } = CreatePostsslice.actions;
export default CreatePostsslice.reducer;
