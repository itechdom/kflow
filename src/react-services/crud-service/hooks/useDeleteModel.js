import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';
import { deleteModel } from '../features/crudDomainSlice';
//create typescript type for the React hook useGetModel
// type UseGetModel = (
//   offlineStorage: OfflineStorage,
//   SERVER: { host: string; port: string },
//   query: string,
//   modelName: string
// ) => [any, any, any];
export const useDeleteModel = (offlineStorage, SERVER, query, modelName) => {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const deleteModelFn = (model) => offlineStorage
    .getItem("jwtToken")
    .then((token) => {
      return axios
        .delete(
          `${SERVER.host}:${SERVER.port}/${modelName}/${model._id}`,
          {
            params: { token },
          }
        )
        .then((res) => {
          dispatch(deleteModel({ data: model }));
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
  return [deleteModelFn, error, isLoading];
};