import { configureStore } from '@reduxjs/toolkit';
import emulatorReducer from 'slices/emulatorSlice';

export default configureStore({
    reducer: {
        emulator: emulatorReducer,
    },
});
