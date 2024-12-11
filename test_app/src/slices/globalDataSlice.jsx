import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: null,
  userid: null,
  testid: null,
  timer: null,
  isAdmin: false,
};

const globalDataSlice = createSlice({
  name: "globalData",
  initialState,
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setUserid: (state, action) => {
      state.userid = action.payload;
    },
    setTestid: (state, action) => {
      state.testid = action.payload;
    },
    setTimer: (state, action) => {
      state.timer = action.payload;
    },
    setIsAdmin: (state, action) => {
      state.isAdmin = action.payload;
    },
    resetGlobalData: () => initialState,
  },
});

export const {
  setUserid,
  setTestid,
  setUsername,
  setTimer,
  setIsAdmin,
  isAdmin,
  resetGlobalData,
} = globalDataSlice.actions;

export default globalDataSlice.reducer;
