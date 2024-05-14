import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux'
import { setModel } from '../features/formDomainSlice';
//create typescript type for the React hook useGetModel
// type UseGetModel = (
//   offlineStorage: OfflineStorage,
//   SERVER: { host: string; port: string },
//   query: string,
//   modelName: string
// ) => [any, any, any];
/**
 * Custom hook for fetching form data from the server.
 *
 * @param {Object} offlineStorage - The offline storage object.
 * @param {Object} SERVER - The server configuration object.
 * @param {string} query - The query string for filtering the form data.
 * @param {string} modelName - The name of the model associated with the form.
 * @returns {Array} - An array containing the form model, error, and loading state.
 */
export const useGetForm = (offlineStorage, SERVER, query, modelName) => {
    const dispatch = useDispatch();
    const model = useSelector((state) => state.formDomainStore.model[modelName]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        offlineStorage
            .getItem("jwtToken")
            .then((token) => {
                return axios
                    .get(
                        `${SERVER.host}:${SERVER.port}/${modelName}/forms`,
                        {
                            params: { token, query },
                        }
                    )
                    .then((res) => {
                        dispatch(setModel({ data: res.data, modelName }));
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