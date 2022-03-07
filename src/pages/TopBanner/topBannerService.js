import axios from 'axios';
import { getLocalStorageDetails } from '../../utils';

export default class TopBannerService {
	static getBannerContentApi() {
		return axios.get(
			`${process.env.REACT_APP_API_ENDPOINT}/top-banner/get-content`,
			{
				headers: {
					Authorization: `Bearer ${getLocalStorageDetails()?.access_token}`
				}
			}
		);
	}
}
