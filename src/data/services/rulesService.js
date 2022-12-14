import axiosInstance from '../axiosInstance';

class RuleService {
	static getRules() {
		return axiosInstance.get('/rules');
	}
}

export default RuleService;
