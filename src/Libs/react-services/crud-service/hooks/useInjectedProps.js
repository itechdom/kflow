import React, { useState, useEffect } from "react";
import { useCreateModel } from "./useCreateModel";
import { useGetModel } from "./useGetModel";
import { useUpdateModel } from "./useUpdateModel";
import { useDeleteModel } from "./useDeleteModel";
import { useSearchModel } from "./useSearchModel";
import { useML } from "./useML";

// TypeScript types
// type UseInjectProps = (
//   offlineStorage: any,
//   SERVER: { host: string; port: string },
//   query: string,
//   modelName: string
// ) => any;

/**
 * Custom hook that injects props related to a specific model.
 *
 * @param {Object} offlineStorage - The offline storage object.
 * @param {string} SERVER - The server URL.
 * @param {Object} query - The query object.
 * @param {string} modelName - The name of the model.
 * @returns {Object} - The injected props object.
 */
export const useInjectProps = (
  offlineStorage,
  SERVER,
  query,
  modelName
) => {
  const [model, error, isLoading] = useGetModel(offlineStorage, SERVER, query, modelName);
  const createModelFn = useCreateModel(offlineStorage, SERVER, query, modelName);
  const updateModelFn = useUpdateModel(offlineStorage, SERVER, query, modelName);
  const deleteModelFn = useDeleteModel(offlineStorage, SERVER, query, modelName);
  const searchModelFn = useSearchModel(offlineStorage, SERVER, query, modelName);
  const useMLFn = useML(offlineStorage, SERVER, query, modelName);

  const injected = React.useMemo(() => ({
    [modelName]: model,
    [`${modelName}_Error`]: error,
    [`${modelName}_loading`]: isLoading,
    [`${modelName}_createModel`]: createModelFn,
    [`${modelName}_updateModel`]: updateModelFn,
    [`${modelName}_deleteModel`]: deleteModelFn,
    [`${modelName}_searchModel`]: searchModelFn,
    [`${modelName}_chat`]: useMLFn,
  }), [model, error, isLoading, createModelFn, updateModelFn, deleteModelFn, searchModelFn, useMLFn]);

  return injected;
};
