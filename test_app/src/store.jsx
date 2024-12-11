import { configureStore } from "@reduxjs/toolkit";
import globalDataReducer from "./slices/globalDataSlice";
import testMetaDataReducer from "./slices/testMetaDataSlice";

const store = configureStore({
  reducer: {
    globalData: globalDataReducer,
    testMetaData: testMetaDataReducer,
  },
});

export default store;
