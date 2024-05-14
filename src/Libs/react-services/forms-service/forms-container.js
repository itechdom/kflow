import React, { useState, useEffect } from "react";
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
 * FormsContainerFP component is responsible for rendering a  that injects props to its children components.
 *
 * @param {Object} props - The component props.
 * @param {string} props.modelName - The name of the model.
 * @param {ReactNode} props.children - The child components to be rendered.
 * @param {Object} props.offlineStorage - The offline storage object.
 * @param {string} props.SERVER - The server URL.
 * @param {string} props.query - The query string.
 * @param {Function} props.render - The render function to be used instead of mapping children.
 * @returns {ReactNode} The rendered container component with injected props.
 */
export const FormsContainerFP = (props) => {
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
            injected
        )
        : React.Children.map(children, (child) => {
            return React.cloneElement(child, { ...injected });
        });
    return <React.Fragment>{childrenWithProps}</React.Fragment>;
}

export const Forms = FormsContainerFP;