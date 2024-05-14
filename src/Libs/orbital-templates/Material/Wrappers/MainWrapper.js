/**
 * MainWrapper component is a wrapper component that provides a layout for the application.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The content to be rendered inside the wrapper.
 * @param {Object} props.location - The location object from React Router.
 * @param {Object} props.match - The match object from React Router.
 * @param {Object} props.history - The history object from React Router.
 * @param {boolean} props.auth - Flag indicating if the user is authenticated.
 * @param {Object} props.user - The user object.
 * @param {string} props.logo - The URL of the logo image.
 * @param {Function} props.onLogout - The callback function for logout action.
 * @param {Array} props.routeList - The list of routes for the application.
 * @param {Array} props.drawerRouteList - The list of routes for the drawer menu.
 * @param {string} props.brand - The brand name for the application.
 * @param {Object} props.anchorEl - The anchor element for the menu.
 * @param {Function} props.setAnchorEl - The function to set the anchor element.
 * @param {boolean} props.open - Flag indicating if the drawer menu is open.
 * @param {Function} props.setOpen - The function to set the drawer menu open state.
 * @param {boolean} props.setMenuOpen - Flag indicating if the menu is open.
 * @param {Object} props.classes - The CSS classes for styling the component.
 * @param {boolean} props.isTabMenu - Flag indicating if the tab menu is enabled.
 * @param {boolean} props.isTagMenu - Flag indicating if the tag menu is enabled.
 * @param {Array} props.tags - The list of tags for the tag menu.
 * @param {Function} props.setState - The function to set the state.
 * @param {string} props.tabMenuPosition - The position of the tab menu.
 * @param {Function} props.onDrawerRouteClick - The callback function for drawer route click.
 * @param {Function} props.onRouteClick - The callback function for route click.
 * @param {number} props.selectedRoute - The index of the selected route.
 * @param {boolean} props.hideDrawer - Flag indicating if the drawer menu should be hidden.
 * @param {boolean} props.hideAppBar - Flag indicating if the app bar should be hidden.
 * @param {Function} props.render - The render function for custom rendering.
 * @param {Array} props.length - The list of lengths for the tab menu labels.
 * @returns {JSX.Element} The rendered MainWrapper component.
 */
import React, { Children } from "react";
import classNames from "classnames";
import MenuIcon from "@material-ui/icons/Menu";
import { compose, withState } from "recompose";
import { Routes } from "./Routes";
import {
  CssBaseline,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Hidden,
  Tabs,
  Tab,
  Drawer,
  Paper,
  Grid,
  Chip,
  useMediaQuery,
} from "@material-ui/core";
const Icon = ({ children }) => {
  return <i className="material-icons">{children}</i>;
};
const enhance = compose(
  withState("open", "setOpen", false),
  withState("menuOpen", "setMenuOpen", false),
  withState("anchorEl", "setAnchorEl", null),
  withState("title", "setTitle", ""),
  withState("route", "setRoute", 0)
);

const MainWrapper = (props) => {
  const {
    children,
    location,
    match,
    history,
    auth,
    user,
    logo,
    onLogout,
    routeList,
    drawerRouteList,
    brand,
    anchorEl,
    setAnchorEl,
    open,
    setOpen,
    setMenuOpen,
    classes,
    isTabMenu,
    isTagMenu,
    tags,
    setState,
    tabMenuPosition,
    onDrawerRouteClick,
    onRouteClick,
    selectedRoute,
    hideDrawer,
    hideAppBar,
    render,
    length,
  } = props;
  const isAnchor = Boolean(anchorEl);

  let route = routeList.filter(({ name, url }) => {
    return location.pathname.replace("/", "/").indexOf(url) !== -1;
  });
  let currentRoute = selectedRoute
    ? selectedRoute
    : (route.length > 0 && routeList.indexOf(route[route.length - 1])) || 0;
  return (
    <>
      <CssBaseline />
      <div className={classes.root}>
        {isTagMenu && (
          <AppBar
            style={{
              bottom: tabMenuPosition === "top" ? "auto" : 0,
              top: tabMenuPosition === "top" ? 0 : "auto",
              backgroundColor: "white",
            }}
            className={classes.tabMenu}
          >
            <Grid container justify="flex-start">
              {routeList.map((route, index) => {
                return (
                  <Grid item>
                    <Chip
                      label={route.name}
                      key={route.name}
                      id={route.name}
                      className={
                        [...tags].indexOf(route.name) !== -1
                          ? classes.chip__selected
                          : classes.chip
                      }
                      onClick={() => onRouteClick(route.name)}
                    />
                  </Grid>
                );
              })}
            </Grid>
          </AppBar>
        )}
        {isTabMenu && (
          <Paper
            style={{
              bottom: tabMenuPosition === "top" ? "auto" : 0,
              top: tabMenuPosition === "top" ? 0 : "auto",
              backgroundColor: "white",
            }}
            className={classes.tabMenu}
          >
            <Tabs
              value={currentRoute || 0}
              onChange={(event, route) => {
                onRouteClick
                  ? onRouteClick(`${routeList[route].url}`)
                  : history.push(`${match.path}${routeList[route].url}`);
              }}
              style={{ color: "black" }}
              variant="scrollable"
              indicatorColor="sblack"
              textColor="secondary"
              scrollButtons="on"
              aria-label="scrollable force tabs example"
            >
              {routeList.map((route, index) => {
                return (
                  <Tab
                    label={route.name.replace(
                      "${length}",
                      length && length[index] ? length[index] : "0"
                    )}
                    icon={<Icon>{route.icon}</Icon>}
                    key={index}
                    button
                    className={
                      tabMenuPosition === "top"
                        ? route.type === "button"
                          ? classes.buttonListItem
                          : classes.listItem
                        : classes.tagTab
                    }
                  />
                );
              })}
            </Tabs>
          </Paper>
        )}
        {!hideAppBar && (
          <AppBar className={classes.menu}>
            <Toolbar className={classes.toolbar}>
              <Grid
                container
                justify="flex-start"
                alignItems="center"
                alignContent="center"
              >
                {!hideDrawer && (
                  <Grid item>
                    <IconButton
                      aria-label="Open drawer"
                      onClick={() => setOpen(true)}
                      className={classNames(
                        classes.menuButton,
                        open && classes.menuButtonHidden
                      )}
                    >
                      <MenuIcon />
                    </IconButton>
                  </Grid>
                )}
                <Grid item>
                  <img src={logo} width="80px" height="45px" />
                </Grid>
                {/* <Grid item>
                  <Typography variant="h6" noWrap className={classes.title}>
                    {brand
                      ? brand
                      : (routeList[currentRoute] &&
                          routeList[currentRoute].name) ||
                        routeList[0].name}
                  </Typography>
                </Grid> */}
                <Grid style={{ marginLeft: "auto" }} item>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    keepMounted
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                    transformOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                    open={isAnchor}
                    onClose={() => setAnchorEl(null)}
                  >
                    <MenuItem
                      onClick={(event) => {
                        setMenuOpen(false);
                        onRouteClick
                          ? onRouteClick("/settings")
                          : history.push(`${match.path}settings`);
                      }}
                    >
                      Settings
                    </MenuItem>
                    <MenuItem
                      onClick={(event) => {
                        setMenuOpen(false);
                        onRouteClick
                          ? onRouteClick("logout")
                          : history.push(`${match.path}auth/login`);
                      }}
                    >
                      Log out
                    </MenuItem>
                  </Menu>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
        )}
        <Drawer
          className={classes.menu}
          open={open}
          onClose={() => setOpen(false)}
        >
          <Routes
            currentRoute={currentRoute || 0}
            classes={classes}
            routeList={drawerRouteList ? drawerRouteList : routeList}
            isLoggedIn={user && !!user.name}
            onClick={(route) => {
              setOpen(false);
              if (onDrawerRouteClick) {
                return onDrawerRouteClick(`${route.url}`);
              }
              onRouteClick
                ? onRouteClick(`${route.url}`)
                : history.push(`${match.path}${route.url}`);
            }}
          />
        </Drawer>
        <main className={`${classes.hasPadding} ${classes.content}`}>
          {render ? render(props) : children}
        </main>
      </div>
    </>
  );
};

export default compose(enhance)(MainWrapper);
