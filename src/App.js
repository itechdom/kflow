import React from "react";
import { Switch, HashRouter as Router } from "react-router-dom";
import { Route } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Profile from "./Profile/Profile";
import Admin from "./Admin/Admin";
import theme from "./theme";
import { styles } from "./App.styles.js";
import "./global.css";
import KnowledgeList from "./Pages/KnowledgeList";
import KnowledgeDetails from "./Pages/KnowledgeDetails";

class App extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Router>
        <Switch>
          <Route path="/profile">
            <Profile classes={classes} />
          </Route>
          <Route path="/profile">
            <Admin classes={classes} />
          </Route>
          <Route path="/knowledge">
            <KnowledgeDetails classes={classes} />
          </Route>
          <Route path="/">
            <KnowledgeList classes={classes} />
          </Route>
        </Switch>
      </Router>
    );
  }
}
export default withStyles(styles, { defaultTheme: theme })(App);