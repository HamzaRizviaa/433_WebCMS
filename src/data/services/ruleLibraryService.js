import axiosInstance from '../axiosInstance';

// const sortKeysMapping = {
// 	rule: 'rule',
// 	rule_type: 'ruletype',
// 	geo_block: 'geoblock',
// 	geo_block_time: 'geoblocktime',
// 	age_restriction: 'agerestriction',
// 	tier: 'tier',
// 	post_date: 'postdate',
// 	last_edit: 'lastedit'
// };

class RuleLibraryService {
	static getRules() {
		return axiosInstance.get('/rules');
	}
}

export default RuleLibraryService;
