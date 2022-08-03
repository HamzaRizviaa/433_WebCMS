// import React from 'react';

export const checkEmptyIG = (data) => {
	const filteredData = data.filter((item) => item.element_type === 'IG');
	const validatedData = filteredData.map((item) => {
		if (item.data) {
			return !item.data[0].ig_post_url ? false : true;
		} else {
			return false;
		}
	});
	return validatedData.every((item) => item === true);
};

export const checkNewElementMedia = (elements, data) => {
	let result = [];
	if (data.length === 0) {
		result.push(true);
	} else {
		for (let i = 0; i < elements?.length; i++) {
			if (elements.length === data.length) {
				if (data[i].data && data[i]?.data[0].file_name !== '') {
					if (data[i]?.data[0]?.file_name === elements[i]?.file_name) {
						result.push(true);
					} else {
						result.push(false);
					}
				} else {
					result.push(true);
				}
			} else {
				return !checkEmptyMedia(data);
			}
		}
	}
	return result.every((item) => item === true);
};

export const checkEmptyMedia = (data) => {
	const filteredData = data.filter((item) => item.element_type === 'MEDIA');
	const validatedData = filteredData.map((item) => {
		if (item.data) {
			return !item.data[0]?.media_url ? false : true;
		} else {
			return false;
		}
	});
	return validatedData.every((item) => item === true);
};

export const checkNewElementDescription = (elements, data) => {
	let result = [];
	if (data.length === 0) {
		result.push(true);
	} else {
		for (let i = 0; i < elements?.length; i++) {
			// let sortOrder = elements[i].sort_order - 1;
			if (elements.length === data.length) {
				if (data[i].data && data[i]?.data[0].description !== '') {
					if (data[i]?.data[0]?.description === elements[i]?.description) {
						result.push(true);
					} else {
						result.push(false);
					}
				} else {
					result.push(true);
				}
			} else {
				return !checkEmptyDescription(data);
			}
		}
	}
	return result.every((item) => item === true);
};

export const checkEmptyDescription = (data) => {
	const filteredData = data.filter((item) => item.element_type === 'TEXT');
	const validatedData = filteredData.map((item) => {
		if (item.data) {
			return !item.data[0].description ? false : true;
		} else {
			return false;
		}
	});
	return validatedData.every((item) => item === true);
};

export const checkEmptyTwitter = (data) => {
	const filteredData = data.filter((item) => item.element_type === 'TWITTER');
	const validatedData = filteredData.map((item) => {
		if (item.data) {
			return !item.data[0].twitter_post_url ? false : true;
		} else {
			return false;
		}
	});
	return validatedData.every((item) => item === true);
};

export const checkNewElementTwitter = (elements, data) => {
	let result = [];
	if (data.length === 0) {
		result.push(true);
	} else {
		for (let i = 0; i < elements?.length; i++) {
			if (elements.length === data.length) {
				if (data[i].data && data[i]?.data[0].twitter_post_url !== '') {
					if (
						data[i]?.data[0]?.twitter_post_url === elements[i]?.twitter_post_url
					) {
						result.push(true);
					} else {
						result.push(false);
					}
				} else {
					result.push(true);
				}
			} else {
				return !checkEmptyTwitter(data);
			}
		}
	}
	return result.every((item) => item === true);
};

export const checkNewElementIG = (elements, data) => {
	let result = [];
	if (data.length === 0) {
		result.push(true);
	} else {
		for (let i = 0; i < elements?.length; i++) {
			if (elements.length === data.length) {
				if (data[i].data && data[i]?.data[0].ig_post_url !== '') {
					if (data[i]?.data[0]?.ig_post_url === elements[i]?.ig_post_url) {
						result.push(true);
					} else {
						result.push(false);
					}
				} else {
					result.push(true);
				}
			} else {
				return !checkEmptyIG(data);
			}
		}
	}
	return result.every((item) => item === true);
};

export const checkEmptyQuestion = (data) => {
	const filteredData = data.filter((item) => item.element_type === 'QUESTION');
	const validatedData = filteredData.map((item) => {
		if (item.data) {
			return (
				item?.data?.question &&
				(item?.data?.answers?.length === 2
					? item?.data?.answers.every((everyItem) => everyItem?.answer !== '')
					: false) &&
				item?.data?.labels?.length > 6 &&
				item?.data?.uploadedFiles?.length
			);
		} else {
			return false;
		}
	});
	return validatedData.every((item) => item === true);
};

const checkDuplicateLabel = (specificArticle, form) => {
	console.log('specificArticle,', specificArticle, form);
	let formLabels = form?.labels?.map((formL) => {
		return specificArticle?.labels?.includes(formL.name);
	});
	return formLabels.some((label) => label === false);
};

export const checkNewElementQuestion = (elements, data) => {
	let result = [];
	if (data.length === 0) {
		result.push(true);
	} else {
		for (let i = 0; i < elements?.length; i++) {
			if (elements.length === data.length) {
				if (data[i].data) {
					if (
						data[i]?.data.question === elements[i]?.question &&
						data[i]?.data.answers[0].answer ===
							elements[i]?.answers[0].answer &&
						data[i]?.data.answers[1].answer ===
							elements[i]?.answers[1].answer &&
						data[i]?.data.dropbox_url === elements[i].dropbox_url &&
						data[i]?.data.labels.length === elements[i].labels.length &&
						!checkDuplicateLabel(elements, data)
					) {
						result.push(true);
					} else {
						result.push(false);
					}
				} else {
					result.push(true);
				}
			} else {
				return !checkEmptyQuestion(data);
			}
		}
	}
	return result.every((item) => item === true);
};
