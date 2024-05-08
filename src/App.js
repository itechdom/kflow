import React from "react";
import { Route, Switch, HashRouter as Router } from "react-router-dom";
import {
  mainRouteList,
  editableSchemas,
  adminRoute,
  logoutRoute,
} from "./Routes";
import MainWrapper from "Libs/orbital-templates/Material/Wrappers/MainWrapper";
import Loading from "Libs/orbital-templates/Material/_shared/Loading/Loading";
import { Crud, Media, Forms, Notification } from "Libs/react-services";
import config from "./config/index";
import ReactGA from "react-ga";
import rootStore from "./Store/rootStore";
import Profile from "./Profile/Profile";
import Admin from "./Admin/Admin";
import theme from "./theme";
import { styles } from "./App.styles.js";
import { withStyles } from "@material-ui/core/styles";
import "./global.css";
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
      <Router>
        <Switch>
          <Profile classes={classes} />
          <Admin classes={classes} />
          <Me classes={classes} />
          <KnowledgeDetails classes={classes} />
          <KnowledgeList classes={classes} />
        </Switch>
      </Router>
    );
  }
}
export default withStyles(styles, { defaultTheme: theme })(App);