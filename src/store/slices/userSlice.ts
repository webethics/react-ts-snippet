import { createSlice } from "@reduxjs/toolkit";

interface userInfoType {
    isLoggedIn: boolean;
    userInfo: {
        _id: string;
        is_updated: string;
        sign_in_method: string;
    };
}

const initialState: userInfoType = {
    isLoggedIn: false,
    userInfo: {
        _id: "",
        is_updated: "",
        sign_in_method: "",
    },
};

const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {
        userLoggedIn(state, action) {
            state.isLoggedIn = action.payload;
        },
        userInfo(state, action) {
            state.userInfo = action.payload;
        },
    },
});
export const userActions = userSlice.actions;
export default userSlice;
