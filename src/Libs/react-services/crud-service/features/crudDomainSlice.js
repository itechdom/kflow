import { createSlice } from '@reduxjs/toolkit'

/**
 * Creates a slice for CRUD operations on a domain model.
 *
 * @typedef {Object} CrudDomainSlice
 * @property {string} name - The name of the slice.
 * @property {Object} initialState - The initial state of the slice.
 * @property {Object} initialState.model - The initial model state.
 * @property {Object} reducers - The reducers for the slice.
 * @property {Function} reducers.setModel - Reducer function to set the model data.
 * @property {Function} reducers.createModel - Reducer function to create a new model.
 * @property {Function} reducers.updateModel - Reducer function to update an existing model.
 * @property {Function} reducers.deleteModel - Reducer function to delete a model.
 * @property {Function} reducers.searchModel - Reducer function to search for models.
 */
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
            state.model[`${action.payload.modelName}_searchModel`] = action.payload.data;
        },
    },
})

// Action creators are generated for each case reducer function
export const { setModel, updateModel, createModel, deleteModel, searchModel } = crudDomainSlice.actions

export default crudDomainSlice.reducer 