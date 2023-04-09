import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux'
import { setModel } from '../features/wikiDomainSlice';
//create typescript type for the React hook useGetModel
// type UseGetModel = (
//   offlineStorage: OfflineStorage,
//   SERVER: { host: string; port: string },
//   query: string,
//   modelName: string
// ) => [any, any, any];
const testHtml = (title) => {
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
    return title && title.match(regex);
};
export const useFetchWikipediaPageByTopic = (offlineStorage, SERVER, query, modelName) => {
    const dispatch = useDispatch();
    const model = useSelector((state) => state.wikiDomainStore.model[modelName]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const fetchWikipediaPageByTopic = (topic) => offlineStorage.getItem("jwtToken").then((token) => {
        setIsLoading(true);
        return axios({
            url: `${SERVER.wikipedia.host}`,
            method: "get",
            params: {
                action: "opensearch",
                format: "json",
                search: topic,
                origin: "*",
            },
        })
            .then((res) => {
                const formattedData = res.data
                    .map((d) => {
                        if (Array.isArray(d)) {
                            if (testHtml(d[0])) {
                                return d;
                            }
                        }
                        return;
                    })
                    .filter((d) => d)[0];
                setIsLoading(false);
                dispatch(setModel({ data: formattedData, modelName }));
            })
            .catch((err) => {
                setIsLoading(false);
                return setError(err);
            });
    });
    return [fetchWikipediaPageByTopic, model, error, isLoading];
};