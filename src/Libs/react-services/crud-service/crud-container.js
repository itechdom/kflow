import React from "react";
import { useInjectProps } from "./hooks/useInjectedProps";

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
  const injected = useInjectProps(offlineStorage, SERVER, query, modelName);
  const childrenWithProps = render
    ? render(
      { ...injected, ...props }
    )
    : React.Children.map(children, (child) => {
      return React.cloneElement(child, { ...injected, ...props, ...child.props });
    });
  return <React.Fragment>{childrenWithProps}</React.Fragment>;
}

export const Crud = CrudContainerFP;