import { createSlice } from '@reduxjs/toolkit';

import Emulator from '../emulator/emulator';

const emulator = new Emulator();

const initialState = {
    emulator,
};

const emulatorSlice = createSlice({
    name: 'emulator',
    initialState,
});

export const selectEmulator = (state) => state.emulator.emulator;

export default emulatorSlice.reducer;
