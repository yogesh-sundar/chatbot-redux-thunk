import { configureStore } from "@reduxjs/toolkit";
import { chatReducer } from "./Reducer/reducers";

export const store = configureStore({reducer:{
    data: chatReducer
}})