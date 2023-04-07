import React, { useState, useEffect } from "react";
import { useFetchWikipediaPageByTopic } from "./useFetchWikipediaPageByTopic";

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
    const [fetchWikipediaPageByTopic, model, error, isLoading] = useFetchWikipediaPageByTopic(offlineStorage, SERVER, query, modelName);
    const [injected, setInjected] = useState({});
    useEffect(() => {
        setInjected({
            [modelName]: model,
            [`${modelName}_fetchWikipediaPageByTopic`]: fetchWikipediaPageByTopic,
            [`${modelName}_Error`]: error,
            [`${modelName}_loading`]: isLoading
        });
    }, [model, error, isLoading]);
    return injected;
};