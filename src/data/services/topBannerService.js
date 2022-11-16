import axiosInstance from '../axiosInstance';

class TopBannerService {
	static getBannerContentApi(queryParams) {
		return axiosInstance.get('/top-banner/get-content', {
			params: queryParams
		});
	}

	static getAllBannersApi(type) {
		return axiosInstance.get(`/top-banner/get-banners/${type}`);
	}

	static postTopBanner(data) {
		return axiosInstance.post('/top-banner/publish-banner', data);
	}
}

export default TopBannerService;
