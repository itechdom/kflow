import React, { useState, useEffect } from "react";
import axios from "axios";

//create typescript type for the React hook useGetModel
// type UseGetModel = (
//   offlineStorage: OfflineStorage,
//   SERVER: { host: string; port: string },
//   query: string,
//   modelName: string
// ) => [any, any];
export const useGetModel = (offlineStorage, SERVER, query, modelName) => {
  const [model, setModel] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    offlineStorage
      .getItem("jwtToken")
      .then((token) => {
        return axios
          .get(
            `${SERVER.host}:${SERVER.port}/${modelName}/paginate/1/10`,
            {
              params: { token, query },
            }
          )
          .then((res) => {
            setModel(res.data);
          })
          .catch((err) => {
            setError(modelName, err);
          });
      })
      .catch((err) => {
        return setError(modelName, err);
      })
  }, [offlineStorage, SERVER, query, modelName]);
  return [model, error];
};

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
  modelName,
  props,
  query
) => {
  const [model, error] = useGetModel(offlineStorage, SERVER, query, modelName);
  const [injected, setInjected] = useState({});
  useEffect(() => {
    setInjected({
      ...props,
      [modelName]: model,
      [`${modelName}Error`]: error,
    });
  }, [props, model, error]);
  return injected;
};

//create typescript type for the React component CrudContainerFP
// type CrudContainerFP = (props: any) => JSX.Element;
//create typescript type for the CrudContainerFP props
// type CrudContainerFPProps = {
//   modelName: string;
//   children: any;
//   offlineStorage: OfflineStorage;
//   SERVER: { host: string; port: string };
//   query: string;
//   render: any;
// };
export const CrudContainerFP = (props) => {
  const {
    modelName,
    children,
    offlineStorage,
    SERVER,
    query,
    render
  } = props;
  const injected = useInjectProps(offlineStorage, SERVER, modelName, props, query);
  const childrenWithProps = render
    ? render(
      injected
    )
    : React.Children.map(children, (child) => {
      return React.cloneElement(child, { ...injected });
    });
  return <React.Fragment>{childrenWithProps}</React.Fragment>;
}

export const Crud = CrudContainerFP;