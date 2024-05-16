import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';
import { createModel } from '../features/crudDomainSlice';
//create typescript type for the React hook useGetModel
// type UseGetModel = (
//   offlineStorage: OfflineStorage,
//   SERVER: { host: string; port: string },
//   query: string,
//   modelName: string
// ) => [any, any, any];
/**
 * Custom hook for creating a model.
 *
 * @param {Object} offlineStorage - The offline storage object.
 * @param {Object} SERVER - The server configuration object.
 * @param {string} query - The query string.
 * @param {string} modelName - The name of the model.
 * @returns {Array} - An array containing the createModel function, error state, and isLoading state.
 */
export const useCreateModel = (offlineStorage, SERVER, query, modelName) => {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Function for creating a model.
   *
   * @param {Object} model - The model object to be created.
   * @returns {Promise} - A promise that resolves when the model is created.
   */
  const createModelFn = (model, onCreate) => offlineStorage
    .getItem("jwtToken")
    .then((token) => {
      return axios
        .post(`${SERVER.host}:${SERVER.port}/${modelName}/create`, {
          model,
          token,
        })
        .then((res) => {
          dispatch(createModel({ data: res.data, modelName }));
          setIsLoading(false);
          if(onCreate) onCreate(res.data);
        })
        .catch((err) => {
          setError(modelName, err);
          setIsLoading(false);
        });
    })
    .catch((err) => {
      return setError(modelName, err);
    });

  return [createModelFn, error, isLoading];
};