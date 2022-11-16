import axiosInstance from '../axiosInstance';

class TopBannerService {
	static getBannerContentApi = (endPoint) => axiosInstance.get(`/${endPoint}`);

	static getAllBannersApi = (type) =>
		axiosInstance.get(`/top-banner/get-banners/${type}`);
}

export default TopBannerService;
