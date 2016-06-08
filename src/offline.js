import localforage from 'localforage';
import {isNumber} from 'lodash'

const setOfflineData = (data, expiracy) => {
	if (!isNumber(expiracy)) {
		return Promise.reject("expiracy must be a number");
	}
	return localforage.setItem("offlineData", {expires: Date.now() + expiracy, data: data});
};

const getOfflineData = () => {
	return localforage.getItem("offlineData")
	.then((result) => (!result || (Date.now() - result.expires) >= 0 )? null: result.data)
};

export { setOfflineData, getOfflineData };