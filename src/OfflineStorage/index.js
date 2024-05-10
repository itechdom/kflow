export const offlineStorage = {
  getItem: (key) => {
    return new Promise((resolve, reject) => resolve(localStorage.getItem(key)));
  },
  setItem: (key, value) => {
    return new Promise((resolve, reject) => resolve(localStorage.setItem(key, value)));
  },
};