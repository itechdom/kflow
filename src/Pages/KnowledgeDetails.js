import React from "react";
import MainWrapper from "Libs/orbital-templates/Material/Wrappers/MainWrapper";
import Loading from "Libs/orbital-templates/Material/_shared/Loading/Loading";
import { Wikipedia } from "Libs/react-services/wikipedia-service/wikipedia-container";
import { Crud } from "Libs/react-services/crud-service/crud-container";
import KnowledgePreview from "../Knowledge/ModelPreview/ModelPreview";
import { mainRouteList, logoutRoute } from "../Routes";
import config from "../Config";
import { offlineStorage } from "../OfflineStorage";
import rootStore from "../Store/reduxStore";
const logo = "images/logo-no-background.svg";

const KnowledgeDetails = ({ classes, currentUser, tags, selected, ...routeProps }) => {
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
                currentUser && currentUser.isAdmin
                  ? [...mainRouteList, logoutRoute]
                  : [...mainRouteList, logoutRoute]
              }
              user={currentUser}
              {...routeProps}
              onRouteClick={(route) => {
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
                location={routeProps.location}
                currentTags={tags}
                selected={selected}
                currentUser={currentUser}
                // setState={(props) => this.setState(props)}
                model={knowledgeMutable}
                knowledge_updateModel={props.knowledge_updateModel}
                knowledge_deleteModel={props.knowledge_deleteModel}
                knowledge_chat={props.knowledge_chat}
                {...routeProps}
                {...props}
              />
            </MainWrapper>
          );
        }}
      />
    </Wikipedia>
  );
};

export default KnowledgeDetails;
