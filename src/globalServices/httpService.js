import axios from 'axios';
import { getLocalStorageDetails } from '../utils';

const { REACT_APP_API_ENDPOINT } = process.env;

const accessToken = getLocalStorageDetails()?.access_token;

const http = axios.create({
	baseURL: REACT_APP_API_ENDPOINT,
	...(!!accessToken && {
		headers: {
			Authorization: `Bearer ${accessToken}`
		}
	})
});

export function setAccessTokenInHeader(token) {
	if (token) {
		http.defaults.headers.Authorization = `Bearer ${token}`;
	} else {
		delete http.defaults.headers.Authorization;
	}
}

export default http;
