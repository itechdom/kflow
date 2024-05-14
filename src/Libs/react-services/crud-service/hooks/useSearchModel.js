import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from 'react-redux';
import { searchModel } from '../features/crudDomainSlice';
//create typescript type for the React hook useGetModel
// type UseSearchModel = (
//   offlineStorage: OfflineStorage,
//   SERVER: { host: string; port: string },
//   query: string,
//   modelName: string
// ) => [any, any, any];
export const useSearchModel = (offlineStorage, SERVER, query, modelName) => {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  /**
   * Performs a search operation on the specified model.
   *
   * @param {string} query - The search query.
   * @returns {Promise<any>} - A promise that resolves to the search results.
   */
  const searchModelFn = (query) => offlineStorage
    .getItem("jwtToken")
    .then((token) => {
      return axios
        .post(`${SERVER.host}:${SERVER.port}/${modelName}/search`, {
          query,
          token,
        })
        .then((res) => {
          dispatch(searchModel({ data: res.data, modelName }));
          setIsLoading(false);
          return res.data;
        })
        .catch((err) => {
          setError(modelName, err);
          setIsLoading(false);
          return err;
        });
    })
    .catch((err) => {
      return setError(modelName, err);
    });
  return [searchModelFn, error, isLoading];
};