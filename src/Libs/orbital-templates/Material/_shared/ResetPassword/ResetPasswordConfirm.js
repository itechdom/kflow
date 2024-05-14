/**
 * Renders the component for displaying a confirmation message after resetting the password.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.classes - The CSS classes injected by the withStyles higher-order component.
 * @param {Function} props.onDone - The callback function to be called when the password reset is done.
 * @param {Object} props.history - The history object provided by React Router.
 * @returns {JSX.Element} The JSX element representing the ResetPasswordConfirmation component.
 */
import React from "react";
import { withStyles } from "@material-ui/styles";
import theme from "theme";
import { styles } from "./ResetPassword.styles";
import {
  Typography,
  Grid
} from "@material-ui/core";

export const ResetPasswordConfirmation = ({ classes, onDone, history }) => {
  return (
    <React.Fragment>
      <Grid
        alignContent="center"
        alignItems="center"
        justify="center"
        container
      >
        <Grid item>
          <Typography variant="headline">
            Your password has been reset!
          </Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default withStyles(styles, { defaultTheme: theme })(
  ResetPasswordConfirmation
);
