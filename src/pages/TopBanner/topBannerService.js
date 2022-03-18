import axios from 'axios';
import { getLocalStorageDetails } from '../../utils';

export default class TopBannerService {
	static getBannerContentApi(endPoint) {
		return axios.get(`${process.env.REACT_APP_API_ENDPOINT}/${endPoint}`, {
			headers: {
				Authorization: `Bearer ${getLocalStorageDetails()?.access_token}`
			}
		});
	}
	static getAllBannersApi(type) {
		return axios.get(
			`${process.env.REACT_APP_API_ENDPOINT}/top-banner/get-banners/${type}`,
			{
				headers: {
					Authorization: `Bearer ${getLocalStorageDetails()?.access_token}`
				}
			}
		);
	}
}
