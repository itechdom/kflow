import React from "react";
import { Route, Switch } from "react-router-dom";
import { MainWrapper } from "../Components";
import { Crud } from "../Components";
import { World } from "../Components";
import { config } from "../../config";
import { offlineStorage } from "../OfflineStorage";
import { withStyles } from "@material-ui/core/styles";
import { mainRouteList, adminRoute, logoutRoute } from "../../Routes";
import logo from "../Assets/logo.png";
import { styles } from "../../App.styles";

const KnowledgeStories = (props) => (
    <Route
        path={`${props.match.path}`}
        render={(routeProps) => {
            return (
                <MainWrapper
                    logo={logo}
                    user={this.state.currentUser}
                    {...routeProps}
                    {...props}
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
                    onRouteClick={(route) => {
                        if (route.indexOf("http") !== -1) {
                            return window.open(route);
                        }
                        return routeProps.history.push(`${route}`);
                    }}
                    classes={{
                        ...classes,
                        tabMenu: `${classes["white"]}`,
                        content: `${classes.noScroll}`,
                        menuTabsClasses: {
                            flexContainer: `${classes["center"]}`,
                        },
                    }}
                    render={(currentProps) => (
                        <Switch>
                            <Route
                                path={`${routeProps.match.path}`}
                                render={(props) => {
                                    return (
                                        <Crud
                                            modelName="knowledge"
                                            SERVER={config.SERVER}
                                            offlineStorage={offlineStorage}
                                            notificationDomainStore={
                                                rootStore.notificationDomainStore
                                            }
                                            crudDomainStore={rootStore.crudDomainStore}
                                            render={(props) => {
                                                return (
                                                    <World
                                                        location={props.location}
                                                        currentTags={this.state.tags}
                                                        selected={this.state.selected}
                                                        currentUser={this.state.currentUser}
                                                        setState={(props) =>
                                                            this.setState(props)
                                                        }
                                                        renderDialog={(props) =>
                                                            this.renderDialog(props)
                                                        }
                                                        knowledge={props.knowledge}
                                                    />
                                                );
                                            }}
                                        />
                                    );
                                }}
                            ></Route>
                        </Switch>
                    )}
                />
            );
        }}
    />)
export default withStyles(styles, KnowledgeStories);