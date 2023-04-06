import React, { useState, useEffect } from "react";
import { useCreateModel } from "./useCreateModel";
import { useGetModel } from "./useGetModel";
import { useUpdateModel } from "./useUpdateModel";
import { useDeleteModel } from "./useDeleteModel";
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
    const [model, error, isLoading] = useGetModel(offlineStorage, SERVER, query, modelName);
    const [createModelFn] = useCreateModel(offlineStorage, SERVER, query, modelName);
    const [updateModelFn] = useUpdateModel(offlineStorage, SERVER, query, modelName);
    const [deleteModelFn] = useDeleteModel(offlineStorage, SERVER, query, modelName);
    const [injected, setInjected] = useState({});
    useEffect(() => {
        setInjected({
            [modelName]: model,
            [`${modelName}_Error`]: error,
            [`${modelName}_loading`]: isLoading,
            [`${modelName}_createModel`]: createModelFn,
            [`${modelName}_updateModel`]: updateModelFn,
            [`${modelName}_deleteModel`]: deleteModelFn
        });
    }, [model, error, isLoading]);
    return injected;
};