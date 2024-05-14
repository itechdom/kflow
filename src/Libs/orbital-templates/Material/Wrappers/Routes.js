/**
 * Renders a list of routes with icons and names.
 * @param {Object} props - The component props.
 * @param {Function} props.onClick - The click event handler for the routes.
 * @param {number} props.currentRoute - The index of the currently selected route.
 * @param {Array} props.routeList - The list of routes to render.
 * @param {Object} props.classes - The CSS classes for styling the component.
 * @returns {JSX.Element} The rendered Routes component.
 */
import React from "react";
import { ListItem, ListItemText } from "@material-ui/core";

/**
 * Renders an icon with the specified style.
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The content of the icon.
 * @param {Object} props.style - The style object for the icon.
 * @returns {JSX.Element} The rendered Icon component.
 */
const Icon = ({ children, style }) => {
  return (
    <i className="material-icons" style={style}>
      {children}
    </i>
  );
};

/**
 * Renders a list of routes with icons and names.
 * @param {Object} props - The component props.
 * @param {Function} props.onClick - The click event handler for the routes.
 * @param {number} props.currentRoute - The index of the currently selected route.
 * @param {Array} props.routeList - The list of routes to render.
 * @param {Object} props.classes - The CSS classes for styling the component.
 * @returns {JSX.Element} The rendered Routes component.
 */
export const Routes = ({ onClick, currentRoute, routeList, classes }) => {
  return (
    <React.Fragment>
      {routeList.map((route, index) => {
        return (
          <ListItem
            style={{ borderRadius: "50px" }}
            selected={index === currentRoute}
            key={index}
            onClick={(event) => (!route.external ? onClick(route) : "")}
            button={route.type === "button"}
            component={route.type === "button" ? "button" : "a"}
            className={
              route.type === "button"
                ? classes.buttonListitem
                : classes.listItem
            }
          >
            <>
              <Icon style={{ marginRight: "10px" }}>{route.icon}</Icon>
              {!route.external ? (
                <ListItemText primary={route.name} />
              ) : (
                <a href={route.url} target="_blank">
                  <ListItemText primary={route.name} />
                </a>
              )}
            </>
          </ListItem>
        );
      })}
    </React.Fragment>
  );
};
