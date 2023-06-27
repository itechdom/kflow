import { createSlice } from '@reduxjs/toolkit'

export const crudDomainSlice = createSlice({
    name: 'crud',
    initialState: {
        model: {}
    },
    reducers: {
        setModel: (state, action) => {
            state.model[action.payload.modelName] = action.payload.data;
        },
        createModel: (state, action) => {
            let currentData = state.model[action.payload.modelName].data;
            state.model[action.payload.modelName].count = state.model[action.payload.modelName].count + 1;
            currentData.push(action.payload.data);
        },
        updateModel: (state, action) => {
            let model = state.model[action.payload.modelName].data.find((model) => {
                return model._id === action.payload.data._id
            });
            Object.keys(action.payload.updatedValues).map((key) => {
                model[key] = action.payload.updatedValues[key];
            });
        },
        deleteModel: (state, action) => {
            state.model[action.payload.modelName].count = state.model[action.payload.modelName].count - 1;
            state.model[action.payload.modelName].data = state.model[action.payload.modelName].data.filter((model) => {
                return model._id !== action.payload.data._id
            });
        },
        searchModel: (state, action) => {
            state.model[`${action.payload.modelName}_search`] = action.payload.data;
        },
    },
})

// Action creators are generated for each case reducer function
export const { setModel, updateModel, createModel, deleteModel, searchModel } = crudDomainSlice.actions

export default crudDomainSlice.reducer 