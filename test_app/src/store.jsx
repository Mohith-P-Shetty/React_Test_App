import { configureStore } from "@reduxjs/toolkit";
import globalDataReducer from "./slices/globalDataSlice";

const store = configureStore({
  reducer: {
    globalData: globalDataReducer,
  },
});

export default store;
