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
/**
 * A container component for CRUD operations.
 *
 * @param {Object} props - The component props.
 * @param {string} props.modelName - The name of the model.
 * @param {React.ReactNode} props.children - The child components.
 * @param {Object} props.offlineStorage - The offline storage object.
 * @param {string} props.SERVER - The server URL.
 * @param {Object} props.query - The query object.
 * @param {Function} props.render - The render function.
 * @returns {React.ReactNode} The rendered component.
 */
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