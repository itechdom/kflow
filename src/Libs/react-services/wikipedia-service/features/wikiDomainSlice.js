import { createSlice } from '@reduxjs/toolkit'

/**
 * Redux slice for managing the wiki domain state.
 *
 * @typedef {Object} WikiDomainState
 * @property {any} data - The wiki domain data.
 */
export const wikiDomainSlice = createSlice({
    name: 'wiki',
    initialState: {
        data: null
    },
    reducers: {
        /**
         * Sets the wiki domain model data.
         *
         * @param {WikiDomainState} state - The current state.
         * @param {import("@reduxjs/toolkit").PayloadAction<{ data: any }>} action - The action containing the payload.
         */
        setModel: (state, action) => {
            state.data = action.payload.data;
        }
    },
})

// Action creators are generated for each case reducer function
/**
 * Sets the model for the wiki domain slice.
 * @param {Object} model - The model to set.
 */
export const { setModel } = wikiDomainSlice.actions

export default wikiDomainSlice.reducer 