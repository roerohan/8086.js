import { createSlice } from '@reduxjs/toolkit';
import emulator from 'emulator/emulator';

const initialState = {
    registers: emulator.getRegisters(),
    memory: emulator.getMemory(),
    code: '',
};

const emulatorSlice = createSlice({
    name: 'emulator',
    initialState,
    reducers: {
        updateCode(state, action) {
            state.code = action.payload;
        },
        updateRegisters(state, action) {
            state.registers = action.payload;
        },
        updateMemory(state, action) {
            state.memory = action.payload;
        },
    },
});

export const selectCode = (state) => state.emulator.code;
export const selectMemory = (state) => state.emulator.memory;
export const selectRegisters = (state) => state.emulator.registers;

export const { updateCode, updateRegisters, updateMemory } = emulatorSlice.actions;

export default emulatorSlice.reducer;
