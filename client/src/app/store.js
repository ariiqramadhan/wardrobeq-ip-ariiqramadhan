import { configureStore } from "@reduxjs/toolkit";

import userReducer from './userSlice';
import catReducer from './catSlice';
import aiReducer from './aiSlice';
import itemReducer from './itemSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        cat: catReducer,
        ai: aiReducer,
        item: itemReducer
    }
});