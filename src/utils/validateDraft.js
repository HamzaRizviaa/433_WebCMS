const validateDraft = (form, dataElements, newsElement, quesElement) => {
	var validate = Object.keys(form).map((key) => {
		if (key === 'mainCategory' || key === 'subCategory') {
			return false;
		}

		if (typeof form[key] === 'string') {
			if (key === 'author_text') {
				if (form[key] === '433 Team') {
					return false;
				} else {
					return true;
				}
			} else {
				return !form[key] ? false : true;
			}
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
				} else if (key === 'author_image') {
					if (form[key][0].file) {
						return true;
					} else {
						return false;
					}
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

	var validateData; //article draft validate
	var validateNews; // news draft validate
	var validateQuestion; //question draft validate
	var finalDraftValue;

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
						dataFile?.data?.question ||
						dataFile?.data?.dropbox_url ||
						dataFile?.data?.labels?.length > 0 ||
						dataFile?.data?.uploadedFiles?.length ||
						(dataFile?.data?.answers?.length > 0
							? dataFile?.data?.answers.some((item) => item?.answer !== '')
							: false)
					);
				}
			} else {
				if (dataFile.data) {
					return dataFile?.data[0]?.twitter_post_url;
				}
			}
		});
		finalDraftValue = validateData;
	} else if (newsElement?.length) {
		validateNews = newsElement.every((newsItem) => {
			if (newsItem?.data) {
				return (
					newsItem?.data[0]?.media_url ||
					newsItem?.data[0]?.title ||
					newsItem?.data[0]?.description ||
					newsItem?.data[0]?.name ||
					newsItem?.data[0]?.dropbox_url
				);
			}
		});
		finalDraftValue = validateNews;
	} else if (quesElement?.length) {
		validateQuestion = quesElement.every((quesItem) => {
			if (quesItem?.data) {
				return (
					quesItem?.data[0]?.media_url ||
					quesItem?.data[0]?.question ||
					quesItem?.data[0]?.answers?.length > 0 ||
					quesItem?.data[0]?.labels?.length > 0 ||
					quesItem?.data[0]?.dropbox_url
				);
			}
		});
		finalDraftValue = validateQuestion;
	} else if (
		(dataElements?.length === 0 ||
			dataElements === undefined ||
			dataElements === null) &&
		(newsElement?.length === 0 ||
			newsElement === undefined ||
			newsElement === null) &&
		(quesElement?.length === 0 ||
			quesElement === undefined ||
			quesElement === null)
	) {
		finalDraftValue = validate.some((item) => item === true);
	}

	return finalDraftValue;
};

export default validateDraft;
