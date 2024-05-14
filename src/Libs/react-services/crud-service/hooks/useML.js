import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { createModel } from "../features/crudDomainSlice";
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
export const useML = (offlineStorage, SERVER, query, modelName) => {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Function for creating a model.
   *
   * @param {Object} model - The model object to be created.
   * @returns {Promise} - A promise that resolves when the model is created.
   */
  const useMLFn = (model, path, onResponse) =>
    offlineStorage
      .getItem("jwtToken")
      .then((token) => {
        return axios
          .post(`${SERVER.host}:${SERVER.port}/${modelName}/chat`, {
            prompt: `complete this object with four levels of knowledge. only return output in json. don't include \`\`\`json in your response. don't include original object in your response. ${JSON.stringify(
              path
            )}`,
            token,
          })
          .then((res) => {
            dispatch(createModel({ data: model, modelName }));
            //check nulls
            if (res.data && res.data.choices[0] && res.data.choices[0].message.content) {
              let response = res.data.choices[0].message.content;
              //strip all \n and \
              response = response.replace(/\\n/g, "").replace(/\\/g, "");
              console.log("PARSED RESPONSE", JSON.parse(response));
              onResponse(JSON.parse(response));
            }
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

  return [useMLFn, error, isLoading];
};
