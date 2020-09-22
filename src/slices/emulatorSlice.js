import { createSlice } from '@reduxjs/toolkit';
import emulator from '../emulator/emulator';

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
        updateRegister(state, action) {
            state.registers[action.payload.name] = action.payload.value;
        },
    },
});

export const selectCode = (state) => state.emulator.code;
export const selectRegisters = (state) => state.emulator.registers;
export const selectRegister = (state, name) => state.emulator.registers[name];

export const { updateCode, updateRegisters, updateRegister } = emulatorSlice.actions;

export default emulatorSlice.reducer;
