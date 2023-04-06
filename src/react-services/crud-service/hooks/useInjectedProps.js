import React, { useState, useEffect } from "react";
import axios from "axios";
import { useGetModel } from "./hooks/useGetModel";
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
  const [injected, setInjected] = useState({});
  useEffect(() => {
    setInjected({
      [modelName]: model,
      [`${modelName}_Error`]: error,
      [`${modelName}_Loading`]: isLoading,
    });
  }, [model, error, isLoading]);
  return injected;
};