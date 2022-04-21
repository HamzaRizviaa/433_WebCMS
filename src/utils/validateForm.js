const validateForm = (form) => {
	var validate = Object.keys(form).map((key) => {
		console.log(typeof form['end_date'], 'typeof form[key]');
		if (typeof form[key] === 'string') {
			if (key === 'dropbox_url') {
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
