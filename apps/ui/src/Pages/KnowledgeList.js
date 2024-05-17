import React from "react";
import { Forms } from "Libs/react-services/forms-service/forms-container"; // update with the correct path
import { Crud } from "Libs/react-services/crud-service/crud-container";
import MainWrapper from "Libs/orbital-templates/Material/Wrappers/MainWrapper";
import Loading from "Libs/orbital-templates/Material/_shared/Loading/Loading";
import { Wikipedia } from "Libs/react-services/wikipedia-service/wikipedia-container";
import { mainRouteList, logoutRoute } from "../Routes";
import Knowledge from "../Knowledge/Knowledge";
import config from "../Config/index";
import { offlineStorage } from "../OfflineStorage";
import rootStore from "../Store/reduxStore";
const logo = "images/logo-no-background.svg";

const KnowledgeList = ({ classes, currentUser, tags, selected, ...routeProps }) => {
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
      render={(crudProps) => {
        let knowledge = crudProps.knowledge;
        if (!knowledge || crudProps.knowledge_loading) {
          return <Loading />;
        }
        return (
          <Forms
            modelName="knowledge"
            SERVER={config.SERVER}
            offlineStorage={offlineStorage}
            query={query}
            render={(formsProps) => (
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
                {...routeProps}
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
                    location={routeProps.location}
                    currentTags={tags}
                    selected={selected}
                    currentUser={currentUser}
                    model={knowledge}
                    loading={crudProps.knowledge_loading}
                    knowledge={knowledge}
                    knowledge_updateModel={crudProps.knowledge_updateModel}
                    knowledge_deleteModel={crudProps.knowledge_deleteModel}
                    knowledge_searchModel={crudProps.knowledge_searchModel}
                    knowledge_createModel={crudProps.knowledge_createModel}
                    {...formsProps} // Inject props from Forms
                  />
                </Wikipedia>
              </MainWrapper>
            )}
          />
        );
      }}
    />
  );
};

export default KnowledgeList;
