import { default as WebApp } from '@twa-dev/sdk'

export default useAsyncStorageGetSingleItem = () => {
	return (key) => {
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
};