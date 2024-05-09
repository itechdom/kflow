import React from "react";
import { MainWrapper } from "../Components";
import { mainRouteList, logoutRoute } from "../../Routes";

const Me = ({ classes, routeProps }) => {
  return (
    <MainWrapper
      routeList={mainRouteList}
      onDrawerRouteClick={(route) => {
        if (route.indexOf("http") !== -1) {
          return window.open(route);
        }
        return routeProps.history.push(`${route}`);
      }}
      drawerRouteList={
        this.state.currentUser && this.state.currentUser.isAdmin
          ? [...mainRouteList, logoutRoute]
          : [...mainRouteList, logoutRoute]
      }
      {...routeProps}
      {...this.props}
      isTabMenu={true}
      classes={classes}
      onRouteClick={(route) => {
        if (route.indexOf("http") !== -1) {
          return window.open(route);
        }
        return routeProps.history.push(`${route}`);
      }}
    ></MainWrapper>
  );
};
