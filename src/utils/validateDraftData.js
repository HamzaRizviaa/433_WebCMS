const validateDraftData = (data) => {
	if (data.length === 0) {
		return false;
	}
	let validate = data.map((dataItem) => {
		if (!dataItem.data) {
			return true;
		} else {
			if (
				dataItem.data[0]?.description &&
				dataItem.data[0]?.description === ''
			) {
				return true;
			}
			if (
				dataItem.data[0]?.twitter_post_url &&
				dataItem.data[0]?.twitter_post_url === ''
			) {
				return true;
			}
			if (
				dataItem.data[0]?.ig_post_url &&
				dataItem.data[0]?.ig_post_url === ''
			) {
				return true;
			}
			if (dataItem.data[0]?.file_name && dataItem.data[0]?.file_name === '') {
				return true;
			}
		}
	});
	console.log(validate);
	return validate.some((item) => item === true);
};

export default validateDraftData;
