import React, { useState, useEffect } from "react";
import { useKnowledgeChat } from "./useKnowledgeChat";
//create typescript type for the React hook useInjectProps
// type UseInjectProps = (
//   offlineStorage: OfflineStorage,
//   SERVER: { host: string; port: string },
//   modelName: string,
//   props: any,
//   query: string
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
export const useInjectProps = (offlineStorage, SERVER, query, modelName) => {
  const [knowledgeChatFn, error, isLoading] = useKnowledgeChat(
    offlineStorage,
    SERVER,
    query,
    modelName
  );
  const [injected, setInjected] = useState({});
  useEffect(() => {
    setInjected({
      [`${modelName}_Error`]: error,
      [`${modelName}_loading`]: isLoading,
      [`knowledgeChat`]: knowledgeChatFn,
    });
  }, [error, isLoading]);
  return injected;
};
