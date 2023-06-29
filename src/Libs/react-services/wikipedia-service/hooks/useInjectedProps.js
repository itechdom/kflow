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
    query
) => {
    const [fetchWikipediaPageByTopic, model, error, isLoading] = useFetchWikipediaPageByTopic(offlineStorage, SERVER, query);
    const [injected, setInjected] = useState({});
    useEffect(() => {
        console.log("WIKI", model);
        setInjected({
            [`wiki`]: model,
            [`fetchWikipediaPageByTopic`]: fetchWikipediaPageByTopic,
            [`wiki_Error`]: error,
            [`wiki_loading`]: isLoading
        });
    }, [model, error, isLoading]);
    return injected;
};