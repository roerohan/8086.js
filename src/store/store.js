import { configureStore } from '@reduxjs/toolkit';
import codeReducer from '../slices/codeSlice';

export default configureStore({
    reducer: {
        code: codeReducer,
    },
});
