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
			if (
				item?.data?.question &&
				(item?.data?.answers?.length === 2
					? item?.data?.answers.every((everyItem) => everyItem?.answer !== '')
					: false) &&
				item?.data?.labels?.length > 6 &&
				item?.data?.uploadedFiles?.length
			) {
				return true;
			}
		} else {
			return false;
		}
	});
	return validatedData.every((item) => item === true);
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
						data[i]?.data?.dropbox_url ===
							elements[i]?.question_data?.dropbox_url &&
						(data[i]?.data?.uploadedFiles
							? data[i]?.data?.uploadedFiles[0]?.file_name ===
							  elements[i]?.question_data?.file_name
							: false)
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

const checkDuplicateLabel = (specificArticleElements, data) => {
	let dataLabels = data?.labels?.map((dataL) => {
		return specificArticleElements?.question_data?.labels?.includes(dataL.name);
	});

	return dataLabels.some((label) => label === false);
};

export const checkEmptyQuestionDraft = (data) => {
	const filteredData = data.filter((item) => item.element_type === 'QUESTION');
	const validatedData = filteredData.map((item) => {
		if (item.data) {
			if (
				item?.data?.question ||
				(item?.data?.answers?.length > 0 && item?.data?.answers[0]?.answer
					? item?.data?.answers[0]?.answer != ''
					: false) ||
				(item?.data?.answers?.length > 0 && item?.data?.answers[1]?.answer
					? item?.data?.answers[1]?.answer != ''
					: false) ||
				item?.data?.labels?.length > 0 ||
				item?.data?.dropbox_url ||
				item?.data?.uploadedFiles?.length
			) {
				return true;
			}
		} else {
			return false;
		}
	});

	return validatedData.every((item) => item === true);
};

export const checkNewElementQuestionDraft = (elements, data) => {
	let result = [];
	if (data.length === 0) {
		result.push(true);
	} else {
		for (let i = 0; i < elements?.length; i++) {
			if (elements.length === data.length) {
				if (data[i].data) {
					if (
						data[i]?.data?.question === elements[i]?.question_data?.question &&
						(data[i]?.data?.answers?.length > 0 &&
						data[i]?.data?.answers[0]?.answer
							? data[i]?.data?.answers[0]?.answer ===
							  elements[i]?.question_data?.answers[0]?.answer
							: true) &&
						(data[i]?.data?.answers?.length > 0 &&
						data[i]?.data?.answers[1]?.answer
							? data[i]?.data?.answers[1]?.answer ===
							  elements[i]?.question_data?.answers[1]?.answer
							: true) &&
						data[i]?.data?.dropbox_url ===
							elements[i]?.question_data?.dropbox_url &&
						(data[i]?.data?.uploadedFiles
							? data[i]?.data?.uploadedFiles[0]?.file_name ===
							  elements[i]?.question_data?.file_name
							: elements[i]?.question_data?.file_name &&
							  !data[i]?.data?.uploadedFiles
							? false
							: true) &&
						data[i]?.data?.labels?.length ===
							elements[i]?.question_data?.labels?.length &&
						!checkDuplicateLabel(elements[i], data[i]?.data)
					) {
						result.push(true);
					} else {
						result.push(false);
					}
				} else {
					result.push(true);
				}
			} else {
				return !checkEmptyQuestionDraft(data);
			}
		}
	}
	return result.every((item) => item === true);
};

export const checkMatchPublishAndDraft = (elements, data) => {
	console.log('compare validations', elements, data);
	let isSame = true;

	// if (elements?.length === data?.length) return true;
	if (data?.length <= 0) return false;
	for (let i = 0; i < data.length; i++) {
		const editedElement = data[i];
		const apiElement = elements[i];
		if (apiElement?.match_id !== editedElement?.data?.match?.value?.trim()) {
			isSame = false;
			return false;
		}
	}
	// console.log(isSame);
	return isSame;
};
export const checkEmptyMatchPublishAndDraft = (data) => {
	console.log('empty validatoin', data);
	if (data.length <= 0) return true;
	let isEmpty = true;
	for (let i = 0; i < data.length; i++) {
		const element = data[i];
		if (!element?.data?.match?.value?.trim()) {
			isEmpty = false;
			return false;
		}
	}
	console.log(isEmpty);
	return isEmpty;
};
