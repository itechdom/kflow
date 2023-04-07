import React from "react";
import { useInjectProps } from "./hooks/useInjectedProps";

export const WikiContainerFP = (props) => {
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

export const Wikipedia = WikiContainerFP;