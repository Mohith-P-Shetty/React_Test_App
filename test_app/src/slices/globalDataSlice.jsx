import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: null,
  userid: null,
  testid: null,
  currentdate: null,
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
    setCurrentdate: (state, action) => {
      state.currentdate = action.payload;
    },
    resetGlobalData: () => initialState,
  },
});

export const {
  setUserid,
  setTestid,
  setUsername,
  setCurrentdate,
  resetGlobalData,
} = globalDataSlice.actions;

export default globalDataSlice.reducer;
