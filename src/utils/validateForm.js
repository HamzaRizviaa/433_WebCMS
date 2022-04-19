const validateForm = (form) => {
	var validate = Object.keys(form).map((key) => {
		if (typeof form[key] === 'string') {
			return !form[key] ? true : false;
		}
		if (typeof form[key] === 'object') {
			// array check
			if (key === 'labels') {
				return form[key]?.length < 10 ? true : false;
			} else {
				return form[key]?.length === 0 ? true : false;
			}
		}
		return true; // for non - mandatory fields
	});
	console.log(
		validate.every((item) => item === true),
		'validate'
	);
	return validate.every((item) => item === true);
};

export default validateForm;
