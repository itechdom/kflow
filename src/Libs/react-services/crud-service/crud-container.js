import React from "react";
import { useInjectProps } from "./hooks/useInjectedProps";

// TypeScript types
// type CrudContainerFPProps = {
//   modelName: string,
//   children: React.ReactNode,
//   offlineStorage: any,
//   SERVER: { host: string, port: string },
//   query: string,
//   render?: (injectedProps: any) => React.ReactNode,
// };

/**
 * A container component for CRUD operations.
 *
 * @param {CrudContainerFPProps} props - The component props.
 * @returns {React.ReactNode} The rendered component.
 */
export const CrudContainerFP = (props) => {
  const { modelName, children, offlineStorage, SERVER, query, render } = props;
  const injected = useInjectProps(offlineStorage, SERVER, query, modelName);

  const childrenWithProps = React.useMemo(() => {
    return render
      ? render({ ...injected, ...props })
      : React.Children.map(children, (child) => {
          return React.cloneElement(child, {
            ...injected,
            ...props,
            ...child.props,
          });
        });
  }, [children, injected, props, render]);

  return <React.Fragment>{childrenWithProps}</React.Fragment>;
};

export const Crud = CrudContainerFP;