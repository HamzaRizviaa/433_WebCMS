const validateForm = (form) => {
	var validate = Object.keys(form).map((key) => {
		if (typeof form[key] === 'string') {
			if (key === 'dropbox_url') {
				return true;
			}
			return !form[key] ? false : true;
		}
		if (typeof form[key] === 'object') {
			// array check
			if (key === 'labels') {
				return form[key]?.length < 10 ? false : true;
			} else {
				return form[key]?.length === 0 ? false : true;
			}
		}
		return true; // for non - mandatory fields
	});
	return validate.every((item) => item === true);
};

export default validateForm;
