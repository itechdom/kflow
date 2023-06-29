import React from "react";
import { Route, Switch } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import {
  RegisterWithAuth,
  Auth
} from "Libs/react-services";
import { styles } from "../../App.styles";
import LoginWrapper from "Libs/orbital-templates/Material/Wrappers/LoginWrapper";
import { LoginWithAuth } from "Libs/react-services/auth-service/auth-service";
import ForgotPassword from "./ForgotPassword/ForgotPassword";
import ResetPassword from "./ResetPassword/ResetPassword";
import Register from "./Register/Register";
import Login from "./Login/Login";
const loginBG = "";
const registerBG = "";

const Auth = (props) => (
  <Switch>
    <Route
      path="/auth/forgot-password"
      render={({ location, history, match }) => {
        return (
          <LoginWrapper classes={classes} backgroundImage={registerBG}>
            <Auth authDomainStore={rootStore.authDomainStore}>
              <ForgotPassword
                onLogin={() => history.push("/auth/login")}
                location={location}
                history={history}
                match={match}
                classes={classes}
              />
            </Auth>
          </LoginWrapper>
        );
      }}
    />
    <Route
      path="/auth/reset-password"
      render={({ location, history, match }) => {
        return (
          <LoginWrapper classes={classes} backgroundImage={registerBG}>
            <Auth authDomainStore={rootStore.authDomainStore}>
              <ResetPassword
                onLogin={() => history.push("/auth/login")}
                location={location}
                history={history}
                match={match}
                classes={classes}
              />
            </Auth>
          </LoginWrapper>
        );
      }}
    />
    <Route
      path="/auth/login"
      render={({ location, history, match }) => {
        return (
          <LoginWrapper classes={classes} backgroundImage={loginBG}>
            <LoginWithAuth
              authUiStore={rootStore.authUiStore}
              authDomainStore={rootStore.authDomainStore}
              classes={classes}
            >
              <Login
                onRegister={() => history.push("/auth/register")}
                onForgotPassword={() => history.push("/auth/forgot-password")}
                onSuccess={(values) => {
                  this.setState({ isLoggedIn: true });
                }}
                location={location}
                history={history}
                match={match}
              />
            </LoginWithAuth>
          </LoginWrapper>
        );
      }}
    />
    <Route
      path={`${this.props.match.path}knowledge`}
      render={({ location, history, match }) => {
        return (
          <LoginWrapper classes={classes} backgroundImage={registerBG}>
            <RegisterWithAuth
              authDomainStore={rootStore.authDomainStore}
              authUiStore={rootStore.authUiStore}
            >
              {!this.state.isLoggedIn && (
                <Register
                  onLogin={() => history.push("/auth/login")}
                  onSuccess={() => history.push("/onboarding/1")}
                  location={location}
                  history={history}
                  match={match}
                  classes={classes}
                />
              )}
            </RegisterWithAuth>
          </LoginWrapper>
        );
      }}
    />
  </Switch>
);

export default withStyles(styles)(Auth);