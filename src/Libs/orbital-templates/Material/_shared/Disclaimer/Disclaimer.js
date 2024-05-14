/**
 * Disclaimer component.
 *
 * @param {Object} props - The component props.
 * @param {Function} props.onChange - The onChange event handler.
 * @param {Function} props.onSubmit - The onSubmit event handler.
 * @param {Function} props.onProviderAuth - The onProviderAuth event handler.
 * @param {Function} props.onSuccess - The onSuccess event handler.
 * @param {Function} props.onLogin - The onLogin event handler.
 * @param {Function} props.onForgotPassword - The onForgotPassword event handler.
 * @param {Object} props.classes - The CSS classes.
 * @param {Object} props.location - The location object.
 * @param {Object} props.history - The history object.
 * @param {Object} props.match - The match object.
 * @param {string} props.logo - The logo image source.
 * @param {ReactNode} props.content - The additional content to be rendered.
 * @returns {ReactNode} The rendered Disclaimer component.
 */
import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Button,
  Typography,
  Avatar,
  Icon,
  Grid
} from "@material-ui/core";
import Forms from "../Forms/Forms";
import { Formik } from "formik";
import * as Yup from "yup";

// Synchronous validation
const disclaimerSchema = Yup.object().shape({
  name: Yup.string().required("Required")
});

let form = {
  fields: [
    {
      type: "text",
      name: "name",
      placeholder: "Write Your Name here.",
      required: true
    }
  ]
};

export const Disclaimer = ({
  onChange,
  onSubmit,
  onProviderAuth,
  onSuccess,
  onLogin,
  onForgotPassword,
  classes,
  location,
  history,
  match,
  logo,
  content
}) => {
  return (
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
            {logo ? (
              <img className={classes.logo} src={logo} />
            ) : (
              <Avatar className={classes.avatar}>
                <Icon>legal</Icon>
              </Avatar>
            )}
            <Typography
              style={{ textAlign: "center", fontWeight: "bold" }}
              variant="headline"
            >
              Disclaimer
            </Typography>
          </Grid>
        )}
      />
      <Formik
        initialValues={{}}
        onSubmit={(values, actions) => {
          onSuccess(values);
        }}
        render={({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          setFieldValue,
          setFieldTouched,
          ...rest
        }) => {
          return (
            <>
              <CardContent>
                <p>I, </p>
                <form style={{ display: "inline" }} onSubmit={handleSubmit}>
                  <Forms
                    id="login-fields"
                    form={form}
                    modelSchema={disclaimerSchema}
                    errors={errors}
                    setFieldValue={setFieldValue}
                    setFieldTouched={setFieldTouched}
                    values={values}
                    touched={touched}
                    isSubmitting={isSubmitting}
                    {...rest}
                  />
                  {content}
                  <Grid container direction="column">
                    <Button
                      color="secondary"
                      variant="contained"
                      onClick={handleSubmit}
                      disabled={values.name ? false : true}
                    >
                      Next
                    </Button>
                  </Grid>
                </form>
              </CardContent>
            </>
          );
        }}
      />
    </Card>
  );
};

export default Disclaimer;
