import React from "react";
import { Route } from "react-router-dom";
import { MainWrapper } from "../Components";
import { mainRouteList, logoutRoute } from "../../Routes";
import {
  Crud,
  Forms,
  Media,
  Notification,
  Profile as ProfileComponent,
} from "Libs/orbital-templates/Material";
import { config } from "../../config";
import { offlineStorage } from "../../offlineStorage";
import { rootStore } from "../../Store/reduxStore";

const Me = ({ classes }) => {
  return (
    <Route
      path={`${this.props.match.path}me`}
      render={(routeProps) => {
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
          >
          </MainWrapper>
        );
      }}
    ></Route>
  );
};
