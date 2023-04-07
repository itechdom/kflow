import { createSlice } from '@reduxjs/toolkit'

export const wikiDomainSlice = createSlice({
    name: 'wiki',
    initialState: {
        model: {}
    },
    reducers: {
        setModel: (state, action) => {
            state.model[action.payload.modelName] = action.payload.data;
        }
    },
})

// Action creators are generated for each case reducer function
export const { setModel} = wikiDomainSlice.actions

export default wikiDomainSlice.reducer 