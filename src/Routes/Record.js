import React from "react";
import { Route } from "react-router-dom";
import { MainWrapper } from "../Components";
import { mainRouteList, adminRoute, logoutRoute } from "../Routes";
import logo from "../Assets/logo.png";
import { styles } from "../App.styles";
import { withStyles } from "@material-ui/styles";

const Record = (props) => (
    <Route
        path={`${this.props.match.path}record`}
        render={(routeProps) => {
            return (
                <MainWrapper
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
                    onDrawerRouteClick={(route) => {
                        if (route.indexOf("http") !== -1) {
                            return window.open(route);
                        }
                        return routeProps.history.push(`${route}`);
                    }}
                    onRouteClick={(route) => {
                        if (route.indexOf("http") !== -1) {
                            return window.open(route);
                        }
                        return routeProps.history.push(`${route}`);
                    }}
                    logo={logo}
                    {...routeProps}
                    {...this.props}
                    isTabMenu={true}
                    classes={{
                        ...classes,
                        tabMenu: `${classes["white"]}`,
                        hasPadding: `${classes["top50"]} ${classes["bottom50"]}`,
                        title: `${classes["white"]}`,
                        menuTabsClasses: {
                            flexContainer: `${classes["center"]}`,
                        },
                    }}
                >
                    <Grid
                        style={{ marginTop: "6em", height: "100vh" }}
                        container
                        justify="center"
                    >
                        {[
                            {
                                title: "I Saw someting!",
                                icon: "panorama_fish_eye",
                            },
                            {
                                title: "I want to say something!",
                                icon: "audiotrack",
                            },
                        ].map(({ title, icon }) => (
                            <Grid xs={12} md={6} item>
                                <Card>
                                    <Grid container justify="center">
                                        <Grid item xs={6} md={6}>
                                            <CardContent style={{ textAlign: "center" }}>
                                                <Button color="primary" variant="contained">
                                                    <i class="material-icons">{icon}</i>
                                                </Button>
                                                <p
                                                    style={{
                                                        fontWeight: "bold",
                                                        fontSize:
                                                            title === "I Saw someting!" ? 20 : 16,
                                                    }}
                                                >
                                                    {title}
                                                </p>
                                            </CardContent>
                                        </Grid>
                                    </Grid>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </MainWrapper>
            );
        }}
    ></Route>)

export default withStyles(styles)(Record);