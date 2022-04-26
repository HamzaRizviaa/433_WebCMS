const validateForm = (form) => {
	var validate = Object.keys(form).map((key) => {
		if (typeof form[key] === 'string') {
			if (
				key.includes('dropbox_url') ||
				key.includes('media_dropbox_url') ||
				key.includes('image_dropbox_url')
			) {
				return true;
			}
			return !form[key] ? false : true;
		}
		if (typeof form[key] === 'object') {
			// array check
			if (key === 'end_date') {
				// for question end_Date field
				return !form[key] ? false : true;
			}
			if (Array.isArray(form[key])) {
				if (key === 'labels') {
					return form[key]?.length < 10 ? false : true;
				} else {
					return form[key]?.length === 0 ? false : true;
				}
			} else {
				validateForm(form[key]);
			}
		}
		return true; // for non - mandatory fields
	});
	return validate.every((item) => item === true);
};

export default validateForm;
