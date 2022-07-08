const validateForm = (form, dataElements, newsData) => {
	var validate = Object.keys(form).map((key) => {
		if (typeof form[key] === 'string') {
			if (key.includes('dropbox_url')) {
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
			if (form[key] === null) {
				if (form['mediaToggle']) {
					return false;
				} else {
					return true;
				}
			}
			if (Array.isArray(form[key])) {
				if (key === 'labels') {
					return form[key]?.length < 7 ? false : true;
				} else {
					return form[key]?.length === 0 ? false : true;
				}
			} else {
				return validateForm(form[key]);
			}
		}
		if (typeof form[key] === 'boolean') {
			return true; // for non - mandatory fields
		}
	});

	var validateData = true;
	if (dataElements?.length) {
		validateData = dataElements.every((dataFile) => {
			if (dataFile.element_type === 'MEDIA') {
				return dataFile.data;
			} else if (dataFile.element_type === 'TEXT') {
				if (dataFile.data) {
					return dataFile?.data[0]?.description;
				}
			} else if (dataFile.element_type === 'IG') {
				if (dataFile.data) {
					return dataFile?.data[0]?.ig_post_url;
				}
			} else {
				if (dataFile.data) {
					return dataFile?.data[0]?.twitter_post_url;
				}
			}
		});
	} else if (dataElements?.length === 0) {
		validateData = false;
	}

	var validateNews = true;
	console.log(newsData, 'nnn');

	var finalFormValue =
		validate.every((item) => item === true) && validateData && validateNews;

	return finalFormValue;
};

export default validateForm;
