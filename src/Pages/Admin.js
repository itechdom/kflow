import React from "react";
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
const logo = "images/logo-no-background.svg";

const Admin = ({ classes, location, match, history }) => {
  const routeProps = { location, match, history };
  return (
    <MainWrapper
      onRouteClick={(route) => {
        if (route.indexOf("http") !== -1) {
          return window.open(route);
        }
        return history.push(`${route}`);
      }}
      onDrawerRouteClick={(route) => {
        if (route.indexOf("http") !== -1) {
          return window.open(route);
        }
        return history.push(`${route}`);
      }}
      routeList={
        this.state.currentUser && this.state.currentUser.isAdmin
          ? [...mainRouteList]
          : [...mainRouteList]
      }
      drawerRouteList={
        this.state.currentUser && this.state.currentUser.isAdmin
          ? [...mainRouteList, logoutRoute]
          : [...mainRouteList, logoutRoute]
      }
      location={location}
      match={match}
      logo={logo}
      history={history}
      hasPadding={true}
      onLogout={this.onLogout}
      classes={{
        ...classes,
        tabMenu: `${classes["white"]}`,
        hasPadding: `${classes["top50"]} ${classes["bottom50"]}`,
        title: `${classes["white"]}`,
        addButton: `${classes["bold"]}`,
        menuTabsClasses: {
          flexContainer: `${classes["center"]}`,
        },
      }}
    >
      <Crud
        modelName="knowledge"
        SERVER={config.SERVER}
        offlineStorage={offlineStorage}
        notificationDomainStore={rootStore.notificationDomainStore}
        crudDomainStore={rootStore.crudDomainStore}
      >
        <Crud
          modelName="users"
          SERVER={config.SERVER}
          offlineStorage={offlineStorage}
          notificationDomainStore={rootStore.notificationDomainStore}
          crudDomainStore={rootStore.crudDomainStore}
        >
          <Forms
            modelName="knowledge"
            formsDomainStore={rootStore.formsDomainStore}
          >
            <Media
              extension="image/jpg"
              mediaDomainStore={rootStore.mediaDomainStore}
            >
              <Notification
                notificationDomainStore={rootStore.notificationDomainStore}
              >
                <Admin classes={classes} {...routeProps} />
              </Notification>
            </Media>
          </Forms>
        </Crud>
      </Crud>
    </MainWrapper>
  );
};
