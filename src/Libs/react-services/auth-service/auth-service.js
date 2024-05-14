import { observer } from "mobx-react";
import { observable } from "mobx";
import React from "react";
import axios from "axios";

//export store
/**
 * Represents the authentication domain store.
 */
export class authDomainStore {
  token;
  // //@observable
  user;
  isLoggedIn = false;
  offlineStorage;
  rootStore;
  SERVER;

  /**
   * Constructs a new instance of the authDomainStore.
   * @param {Object} rootStore - The root store object.
   * @param {Object} offlineStorage - The offline storage mechanism.
   * @param {Object} SERVER - The server configuration.
   */
  constructor(rootStore, offlineStorage, SERVER) {
    //set the local storage mechanism
    //could be async storage
    this.rootStore = rootStore;
    if (offlineStorage) {
      this.offlineStorage = offlineStorage;
    }
    this.SERVER = SERVER;
  }

  /**
   * Logs out the user.
   * @returns {Promise} A promise that resolves when the user is logged out.
   */
  logout() {
    return this.clearToken();
  }

  /**
   * Sends a forgot password request.
   * @param {Object} params - The parameters for the forgot password request.
   * @param {string} params.email - The user's email.
   * @returns {Promise} A promise that resolves with the response data.
   */
  forgotPassword({ email }) {
    return new Promise((resolve, reject) => {
      return axios
        .post(`${this.SERVER.host}:${this.SERVER.port}/auth/forgot-password`, {
          email,
          callback: this.SERVER.callback
        })
        .then(res => {
          return resolve(res.data);
        })
        .catch(err => {
          return reject(err && err.response && err.response.data);
        });
    });
  }

  /**
   * Sends a change password request.
   * @param {Object} params - The parameters for the change password request.
   * @param {string} params.token - The password reset token.
   * @param {string} params.newPassword - The new password.
   * @param {string} params.email - The user's email.
   * @returns {Promise} A promise that resolves with the response data.
   */
  changePassword({ token, newPassword, email }) {
    return new Promise((resolve, reject) => {
      return axios
        .post(`${this.SERVER.host}:${this.SERVER.port}/auth/change-password`, {
          email,
          token,
          newPassword,
          callback: this.SERVER.callback
        })
        .then(res => {
          return resolve(res.data);
        })
        .catch(err => {
          return reject(err.response.data);
        });
    });
  }

  /**
   * Sends an email confirmation request.
   * @param {Object} params - The parameters for the email confirmation request.
   * @param {string} params.token - The email confirmation token.
   * @param {string} params.email - The user's email.
   * @returns {Promise} A promise that resolves with the response data.
   */
  confirmEmail({ token, email }) {
    return new Promise((resolve, reject) => {
      return axios
        .post(
          `${this.SERVER.host}:${this.SERVER.port}/auth/email-confirmation`,
          {
            email,
            token,
            callback: this.SERVER.callback
          }
        )
        .then(res => {
          return resolve(res.data);
        })
        .catch(err => {
          return reject(err.response.data);
        });
    });
  }

  /**
   * Sends a request to resend the confirmation email.
   * @param {Object} params - The parameters for the resend confirmation email request.
   * @param {string} params.email - The user's email.
   * @returns {Promise} A promise that resolves with the response data.
   */
  resendConfirmationEmail({ email }) {
    return new Promise((resolve, reject) => {
      return axios
        .post(
          `${this.SERVER.host}:${this.SERVER.port}/auth/resend-email-confirmation`,
          {
            email,
            callback: this.SERVER.callback
          }
        )
        .then(res => {
          return resolve(res.data);
        })
        .catch(err => {
          return reject(err && err.response && err.response.data);
        });
    });
  }

  /**
   * Sends a login request.
   * @param {Object} values - The login values.
   * @returns {Promise} A promise that resolves with the response data.
   */
  login(values) {
    return new Promise((resolve, reject) => {
      return axios
        .post(`${this.SERVER.host}:${this.SERVER.port}/auth`, values)
        .then(res => {
          this.user = res.data;
          this.isLoggedIn = true;
          this.storeToken(this.user.jwtToken, "jwtToken");
          return resolve(res.data);
        })
        .catch(err => {
          return reject(err && err.response && err.response.data);
        });
    });
  }

  /**
   * Sends a registration request.
   * @param {Object} values - The registration values.
   * @returns {Promise} A promise that resolves with the response data.
   */
  register(values) {
    return new Promise((resolve, reject) => {
      return axios
        .post(`${this.SERVER.host}:${this.SERVER.port}/auth/register`, {
          ...values,
          callback: this.SERVER.callback
        })
        .then(res => {
          this.user = res.data;
          this.isLoggedIn = true;
          this.storeToken(this.user.jwtToken);
          return resolve(res.data);
        })
        .catch(err => {
          this.isLoggedIn = false;
          return reject(err && err.response && err.response.data);
        });
    });
  }

  /**
   * Logs in with a provider.
   * @param {string} providerName - The name of the provider.
   */
  loginWithProvider(providerName) {
    window.location.replace(
      `${this.SERVER.host}:${this.SERVER.port}/${providerName}/auth`
    );
  }

  /**
   * Registers with a provider.
   * @param {string} providerName - The name of the provider.
   */
  registerWithProvider(providerName) {
    //information to register
    window.location.replace(
      `${this.SERVER.host}:${this.SERVER.port}/${providerName}/auth`
    );
  }

  /**
   * Stores the token in the offline storage.
   * @param {string} token - The token to store.
   * @param {string} key - The key to store the token under.
   */
  storeToken(token, key) {
    if (token) {
      return this.offlineStorage.setItem(key, token);
    }
  }

  /**
   * Clears the token from the offline storage.
   * @returns {Promise} A promise that resolves when the token is cleared.
   */
  clearToken() {
    return this.offlineStorage.removeItem("jwtToken");
  }

  /**
   * Checks if the user is authenticated.
   * @returns {Promise} A promise that resolves with the authentication status.
   */
  isAuthenticated() {
    return new Promise((resolve, reject) => {
      return this.offlineStorage.getItem("jwtToken").then(token => {
        return axios
          .post(`${this.SERVER.host}:${this.SERVER.port}/jwt`, {
            token
          })
          .then(msg => {
            return resolve(msg);
          })
          .catch(err => {
            return reject(err);
          });
      });
    });
  }
}

export class authUiStore {
  // //@observable
  username;
  // //@observable
  password;
  // //@observable
  email;
  // //@observable
  firstname;
  // //@observable
  lastname;
  constructor(rootStore) {
    this.rootStore = rootStore;
  }
}

//somehow we have to load stuff from an api
export const api = {
  googleAuth: "",
  facebookAuth: "",
  twitterAuth: ""
};

//determine the theme here and load the right login information?
export const LoginWithAuth = observer(
  ({ children, authUiStore, authDomainStore, ...rest }) => {
    let decoratedLogin = React.Children.map(children, child =>
      React.cloneElement(child, {
        onChange: (field, value) => {
          authUiStore[field] = value;
        },
        onSubmit: values => {
          return authDomainStore.login(values);
        },
        onProviderAuth: providerName => {
          authDomainStore.loginWithProvider(providerName);
        },
        ...rest,
        ...child.props
      })
    );
    return <React.Fragment>{decoratedLogin}</React.Fragment>;
  }
);

export const RegisterWithAuth = observer(
  ({ children, authUiStore, authDomainStore }) => {
    let decoratedRegister = React.Children.map(children, child =>
      React.cloneElement(children, {
        onChange: (field, value) => {
          authUiStore[field] = value;
        },
        onSubmit: values => {
          return authDomainStore.register(values);
        },
        onProviderAuth: providerName => {
          authDomainStore.loginWithProvider(providerName);
        },
        ...child.props
      })
    );
    return <React.Fragment>{decoratedRegister}</React.Fragment>;
  }
);

/**
 * Injects authentication-related props into a component.
 *
 * @param {Object} authDomainStore - The authentication domain store.
 * @param {Object} props - Additional props to be injected.
 * @param {React.Component} child - The child component.
 * @returns {Object} - The injected props object.
 */
const injectProps = (authDomainStore, props, child) => {
  let injected = {
    login: values => authDomainStore.login(values),
    register: values => authDomainStore.register(values),
    forgotPassword: email => authDomainStore.forgotPassword(email),
    changePassword: ({ newPassword, email, token }) =>
      authDomainStore.changePassword({ newPassword, email, token }),
    confirmEmail: ({ email, token }) =>
      authDomainStore.confirmEmail({ email, token }),
    loginWithProvider: providerName =>
      authDomainStore.loginWithProvider(providerName),
    // registerWithProvider: providerName =>
    //   authDomainStore.registerWithProvider(registerWithProvider),
    resendConfirmationEmail: email =>
      authDomainStore.resendConfirmationEmail(email),
    ...props,
    ...child.props
  };
  return injected;
};

//determine the theme here and load the right login information?
// //@observer
/**
 * Represents the Auth component.
 * @class
 * @extends React.Component
 */
export class Auth extends React.Component {
  /**
   * Constructs a new Auth component.
   * @constructor
   * @param {Object} props - The props object.
   */
  constructor(props) {
    super(props);
  }

  /**
   * Lifecycle method called after the component has been mounted.
   */
  componentDidMount() {
    let { authDomainStore } = this.props;
    authDomainStore.isAuthenticated();
  }

  /**
   * Lifecycle method called when the component receives new props.
   * @param {Object} nextProps - The next props object.
   */
  componentWillReceiveProps(nextProps) {}

  /**
   * Lifecycle method called after the component has been updated.
   */
  componentDidUpdate() {}

  /**
   * Renders the component.
   * @returns {JSX.Element} The rendered component.
   */
  render() {
    let { children, authDomainStore } = this.props;
    const childrenWithProps = React.Children.map(children, child => {
      let injectedProps = injectProps(authDomainStore, this.props, child);
      return React.cloneElement(child, injectedProps);
    });
    return <React.Fragment>{childrenWithProps}</React.Fragment>;
  }
}

export function withAuth(WrappedComponent) {
  // //@observer
  class WithAuth extends React.Component {
    constructor(props) {
      super(props);
    }
    componentDidMount() {
      let { authDomainStore } = this.props;
      authDomainStore.isAuthenticated();
    }
    componentWillReceiveProps() {}
    render() {
      let { authDomainStore } = this.props;
      let injectedProps = injectProps(authDomainStore, this.props, this);
      return <WrappedComponent {...injectedProps} />;
    }
  }
  return WithAuth;
}
