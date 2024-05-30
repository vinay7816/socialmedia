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
}

const Useslice = createSlice({
    name: "details",
    initialState,
    reducers: {
        loginUser(state, action) {
            return {
                ...state,
                ...action.payload,
                isLoading: false, 
            };
        },
        logoutuser(state){
            return initialState;
        },
        updateauthuser(state, action) {
            return {
                ...state,
                following: action.payload.following !== undefined ? action.payload.following : state.following,
                isLoading: false,
            };
        }
    }
});

export const { loginUser, logoutuser, updateauthuser } = Useslice.actions;
export default Useslice.reducer;
