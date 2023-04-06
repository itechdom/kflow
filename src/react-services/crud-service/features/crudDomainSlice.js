import { createSlice } from '@reduxjs/toolkit'

export const crudDomainSlice = createSlice({
    name: 'crud',
    initialState: {
        model: {}
    },
    reducers: {
        setModel: (state, action) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.model[action.payload.modelName] = action.payload.data;
        },
        createModel: (state, action) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            let currentData = state.model[action.payload.modelName].data;
            state.model[action.payload.modelName].count = state.model[action.payload.modelName].count + 1;
            currentData.push(action.payload.data);
        },
        updateModel: (state, action) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            let model = state.model[action.payload.modelName].data.find((model) => model._id === action.payload.data._id);
            Object.keys(action.payload.updatedValues).map((key) => {
                model[key] = action.payload.updateValues[key];
            });
            model = action.payload.data;
        }
    },
})

// Action creators are generated for each case reducer function
export const { setModel, updateModel, createModel } = crudDomainSlice.actions

export default crudDomainSlice.reducer 