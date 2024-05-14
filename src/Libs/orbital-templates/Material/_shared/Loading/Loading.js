/**
 * Renders a loading component with an optional logo, title, and error message.
 *
 * @param {Object} props - The component props.
 * @param {string} props.logo - The URL of the logo image.
 * @param {string} props.title - The title to be displayed.
 * @param {Object} props.err - The error object containing the error message and stack trace.
 * @returns {JSX.Element} The rendered loading component.
 */
import React from "react";
import theme from "theme";
import { withStyles } from "@material-ui/styles";
import { styles } from "./Loading.styles";
import { Grid } from "@material-ui/core";
import { Typography, CircularProgress } from "@material-ui/core";

function Loading(props) {
  const { classes, logo, title, err } = props;
  return (
    <React.Fragment>
      <Grid container justify="center">
        <Grid item>
          {logo ? (
            <img className="loading" width="200px" height="auto" src={logo} />
          ) : (
            <CircularProgress color="primary" />
          )}
        </Grid>
        {err && err.error && (
          <Grid item>
            {err.error.message}:{err.error.stack}
          </Grid>
        )}
      </Grid>
      <Typography
        variant="display3"
        align="center"
        color="textPrimary"
        gutterBottom
      >
        {title}
      </Typography>
    </React.Fragment>
  );
}

export default withStyles(styles, { defaultTheme: theme })(Loading);
