import { createSlice } from '@reduxjs/toolkit'

export const wikiDomainSlice = createSlice({
    name: 'wiki',
    initialState: {
        data: null
    },
    reducers: {
        setModel: (state, action) => {
            state.data = action.payload.data;
        }
    },
})

// Action creators are generated for each case reducer function
export const { setModel } = wikiDomainSlice.actions

export default wikiDomainSlice.reducer 