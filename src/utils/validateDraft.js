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
				if (key === 'media_id') {
					if (form[key] !== null) {
						return true;
					} else {
						return false;
					}
				}
				// if (form['mediaToggle']) {
				// 	return true;
				// }
				return false;
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
			if (key === 'mediaToggle') {
				return false;
			} else if (form[key] === true) {
				return false;
			} else {
				return true;
			}
		}
	});

	return validate.some((item) => item === true);
};

export default validateDraft;
