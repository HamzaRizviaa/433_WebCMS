import axiosInstance from '../axiosInstance';

const sortKeysMapping = {
	rule: 'rule',
	rule_type: 'ruletype',
	geo_block: 'geoblock',
	geo_block_time: 'geoblocktime',
	age_restriction: 'agerestriction',
	tier: 'tier',
	post_date: 'postdate',
	last_edit: 'lastedit'
};

class RuleLibraryService {
	static getRules() {
		return axiosInstance.get('/rules');
	}

	/**
	 * This function is responsible for the creation of a single rule
	 * @param {Object} data - The data field contains the properties of a rule
	 * @returns Promise of the AxiosResponse Object
	 */
	static postRule(data) {
		return axiosInstance.post('/rules/create-rule', data, {
			params: {
				api_version: 2
			}
		});
	}
	static getAllRulesServiceCall(queryParams) {
		const params = {
			...queryParams,
			limit: 20,
			sort_by: sortKeysMapping[queryParams.sort_by] || null
		};

		return axiosInstance.get('/rules/all-rules', { params });
	}
}

export default RuleLibraryService;
