import React, { useState, useEffect } from "react";
import axios from "axios";
//create typescript type for the React hook useGetModel
// type UseGetModel = (
//   offlineStorage: OfflineStorage,
//   SERVER: { host: string; port: string },
//   query: string,
//   modelName: string
// ) => [any, any, any];
export const useGetModel = (offlineStorage, SERVER, query, modelName) => {
  const [model, setModel] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    offlineStorage
      .getItem("jwtToken")
      .then((token) => {
        return axios
          .get(
            `${SERVER.host}:${SERVER.port}/${modelName}/paginate/1/10`,
            {
              params: { token, query },
            }
          )
          .then((res) => {
            setModel(res.data);
            setIsLoading(false);

          })
          .catch((err) => {
            setError(modelName, err);
            setIsLoading(false);
          });
      })
      .catch((err) => {
        return setError(modelName, err);
      })
  }, [offlineStorage, SERVER, query, modelName]);
  return [model, error, isLoading];
};