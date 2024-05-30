// store.js
import { configureStore } from "@reduxjs/toolkit";
import Useslice from "./Useslice";
import Useprofileslice from "./Useprofileslice";
import Searchuserslice, { SearchProfile } from "./Searchuserslice";
import CreatePostsslice from "./CreatePostsslice";
import FetchPostsslice from "./FetchPostsslice";


// Load initial state from local storage, if available
const persistedState = localStorage.getItem('reduxState') 
  ? JSON.parse(localStorage.getItem('reduxState'))
  : {};

// Initialize store with preloaded state
const store = configureStore({
    reducer:{
        user: Useslice,
        information:Useprofileslice,
        searchinfo:Searchuserslice,
        Posts:CreatePostsslice,
        FetchedPosts:FetchPostsslice,
       
    },
    preloadedState: persistedState
}); 

store.subscribe(() => {
  // Persist Redux state to local storage on every state change
  localStorage.setItem('reduxState', JSON.stringify(store.getState()));
});

export default store;
