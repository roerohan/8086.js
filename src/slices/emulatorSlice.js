import { createSlice } from '@reduxjs/toolkit';

import Emulator from '../emulator/emulator';

const emulator = new Emulator();

const initialState = {
    emulator,
    code: '',
};

const emulatorSlice = createSlice({
    name: 'emulator',
    initialState,
    reducers: {
        updateCode(state, action) {
            state.code = action.payload;
        },
    },
});

export const selectEmulator = (state) => state.emulator.emulator;
export const selectCode = (state) => state.emulator.code;

export default emulatorSlice.reducer;
