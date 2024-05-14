import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';
import { updateModel } from '../features/crudDomainSlice';
//create typescript type for the React hook useGetModel
// type UseGetModel = (
//   offlineStorage: OfflineStorage,
//   SERVER: { host: string; port: string },
//   query: string,
//   modelName: string
// ) => [any, any, any];
/**
 * Custom hook for updating a model.
 *
 * @param {Object} offlineStorage - The offline storage object.
 * @param {Object} SERVER - The server configuration object.
 * @param {string} query - The query string.
 * @param {string} modelName - The name of the model.
 * @returns {[Function, Object, boolean]} - An array containing the updateModel function, error object, and isLoading boolean.
 */
export const useUpdateModel = (offlineStorage, SERVER, query, modelName) => {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const updateModelFn = (model, updatedValues) => offlineStorage
    .getItem("jwtToken")
    .then((token) => {
      return axios
        .put(`${SERVER.host}:${SERVER.port}/${modelName}`, {
          model: { ...model, ...updatedValues },
          token,
        })
        .then((res) => {
          dispatch(updateModel({ data: model, updatedValues, modelName }));
          setIsLoading(false);
        })
        .catch((err) => {
          setError(modelName, err);
          setIsLoading(false);
        });
    })
    .catch((err) => {
      return setError(modelName, err);
    });
  return [updateModelFn, error, isLoading];
};