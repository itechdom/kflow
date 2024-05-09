import React from "react";
import { Switch, HashRouter as Router } from "react-router-dom";
import Profile from "./Profile/Profile";
import Admin from "./Admin/Admin";
import theme from "./theme";
import { styles } from "./App.styles.js";
import { withStyles } from "@material-ui/core/styles";
import "./global.css";
import KnowledgeList from "./Pages/KnowledgeList";
import KnowledgeDetails from "./Pages/KnowledgeDetails";
class App extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Router>
        <Switch>
          <Profile classes={classes} />
          <Admin classes={classes} />
          <KnowledgeDetails classes={classes} />
          <KnowledgeList classes={classes} />
        </Switch>
      </Router>
    );
  }
}
export default withStyles(styles, { defaultTheme: theme })(App);