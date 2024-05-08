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
import Loading from "Libs/orbital-templates/Material/_shared/Loading/Loading";
import Wikipedia from "Libs/react-services/wikipedia-service/wikipedia-container";
import Knowledge from "./Knowledge/Knowledge";
import { config } from "../../config";
import { offlineStorage } from "../../offlineStorage";
import { rootStore } from "../../Store/reduxStore";
const logo = "images/logo-no-background.svg";

const KnowledgeList = ({ classes }) => {
  return (
    <Route
      path={`${this.props.match.path}`}
      render={(routeProps) => {
        const {
          match: { params },
        } = routeProps;
        let query = { _id: params.id };
        return (
          <Crud
            modelName="knowledge"
            SERVER={config.SERVER}
            offlineStorage={offlineStorage}
            notificationDomainStore={rootStore.notificationDomainStore}
            crudDomainStore={rootStore.crudDomainStore}
            paginate={false}
            query={query}
            render={(props) => {
              let knowledge = props.knowledge;
              console.log("KNowldge search model", props);
              if (!knowledge || props.knowledge_loading) {
                return <Loading></Loading>;
              }
              return (
                <MainWrapper
                  logo={logo}
                  routeList={[
                    {
                      url: "all",
                      name: "All",
                      icon: "",
                    },
                  ]}
                  drawerRouteList={
                    this.state.currentUser && this.state.currentUser.isAdmin
                      ? [...mainRouteList, logoutRoute]
                      : [...mainRouteList, logoutRoute]
                  }
                  user={this.state.currentUser}
                  {...routeProps}
                  {...this.props}
                  onRouteClick={(route) => {
                    this.setState({
                      tags: new Set([]),
                    });
                    if (route.indexOf("http") !== -1) {
                      return window.open(route);
                    }
                    return routeProps.history.push(`${route}`);
                  }}
                  classes={{
                    ...classes,
                    tabMenu: `${classes["white"]}`,
                    menuTabsClasses: {
                      flexContainer: `${classes["center"]}`,
                    },
                  }}
                >
                  <Wikipedia
                    SERVER={config.SERVER}
                    offlineStorage={offlineStorage}
                    notificationDomainStore={rootStore.notificationDomainStore}
                  >
                    <Knowledge
                      onEdit={(model) => {
                        routeProps.history.push(`//edit/${model._id}`);
                      }}
                      onDelete={() => {
                        routeProps.history.goBack();
                      }}
                      match={routeProps.match}
                      history={routeProps.history}
                      classes={classes}
                      location={this.props.location}
                      currentTags={this.state.tags}
                      selected={this.state.selected}
                      currentUser={this.state.currentUser}
                      setState={(props) => this.setState(props)}
                      model={knowledge}
                      loading={props.knowledge_loading}
                      knowledge={knowledge}
                      knowledge_updateModel={props.knowledge_updateModel}
                      knowledge_deleteModel={props.knowledge_deleteModel}
                      knowledge_searchModel={props.knowledge_searchModel}
                    />
                  </Wikipedia>
                </MainWrapper>
              );
            }}
          />
        );
      }}
    />
  );
};
