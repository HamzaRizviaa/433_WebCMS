const validateDraft = (form) => {
	var validate = Object.keys(form).map((key) => {
		if (key === 'mainCategory' || key === 'subCategory') {
			return false;
		}
		if (typeof form[key] === 'string') {
			return !form[key] ? false : true;
		}
		if (typeof form[key] === 'object') {
			// array check
			if (key === 'end_date') {
				// for question end_Date field
				return !form[key] ? false : true;
			}
			if (form[key] === null) {
				if (form['mediaToggle']) {
					return false;
				} else {
					return true;
				}
			}
			if (Array.isArray(form[key])) {
				if (key === 'labels') {
					return form[key]?.length < 1 ? false : true;
				} else {
					return form[key]?.length === 0 ? false : true;
				}
			} else {
				return validateDraft(form[key]);
			}
		}
		if (typeof form[key] === 'boolean') {
			if (form[key] === false) {
				return false;
			} else {
				return true;
			}
		}
	});

	return validate.some((item) => item === true);
};

export default validateDraft;
