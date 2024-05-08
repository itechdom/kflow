import React from "react";
import { Route, Switch, HashRouter as Router } from "react-router-dom";
import {
  mainRouteList,
  editableSchemas,
  adminRoute,
  logoutRoute,
} from "./Routes";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button
} from "@material-ui/core";
import MainWrapper from "Libs/orbital-templates/Material/Wrappers/MainWrapper";
import Loading from "Libs/orbital-templates/Material/_shared/Loading/Loading";
import { Wikipedia } from "Libs/react-services/wikipedia-service/wikipedia-container";
import {
  Crud,
  Media,
  Forms,
  Notification
} from "Libs/react-services";
import config from "./config/index";
import ReactGA from "react-ga";
import rootStore from "./Store/rootStore";
import Profile from "./Profile/Profile";
import Admin from "./Admin/Admin";
import theme from "./theme";
import { styles } from "./App.styles.js";
import { withStyles, ThemeProvider } from "@material-ui/core/styles";
import "./global.css";
import Knowledge from "./Knowledge/Knowledge";
import KnowledgePreview from "./Knowledge/ModelPreview/ModelPreview";
const logo = "images/logo-no-background.svg";
const gaTrackingCode = "UA-46023413-2";
const disableAuth = true;
const offlineStorage = {
  getItem: (key) => {
    return new Promise((resolve, reject) => {
      return resolve(localStorage.getItem(key));
    });
  },
  setItem: (key, value) => {
    return new Promise((resolve, reject) => {
      return resolve(localStorage.setItem(key, value));
    });
  },
  removeItem: (key) => {
    return new Promise((resolve, reject) => {
      return resolve(localStorage.removeItem(key));
    });
  },
};
const Logout = ({ onLogout }) => {
  React.useEffect(() => {
    onLogout();
  }, []);
  return <></>;
};
class App extends React.Component {
  state = {
    isLoggedIn: true,
    currentUser: {},
    appSettings: {},
    tags: [],
    initialTags: [],
    mainRouteState: {},
    expandMap: true,
    selected: null,
  };
  constructor(props) {
    super(props);
    this.onLogout = this.onLogout.bind(this);
  }
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      if (!disableAuth) {
        !disableAuth && this.onRouteChanged();
      }
    }
  }
  onRouteChanged = () => {
    gaTrackingCode && ReactGA.pageview(this.props.location.pathname);
    rootStore.authDomainStore
      .isAuthenticated()
      .then((res) => {
        if (res.data.success === false) {
          this.setState({ isLoggedIn: false });
        } else {
          this.setState({ isLoggedIn: true, currentUser: res.data });
        }
      })
      .catch((err) => {
        this.setState({ isLoggedIn: false });
      });
  };
  componentDidMount = () => {
    !disableAuth && this.onRouteChanged();
  };
  onLogout() {
    rootStore.authDomainStore.logout();
    this.setState({ isLoggedIn: false });
  }
  render() {
    const { classes } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <Router>
            <Switch>
              <Route
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
                        notificationDomainStore={
                          rootStore.notificationDomainStore
                        }
                        crudDomainStore={rootStore.crudDomainStore}
                      >
                        <Forms formsDomainStore={rootStore.formsDomainStore}>
                          <Media
                            extension="image/jpg"
                            mediaDomainStore={rootStore.mediaDomainStore}
                          >
                            <Notification
                              notificationDomainStore={
                                rootStore.notificationDomainStore
                              }
                            >
                              <Profile
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
              />
              <Route
                path={`${this.props.match.path}logout`}
                render={({ location, match, history }) => {
                  const routeProps = { location, match, history };
                  return (
                    <Logout {...routeProps} onLogout={() => this.onLogout()} />
                  );
                }}
              />
              <Route
                path={`${this.props.match.path}admin`}
                render={({ location, match, history }) => {
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
                          ? [...mainRouteList, adminRoute]
                          : [...mainRouteList]
                      }
                      drawerRouteList={
                        this.state.currentUser && this.state.currentUser.isAdmin
                          ? [...mainRouteList, adminRoute, logoutRoute]
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
                        notificationDomainStore={
                          rootStore.notificationDomainStore
                        }
                        crudDomainStore={rootStore.crudDomainStore}
                      >
                        <Crud
                          modelName="users"
                          SERVER={config.SERVER}
                          offlineStorage={offlineStorage}
                          notificationDomainStore={
                            rootStore.notificationDomainStore
                          }
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
                                notificationDomainStore={
                                  rootStore.notificationDomainStore
                                }
                              >
                                <Admin
                                  classes={classes}
                                  schemas={editableSchemas}
                                  {...routeProps}
                                />
                              </Notification>
                            </Media>
                          </Forms>
                        </Crud>
                      </Crud>
                    </MainWrapper>
                  );
                }}
              />
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
                          ? [...mainRouteList, adminRoute, logoutRoute]
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
                      <Profile {...routeProps}></Profile>
                    </MainWrapper>
                  );
                }}
              ></Route>
              <Route
                path={`${this.props.match.path}knowledge/view/:id`}
                render={(routeProps) => {
                  const {
                    match: { params },
                  } = routeProps;
                  let query = { _id: params.id };
                  return (
                    <Wikipedia
                      SERVER={config.SERVER}
                      offlineStorage={offlineStorage}
                    >
                      <Crud
                        modelName="knowledge"
                        SERVER={config.SERVER}
                        offlineStorage={offlineStorage}
                        notificationDomainStore={
                          rootStore.notificationDomainStore
                        }
                        crudDomainStore={rootStore.crudDomainStore}
                        paginate={false}
                        query={query}
                        render={(props) => {
                          let knowledge =
                            props.knowledge && props.knowledge.data[0];

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
                                this.state.currentUser &&
                                  this.state.currentUser.isAdmin
                                  ? [...mainRouteList, adminRoute, logoutRoute]
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
                                  routeProps.history.push(
                                    `//edit/${model._id}`
                                  );
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
                                knowledge_updateModel={
                                  props.knowledge_updateModel
                                }
                                knowledge_deleteModel={
                                  props.knowledge_deleteModel
                                }
                                {...props}
                              />
                            </MainWrapper>
                          );
                        }}
                      />
                    </Wikipedia>
                  );
                }}
              />
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
                      notificationDomainStore={
                        rootStore.notificationDomainStore
                      }
                      crudDomainStore={rootStore.crudDomainStore}
                      paginate={false}
                      query={query}
                      render={(props) => {
                        let knowledge =
                          props.knowledge
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
                              this.state.currentUser &&
                                this.state.currentUser.isAdmin
                                ? [...mainRouteList, adminRoute, logoutRoute]
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
                              notificationDomainStore={
                                rootStore.notificationDomainStore
                              }
                            >
                              <Knowledge
                                onEdit={(model) => {
                                  routeProps.history.push(
                                    `//edit/${model._id}`
                                  );
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
                                knowledge_updateModel={
                                  props.knowledge_updateModel
                                }
                                knowledge_deleteModel={
                                  props.knowledge_deleteModel
                                }
                                knowledge_searchModel={
                                  props.knowledge_searchModel
                                }
                              />
                            </Wikipedia>
                          </MainWrapper>
                        );
                      }}
                    />
                  );
                }}
              />
            </Switch>
        </Router>
      </ThemeProvider>
    );
  }
}
export default withStyles(styles, { defaultTheme: theme })(App);
