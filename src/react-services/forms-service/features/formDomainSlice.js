import { createSlice } from '@reduxjs/toolkit'

export const formDomainSlice = createSlice({
    name: 'form',
    initialState: {
        model: {}
    },
    reducers: {
        setModel: (state, action) => {
            state.model[action.payload.modelName] = action.payload.data;
        },
    },
})

// Action creators are generated for each case reducer function
export const { setModel } = formDomainSlice.actions

export default formDomainSlice.reducer 