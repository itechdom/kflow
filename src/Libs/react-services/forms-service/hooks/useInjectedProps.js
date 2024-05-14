import React, { useState, useEffect } from "react";
import { useGetForm } from "./useGetForm";
//create typescript type for the React hook useInjectProps
// type UseInjectProps = (
//   offlineStorage: OfflineStorage,
//   SERVER: { host: string; port: string },
//   modelName: string,
//   props: any,
//   query: string
// ) => any;
/**
 * Custom hook that injects props into a component based on the provided model.
 *
 * @param {Object} offlineStorage - The offline storage object.
 * @param {string} SERVER - The server URL.
 * @param {string} query - The query string.
 * @param {string} modelName - The name of the model.
 * @returns {Object} - The injected props object.
 */
export const useInjectProps = (
    offlineStorage,
    SERVER,
    query,
    modelName
) => {
    const [model, error, isLoading] = useGetForm(offlineStorage, SERVER, query, modelName);
    const [injected, setInjected] = useState({});
    useEffect(() => {
        setInjected({
            [`${modelName}_form`]: model,
        });
    }, [model, error, isLoading]);
    return injected;
};