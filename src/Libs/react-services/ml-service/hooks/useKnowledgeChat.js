import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux'
import { setModel } from '../features/knowledgeDomainSlice';
//create typescript type for the React hook useKnowledgeChat
// type UseKnowledgeChat = (
//   offlineStorage: OfflineStorage,
//   SERVER: { host: string; port: string },
//   query: string,
//   modelName: string
// ) => [any, any, any]
export const useKnowledgeChat = (offlineStorage, SERVER, query, modelName) => {
    const dispatch = useDispatch();
    const model = useSelector((state) => {
        return state && state.crudDomainStore && state.crudDomainStore.model[modelName]
    });
    /**
     * Custom hook for getting a model.
     *
     * @returns {Array} An array containing the error state and the function to set the error state.
     */
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        offlineStorage
            .getItem("jwtToken")
            .then((token) => {
                return axios
                    .get(
                        `${SERVER.host}:${SERVER.port}/${modelName}/chat`,
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