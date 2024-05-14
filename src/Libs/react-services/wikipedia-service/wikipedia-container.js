import React from "react";
import { useInjectProps } from "./hooks/useInjectedProps";

/**
 * A container component for rendering Wikipedia-related content.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.offlineStorage - The offline storage object.
 * @param {string} props.SERVER - The server URL.
 * @param {string} props.query - The search query.
 * @param {Function} props.render - The render function for custom rendering.
 * @returns {JSX.Element} The rendered component.
 */
export const WikiContainerFP = (props) => {
  const {
    children,
    offlineStorage,
    SERVER,
    query,
    render
  } = props;
  const injected = useInjectProps(offlineStorage, SERVER, query);
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