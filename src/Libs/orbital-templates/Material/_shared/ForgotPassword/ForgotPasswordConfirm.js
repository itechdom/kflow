/**
 * Renders a component for confirming a password reset.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.classes - The CSS classes for styling the component.
 * @param {Function} props.onDone - The callback function to be called when the user is done with the password reset.
 * @param {Object} props.history - The history object for navigation.
 * @returns {JSX.Element} The JSX element representing the ForgotPasswordConfirm component.
 */
import React from "react";
import { withStyles } from "@material-ui/styles";
import theme from "theme";
import { styles } from "./ForgotPassword.styles";
import { CssBaseline } from "@material-ui/core";
import {
  Typography,
  Button,
  Card,
  CardHeader,
  CardContent,
  Grid,
  Icon,
  Avatar
} from "@material-ui/core";

export const ForgotPasswordConfirm = ({ classes, onDone, history }) => {
  return (
    <React.Fragment>
      <CssBaseline />
      <Card className={classes.layout}>
        <CardHeader
          style={{ justifyContent: "center" }}
          component={props => (
            <Grid
              container
              direction={"column"}
              justifyContent={"center"}
              alignContent="center"
            >
              <Typography className={classes.bold} variant="headline">
                Password Reset!
              </Typography>
            </Grid>
          )}
        />
        <CardContent>
          <Grid
            alignContent="center"
            alignItems="center"
            justify="center"
            container
          >
            <Grid item>
              <Typography variant="headline">
                Check your email for a password reset email
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            justify="center"
            alignContent="center"
            alignItems="center"
          >
            <Grid item>
              <Button
                className={classes["top20"]}
                variant="outlined"
                color="secondary"
                onClick={onDone}
              >
                Home
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </React.Fragment>
  );
};

export default withStyles(styles, { defaultTheme: theme })(
  ForgotPasswordConfirm
);
