import React from "react";
import { Route } from "react-router-dom";
import { MainWrapper } from "../Components";
import { mainRouteList, logoutRoute } from "../../Routes";
import { Crud, Forms, Media, Notification, Profile as ProfileComponent } from "Libs/orbital-templates/Material";
import { config } from "../../config";
import { offlineStorage } from "../../offlineStorage";
import { rootStore } from "../../Store/reduxStore";

const Profile = ({ classes }) => {
  return <Route
    path="/profile"
    render={({ location, match, history }) => {
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
          isTabMenu={true}
          drawerRouteList={[...mainRouteList, logoutRoute]}
          classes={classes}
          routeList={mainRouteList}
          location={location}
          match={match}
          history={history}
          hasPadding={true}
          onLogout={this.onLogout}
        >
          <Crud
            modelName="users"
            SERVER={config.SERVER}
            offlineStorage={offlineStorage}
            notificationDomainStore={rootStore.notificationDomainStore}
            crudDomainStore={rootStore.crudDomainStore}
          >
            <Forms formsDomainStore={rootStore.formsDomainStore}>
              <Media
                extension="image/jpg"
                mediaDomainStore={rootStore.mediaDomainStore}
              >
                <Notification
                  notificationDomainStore={rootStore.notificationDomainStore}
                >
                  <ProfileComponent
                    user={this.state.currentUser}
                    formsDomainStore={rootStore.formsDomainStore}
                    location={location}
                    match={match}
                    history={history}
                  />
                </Notification>
              </Media>
            </Forms>
          </Crud>
        </MainWrapper>
      );
    }}
  />;
};

export default Profile;