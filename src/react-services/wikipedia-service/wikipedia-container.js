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
      {...props,...injected}
    )
    : React.Children.map(children, (child) => {
      return React.cloneElement(child, {...props, ...injected, ...child.props });
    });
  return <React.Fragment>{childrenWithProps}</React.Fragment>;
}

export const Wikipedia = WikiContainerFP;