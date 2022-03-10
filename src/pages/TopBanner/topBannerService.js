import axios from 'axios';
import { getLocalStorageDetails } from '../../utils';

export default class TopBannerService {
	static getBannerContentApi(type, title) {
		return axios.get(
			`${process.env.REACT_APP_API_ENDPOINT}/top-banner/get-content?type=${type}&title=${title}`,
			{
				headers: {
					Authorization: `Bearer ${getLocalStorageDetails()?.access_token}`
				}
			}
		);
	}
	static getAllBannersApi(type) {
		console.log(type, 'type');
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
