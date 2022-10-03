import axios from 'axios';
import { getLocalStorageDetails } from './utils';

const instance = axios.create({
	baseURL: process.env.REACT_APP_API_ENDPOINT,
	responseType: 'json'
});

export const setAccessTokenInHeader = (token) => {
	if (token) {
		instance.defaults.headers.Authorization = `Bearer ${token}`;
	} else {
		delete instance.defaults.headers.Authorization;
	}
};

instance.interceptors.request.use(
	function (config) {
		config.headers['Authorization'] = `Bearer ${
			getLocalStorageDetails()?.access_token
		}`;
		return config;
	},
	function (error) {
		// Do something with request error
		return Promise.reject(error);
	}
);

export default instance;
