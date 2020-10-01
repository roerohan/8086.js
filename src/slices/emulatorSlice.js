import { createSlice } from '@reduxjs/toolkit';
import emulator from 'emulator/emulator';

const initialState = {
    registers: emulator.getRegisters(),
    memory: emulator.getMemory(),
    code: '',
    error: {
        isRaised: false,
    },
    theme: 'dracula',
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
        raiseError(state, action) {
            state.error = { isRaised: true, ...action.payload };
        },
        clearError(state) {
            state.error = { isRaised: false };
        },
        setTheme(state, action) {
            state.theme = action.payload;
        },
    },
});

export const selectState = (state) => state.emulator;
export const selectCode = (state) => state.emulator.code;
export const selectMemory = (state) => state.emulator.memory;
export const selectRegisters = (state) => state.emulator.registers;
export const selectError = (state) => state.emulator.error;
export const selectTheme = (state) => state.emulator.theme;

export const {
    updateCode,
    updateRegisters,
    updateMemory,
    raiseError,
    clearError,
    setTheme,
} = emulatorSlice.actions;

export default emulatorSlice.reducer;
