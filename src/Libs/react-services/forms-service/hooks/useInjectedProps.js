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