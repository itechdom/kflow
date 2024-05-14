/**
 * ResetPassword component for resetting user password.
 *
 * @component
 * @param {Function} changePassword - Function to change the password.
 * @param {Function} onDone - Function to handle completion of password reset.
 * @param {Object} classes - CSS classes for styling the component.
 * @param {Object} location - Location object from react-router-dom.
 * @param {Object} history - History object from react-router-dom.
 * @param {Object} match - Match object from react-router-dom.
 * @returns {JSX.Element} ResetPassword component.
 */
import React from "react";
import { withStyles } from "@material-ui/styles";
import theme from "theme";
import { Formik } from "formik";
import * as Yup from "yup";
import { Route } from "react-router-dom";
import { styles } from "./ResetPassword.styles";
import ResetPasswordConfirm from "./ResetPasswordConfirm";
import queryString from "query-string";
import {
  Button,
  Typography,
  Avatar,
  CssBaseline,
  Card,
  CardHeader,
  CardContent,
  Grid,
  Paper
} from "@material-ui/core";
import * as Inputs from "../Forms/Inputs";

// Synchronous validation
const ResetPasswordSchema = Yup.object().shape({
  newPassword: Yup.string().required("Required"),
  confirmNewPassword: Yup.string().oneOf(
    [Yup.ref("newPassword")],
    "Passwords do not match"
  )
});

let fields = [
  {
    type: "password",
    name: "newPassword",
    placeholder: "New Password",
    required: true
  },
  {
    type: "password",
    name: "confirmNewPassword",
    placeholder: "Confirm New password",
    required: true
  }
];

export const ResetPassword = ({
  changePassword,
  onDone,
  classes,
  location,
  history,
  match
}) => {
  let { token, email } = queryString.parse(location.search);
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
          <Route
            exact
            path={`${match.path}`}
            render={({ match }) => {
              return (
                <Formik
                  initialValues={{ newPassword: "", confirmNewPassword: "" }}
                  onSubmit={(values, actions) => {
                    let { newPassword } = values;
                    changePassword({ newPassword, email, token })
                      .then(() => {
                        history.push(`${match.url}/confirm`);
                        actions.setSubmitting(false);
                      })
                      .catch(err => {
                        actions.setErrors({ server: err });
                        actions.setSubmitting(false);
                      });
                  }}
                  validationSchema={ResetPasswordSchema}
                  render={({
                    values,
                    errors,
                    touched,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                    isSubmitting
                  }) => {
                    return (
                      <form onSubmit={handleSubmit}>
                        {errors.server && (
                          <Typography color="error">{errors.server}</Typography>
                        )}
                        {fields.map((field, index) => {
                          return (
                            <div key={index}>
                              <Inputs.TextFieldInput
                                id={field.name}
                                field={field}
                                label={field.placeholder}
                                type={field.type}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                maegin="normal"
                                required={field.required}
                                onKeyPress={event =>
                                  event.key === 13 ? handleSubmit() : ""
                                }
                              />
                              {errors[field.name] && touched[field.name] && (
                                <Typography color="error">
                                  {errors[field.name]}
                                </Typography>
                              )}
                            </div>
                          );
                        })}
                        <Grid
                          justify="center"
                          className={classes["top30"]}
                          container
                        >
                          <Grid item>
                            <Button
                              color="secondary"
                              variant="contained"
                              onClick={handleSubmit}
                              type="submit"
                              disabled={isSubmitting}
                            >
                              Reset Password
                            </Button>
                          </Grid>
                        </Grid>
                      </form>
                    );
                  }}
                />
              );
            }}
          />
          <Route
            path={`${match.path}/confirm`}
            render={({ match }) => {
              return <ResetPasswordConfirm />;
            }}
          />
          <Grid
            container
            justify="center"
            alignContent="center"
            alignItems="center"
            className={classes["top30"]}
          >
            <Grid item>
              <Button variant="contained" color="secondary" onClick={onDone}>
                Home
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </React.Fragment>
  );
};

export default withStyles(styles, { defaultTheme: theme })(ResetPassword);
