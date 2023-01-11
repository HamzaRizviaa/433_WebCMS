import axiosInstance from '../axiosInstance';

const sortKeysMapping = {
	rule: 'rule',
	post_date: 'postdate',
	last_edit: 'lastedit'
};

/**
 * ViralLibraryService Class which holds all the functions
 * for calling the crud operation apis for rules with the axios service
 * @class
 */
class RuleLibraryService {
	/**
	 * This function is responsible for the fetching of all rules
	 * @param {*} queryParams
	 * @returns Promise of the AxiosResponse Object
	 */
	static getAllRulesServiceCall(queryParams) {
		const params = {
			...queryParams,
			limit: 20,
			sort_by: sortKeysMapping[queryParams.sort_by] || null
		};

		return axiosInstance.get('/rules/all-rules', { params });
	}

	/**
	 * This function is responsible for the fetching of a single rule
	 * @param {string} id - The id of a rule
	 * @returns Promise of the AxiosResponse Object
	 */
	static getSpecificRuleApi(id) {
		return axiosInstance.get(`/rules/edit/${id}`);
	}

	/**
	 * This function is responsible for the creation of a single rule
	 * @param {Object} data - The data field contains the properties of a rule
	 * @returns Promise of the AxiosResponse Object
	 */
	static postRule(data) {
		return axiosInstance.post('/rules/add-rule', data, {
			params: {
				api_version: 2
			}
		});
	}

	/**
	 * This function is responsible for the deletion of a single rule
	 * @param {Object} data - The data field contains the rule_id and is_draft properties
	 * @returns Promise of the AxiosResponse Object
	 */
	static deleteViral(data) {
		return axiosInstance.post('/rule/delete-rule', data);
	}
}

export default RuleLibraryService;
