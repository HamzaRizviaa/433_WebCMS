const validateDraftData = (data) => {
	if (data?.length === 0) {
		return false;
	}
	let validate = data?.map((dataItem) => {
		if (!dataItem.data) {
			return true;
		} else {
			if (
				'description' in dataItem.data[0] &&
				dataItem.data[0]?.description === ''
			) {
				return true;
			}
			if (
				'twitter_post_url' in dataItem.data[0] &&
				dataItem.data[0]?.twitter_post_url === ''
			) {
				return true;
			}
			if (
				'ig_post_url' in dataItem.data[0] &&
				dataItem.data[0]?.ig_post_url === ''
			) {
				return true;
			}
			if (
				'file_name' in dataItem.data[0] &&
				dataItem.data[0]?.file_name === ''
			) {
				return true;
			}
			return false;
		}
	});
	console.log('validate array', validate);
	return validate.some((item) => item === true);
};

export default validateDraftData;
