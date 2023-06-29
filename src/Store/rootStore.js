//Store config
import config from "../config/index";
// import { offlineStorage } from "Orbital";
import {
  Crud,
  Media,
  Forms,
  Notification,
  EventWithCrud,
  authDomainStore,
  authUiStore,
  socketDomainStore,
  adminDomainStore,
  mediaDomainStore,
  formsDomainStore,
  notificationDomainStore,
  crudDomainStore
} from "Libs/react-services";
import Store from "./Store";
const rootStore = new Store({
  authDomainStore,
  authUiStore,
  crudDomainStore,
  socketDomainStore,
  adminDomainStore,
  mediaDomainStore,
  formsDomainStore,
  notificationDomainStore,
  skipAuth: true,
  config,
  offlineStorage: {
    getItem: key => {
      return new Promise((resolve, reject) => {
        return resolve(localStorage.getItem(key));
      });
    },
    setItem: (key, value) => {
      return new Promise((resolve, reject) => {
        return resolve(localStorage.setItem(key, value));
      });
    },
    removeItem: key => {
      return new Promise((resolve, reject) => {
        return resolve(localStorage.removeItem(key));
      });
    }
  }
});

export default rootStore;
