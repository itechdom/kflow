import React from "react";
import { Route } from "react-router-dom";
import { MainWrapper } from "../Components";
import { mainRouteList, logoutRoute } from "../../Routes";
import Loading from "Libs/orbital-templates/Material/_shared/Loading/Loading";
import {
  Crud,
  Forms,
  Media,
  Notification,
} from "Libs/orbital-templates/Material";
import { config } from "../../config";
import { offlineStorage } from "../../offlineStorage";
import { rootStore } from "../../Store/reduxStore";
import { Wikipedia } from "Libs/react-services/wikipedia-service/wikipedia-container";
import KnowledgePreview from "../Knowledge/ModelPreview/ModelPreview";

const logo = "images/logo-no-background.svg";

const KnowledgeDetails = ({ classes }) => {
  <Route
    path={`${this.props.match.path}knowledge/view/:id`}
    render={(routeProps) => {
      const {
        match: { params },
      } = routeProps;
      let query = { _id: params.id };
      return (
        <Wikipedia SERVER={config.SERVER} offlineStorage={offlineStorage}>
          <Crud
            modelName="knowledge"
            SERVER={config.SERVER}
            offlineStorage={offlineStorage}
            notificationDomainStore={rootStore.notificationDomainStore}
            crudDomainStore={rootStore.crudDomainStore}
            paginate={false}
            query={query}
            render={(props) => {
              let knowledge = props.knowledge && props.knowledge.data[0];

              if (!knowledge || props.knowledge_loading) {
                return <Loading></Loading>;
              }
              let knowledgeMutable = JSON.parse(JSON.stringify(knowledge));
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
                  <KnowledgePreview
                    onEdit={(model) => {
                      routeProps.history.push(`//edit/${model._id}`);
                    }}
                    onDelete={() => {
                      routeProps.history.goBack();
                    }}
                    classes={classes}
                    location={this.props.location}
                    currentTags={this.state.tags}
                    selected={this.state.selected}
                    currentUser={this.state.currentUser}
                    setState={(props) => this.setState(props)}
                    model={knowledgeMutable}
                    knowledge_updateModel={props.knowledge_updateModel}
                    knowledge_deleteModel={props.knowledge_deleteModel}
                    {...props}
                  />
                </MainWrapper>
              );
            }}
          />
        </Wikipedia>
      );
    }}
  />;
};

export default KnowledgeDetails;
