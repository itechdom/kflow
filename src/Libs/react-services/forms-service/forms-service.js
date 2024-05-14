import { observer } from "mobx-react";
import { observable, action, runInAction, toJS } from "mobx";
import React from "react";
import axios from "axios";

//export store
/**
 * Represents a forms domain store.
 */
export class formsDomainStore {
  /**
   * The name of the model.
   * @type {string}
   */
  modelName;

  /**
   * A map to store form data.
   * @type {observable.map}
   */
  mapStore = observable.map();

  /**
   * The root store.
   * @type {object}
   */
  rootStore;

  /**
   * The server configuration.
   * @type {object}
   */
  SERVER;

  /**
   * The offline storage.
   * @type {object}
   */
  offlineStorage;

  /**
   * Constructs a new formsDomainStore object.
   * @param {object} rootStore - The root store.
   * @param {object} offlineStorage - The offline storage.
   * @param {object} SERVER - The server configuration.
   */
  constructor(rootStore, offlineStorage, SERVER) {
    this.rootStore = rootStore;
    if (offlineStorage) {
      this.offlineStorage = offlineStorage;
    }
    this.SERVER = SERVER;
  }

  /**
   * Gets the model data.
   * @param {string} modelName - The name of the model.
   * @param {boolean} refresh - Whether to refresh the data.
   * @returns {Promise} A promise that resolves with the model data.
   */
  //@action
  getModel(modelName, refresh) {
    //cached data, you don't have to hit up the end point
    if (this.mapStore.get(modelName) && !refresh) {
      return;
    }
    return this.offlineStorage.getItem("jwtToken").then(token => {
      return axios
        .get(`${this.SERVER.host}:${this.SERVER.port}/${modelName}/forms`, {
          params: { token }
        })
        .then(res => {
          runInAction(() => {
            this.mapStore.set(modelName, res.data);
          });
        })
        .catch(err => {
          runInAction(() => {});
        });
    });
  }

  /**
   * Sets the error.
   * @param {Error} err - The error object.
   */
  //@action
  setError(err) {
    console.error(err);
  }
}
const injectProps = (formsDomainStore, modelName, props, child) => {
  let injected = {
    form: formsDomainStore.mapStore.get(modelName),
    ...props,
    ...child.props
  };

  injected[`${modelName}_form`] = formsDomainStore.mapStore.get(modelName);

  return injected;
};
//determine the theme here and load the right login information?
//@observer
export class Forms extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}
  componentWillReceiveProps(nextProps) {}
  componentDidUpdate() {}
  render() {
    let { modelName, children, formsDomainStore } = this.props;
    if (modelName) {
      formsDomainStore.getModel(modelName, false);
    }
    console.log("rerender forms services", modelName);
    const childrenWithProps = React.Children.map(children, child => {
      let injectedProps = injectProps(
        formsDomainStore,
        modelName,
        this.props,
        child
      );
      return React.cloneElement(child, injectedProps);
    });
    return <React.Fragment>{childrenWithProps}</React.Fragment>;
  }
}
