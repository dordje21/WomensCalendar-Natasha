import { default as WebApp } from '@twa-dev/sdk'

function asyncStorageGetItem(key) {
  return new Promise((resolve, reject) => {
    WebApp.CloudStorage.getItem(key, (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(data);
    });
  });
};

export default asyncStorageGetItem;