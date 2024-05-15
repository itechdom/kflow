import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';
import { setModel } from '../features/crudDomainSlice';

// TypeScript types
// type UseGetModel = (
//   offlineStorage: any,
//   SERVER: { host: string; port: string },
//   query: string,
//   modelName: string
// ) => [any, any, boolean];

/**
 * Custom hook for getting a model.
 *
 * @returns {Array} An array containing the model data, error state, and loading state.
 */
export const useGetModel= (offlineStorage, SERVER, query, modelName) => {
  const dispatch = useDispatch();
  const model = useSelector((state) => state?.crudDomainStore?.model[modelName]);

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await offlineStorage.getItem("jwtToken");
        const response = await axios.get(
          `${SERVER.host}:${SERVER.port}/${modelName}`,
          { params: { token, query } }
        );
        dispatch(setModel({ data: response.data, modelName }));
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [offlineStorage, SERVER.host, SERVER.port, query, modelName, dispatch]);

  return [model, error, isLoading];
};
