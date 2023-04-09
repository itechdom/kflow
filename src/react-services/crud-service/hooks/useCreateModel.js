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
export const useCreateModel = (offlineStorage, SERVER, query, modelName) => {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const createModelFn = (model) => offlineStorage
    .getItem("jwtToken")
    .then((token) => {
      return axios
        .post(`${SERVER.host}:${SERVER.port}/${modelName}/create`, {
          model,
          token,
        })
        .then((res) => {
          dispatch(createModel({ data: model, modelName }));
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
  return [createModelFn, error, isLoading];
};