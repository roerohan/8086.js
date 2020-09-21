import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    code: '',
};

const codeSlice = createSlice({
    name: 'code',
    initialState,
    reducers: {
        updateCode(state, action) {
            state.code = action.payload;
        },
    },
});

export default codeSlice.reducer;
