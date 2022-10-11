const validateForm = (form, dataElements, newsData, quesData) => {
	var validate = Object.keys(form).map((key) => {
		if (typeof form[key] === 'string') {
			if (key.includes('dropbox_url')) {
				return true;
			}
			if (key.includes('landscape_dropbox_url')) {
				return true;
			}
			if (
				key.includes('landscape_image_dropbox_url') ||
				key.includes('image_dropbox_url') ||
				key.includes('media_dropbox_url')
			) {
				return true;
			}

			return !form[key].trim() ? false : true;
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

	var validateData = true; //article
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
			} else if (dataFile.element_type === 'QUESTION') {
				if (dataFile.data) {
					return (
						dataFile?.data?.question &&
						(dataFile?.data?.answers?.length === 2
							? dataFile?.data?.answers.every((item) => item?.answer !== '')
							: false) &&
						dataFile?.data?.labels?.length > 6 &&
						dataFile?.data?.uploadedFiles?.length
					);
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

	//news validate
	var validateNews = true;
	if (newsData?.length) {
		validateNews = newsData.every((item) => {
			// and , sab true - true
			if (item?.data) {
				return item?.data[0]?.media_url;
			}
		});
	} else if (newsData?.length === 0) {
		validateNews = false;
	}

	//question validate
	var validateQuestion = true;
	if (quesData?.length > 0) {
		validateQuestion = quesData.every((item) => {
			if (item?.data) {
				return (
					(item?.data[0]?.uploadedFiles?.length ? true : false) &&
					(item?.data[0]?.question ? true : false) &&
					(item?.data[0]?.labels?.length > 6 ? true : false) &&
					(item?.data[0]?.answers?.length > 1
						? item?.data[0]?.answers.every((item) => item?.answer !== '')
						: false)
				);
			}
		});
	} else if (quesData?.length === 0) {
		validateQuestion = false;
	}

	var finalFormValue =
		validate.every((item) => item === true) &&
		validateData &&
		validateNews &&
		validateQuestion;

	return finalFormValue;
};

export default validateForm;
