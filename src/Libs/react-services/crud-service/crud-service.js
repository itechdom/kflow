import { observer } from "mobx-react";
import { observable, action, runInAction, toJS } from "mobx";
import React from "react";
import axios from "axios";

//export store
export class crudDomainStore {
  modelName;
  mapStore = observable.map();
  rootStore;
  SERVER;
  offlineStorage;
  notificationDomainStore;
  constructor(rootStore, offlineStorage, SERVER, notificationDomainStore) {
    this.rootStore = rootStore;
    this.notificationDomainStore = notificationDomainStore;
    if (offlineStorage) {
      this.offlineStorage = offlineStorage;
    }
    this.SERVER = SERVER;
  }
  forceUpdate(modelName) {
    return action(() => {
      let current = this.mapStore.get(modelName);
      this.mapStore.set(modelName, []);
      this.mapStore.set(modelName, current);
    });
  }
  getModel = action((query, modelName, refresh, transform) => {
    //cached data, you don't have to hit up he end point
    if (this.mapStore.get(modelName) && !refresh) {
      return;
    }
    return this.offlineStorage
      .getItem("jwtToken")
      .then((token) => {
        return axios
          .get(
            `${this.SERVER.host}:${this.SERVER.port}/${modelName}/paginate/1/10`,
            {
              params: { token, query },
            }
          )
          .then((res) => {
            runInAction(() => {
              this.mapStore.set(modelName, res.data);
            });
          })
          .catch((err) => {
            this.setError(modelName, err);
          });
      })
      .catch((err) => {
        return this.setError(modelName, err);
      })
  });
  createModel(modelName, model) {
    return action(() => this.offlineStorage.getItem("jwtToken").then((token) => {
      return axios
        .post(`${this.SERVER.host}:${this.SERVER.port}/${modelName}/create`, {
          model,
          token,
        })
        .then((res) => {
          let current = this.mapStore.get(modelName) || [model];
          this.mapStore.set(modelName, [...current, res.data]);
          this.setSuccess(modelName, `${modelName} successfully created!`);
          return res.data;
        })
        .catch((err) => {
          console.error(`Create ${modelName} failed!`, err);
          return this.setError(modelName, err);
        });
    }));
  }
  updateModel(modelName, model, updateValues) {
    let extractedModel = toJS(model);
    console.log("here");
    Object.keys(updateValues).map((key) => {
      model[key] = updateValues[key];
    });
    return action(() => this.offlineStorage.getItem("jwtToken").then((token) => {
      return axios
        .put(`${this.SERVER.host}:${this.SERVER.port}/${modelName}`, {
          model,
          token,
        })
        .then((res) => {
          let updatedModel = this.mapStore
            .get(modelName)
            .map((cModel) => (cModel._id === model._id ? model : cModel));
          this.mapStore.set(modelName, updatedModel);
          this.setSuccess(modelName, `${modelName} successfully updated!`);
          return res.data;
        })
        .catch((err) => {
          console.log("err", err);
          return this.setError(modelName, err);
        });
    }));
  }
  deleteModel(modelName, model) {
    model.deleted = true;
    this.forceUpdate(modelName);
    return action(() => this.offlineStorage.getItem("jwtToken").then((token) => {
      return axios
        .delete(
          `${this.SERVER.host}:${this.SERVER.port}/${modelName}/${model._id}`,
          {
            params: { token },
          }
        )
        .then((res) => {
          this.setSuccess(modelName, `${modelName} successfully deleted!`);
          return res.data;
        })
        .catch((err) => {
          return this.setError(modelName, err);
        });
    }));
  }
  searchModel(modelName, query) {
    return action(() => this.offlineStorage.getItem("jwtToken").then((token) => {
      return axios
        .post(`${this.SERVER.host}:${this.SERVER.port}/${modelName}/search`, {
          query,
          token,
        })
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          return this.setError(modelName, err);
        });
    }));
  }
  setError(modelName, err) {
    console.log("ERROR", err);
    if (this.notificationDomainStore) {
      return action(() => this.notificationDomainStore.saveNotification(modelName, {
        message: err && err.response && err.response.data.message,
        type: "error",
      }));
    }
  }
  setSuccess(modelName, successMessage) {
    if (this.notificationDomainStore) {
      return action(() => this.notificationDomainStore.saveNotification(modelName, {
        message: successMessage,
        type: "success",
      }));
    }
  }
  getAppSettings() {
    return action(() => this.offlineStorage.getItem("jwtToken").then((token) => {
      return axios
        .get(`${this.SERVER.host}:${this.SERVER.port}/settings`, {
          params: { token },
        })
        .then((res) => {
          runInAction(() => {
            this.mapStore.set("settings", res.data);
          });
          return res.data[0];
        })
        .catch((err) => {
          this.setError("settings", err);
        });
    }));
  }
}

const injectProps = (
  crudDomainStore,
  modelName,
  props,
  child,
  query
) => {
  let injected = {
    getModel: (query) =>
      crudDomainStore.getModel(query, modelName, true),
    createModel: (model) => crudDomainStore.createModel(modelName, model),
    updateModel: (model, updateValues) =>
      crudDomainStore.updateModel(modelName, model, updateValues),
    deleteModel: (model) => crudDomainStore.deleteModel(modelName, model),
    query: query,
    ...props,
    ...child.props,
  };

  injected[modelName] = crudDomainStore.mapStore.get(modelName);
  injected[`${modelName}_getModel`] = (query) => {
    crudDomainStore.getModel(query, modelName, true);
  };
  injected[`${modelName}_createModel`] = (model) =>
    crudDomainStore.createModel(modelName, model);

  injected[`${modelName}_updateModel`] = (model, updateValues) =>
    crudDomainStore.updateModel(modelName, model, updateValues);

  injected[`${modelName}_deleteModel`] = (model) =>
    crudDomainStore.deleteModel(modelName, model);

  injected[`${modelName}_searchModel`] = (query) =>
    crudDomainStore.searchModel(modelName, query);

  injected[`searchModels`] = (modelNames, query) => {
    let promises = modelNames.map((modelName) => {
      return crudDomainStore.searchModel(modelName, query).then((res) => {
        return { modelName, res };
      });
    });
    return promises;
  };

  injected[`${modelName}_query`] = query;

  return injected;
};

//determine the theme here and load the right login information?
class CrudCl extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() { }
  componentWillReceiveProps(nextProps) { }
  componentDidUpdate() { }
  render() {
    let {
      modelName,
      children,
      crudDomainStore,
      skipLoadOnInit,
      query,
      transform,
    } = this.props;
    if (modelName && !skipLoadOnInit) {
      crudDomainStore.getModel(query, modelName, false);
    }
    const childrenWithProps = React.Children.map(children, (child) => {
      let injectedProps = injectProps(
        crudDomainStore,
        modelName,
        this.props,
        child,
        query,
        transform
      );
      return React.cloneElement(child, injectedProps);
    });
    return <>{childrenWithProps}</>;
  }
}
export const CrudOld = observer(CrudCl);

class CrudContainer extends React.Component {
  constructor(props) {
    super(props);
    this.stores = {};
  }
  componentDidMount() { }
  componentWillReceiveProps(nextProps) {
  }
  componentDidUpdate() { }
  render() {
    let {
      modelName,
      url,
      children,
      skipLoadOnInit,
      crudDomainStore,
      offlineStorage,
      SERVER,
      notificationDomainStore,
      query,
      paginate,
      render,
    } = this.props;
    if (modelName && !skipLoadOnInit) {
      crudDomainStore.getModel(query, modelName, false);
    }
    const childrenWithProps = render
      ? render(
        injectProps(
          crudDomainStore,
          modelName,
          this.props,
          {},
          null,
          query
        )
      )
      : React.Children.map(children, (child) => {
        let injectedProps = injectProps(
          crudDomainStore,
          modelName,
          this.props,
          child,
          query
        );
        return React.cloneElement(child, { ...injectedProps });
      });
    return <React.Fragment>{childrenWithProps}</React.Fragment>;
  }
}

export const Crud = observer(CrudContainer);

export function withCrud(WrappedComponent) {
  class WithCrud extends React.Component {
    constructor(props) {
      super(props);
    }
    componentDidMount() {
      let { modelName, crudDomainStore, query } = this.props;
      crudDomainStore.getModel(query, modelName, false);
    }
    componentWillReceiveProps() { }
    render() {
      let { modelName, crudDomainStore, query, transform } = this.props;
      let injectedProps = injectProps(
        crudDomainStore,
        modelName,
        this.props,
        this,
        query,
        transform
      );
      return <WrappedComponent {...injectedProps} />;
    }
  }
  return observer(WithCrud);
}
