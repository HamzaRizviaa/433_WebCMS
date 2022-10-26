export const checkEmptyQuestion = (question) => {
	const validateQuestion = question.map((item) => {
		if (item?.data) {
			return (
				item?.data[0]?.uploadedFiles?.length > 0 &&
				item?.data[0]?.question &&
				item?.data[0]?.labels?.length > 6 &&
				(item?.data[0]?.answers?.length > 1
					? item?.data[0]?.answers.every((item) => item?.answer !== '')
					: false)
			);
		} else {
			return false;
		}
	});

	return validateQuestion.every((item) => item === true);
};

// compare main form data
export const comparingFormFields = (
	specificQuestion,
	convertedDate,
	form,
	isSummaryEnabled
) => {
	if (isSummaryEnabled) {
		return (
			specificQuestion?.end_date === convertedDate &&
			(specificQuestion?.question_type === 'poll'
				? specificQuestion?.summary?.results === form?.results &&
				  specificQuestion?.summary?.results_dropbox_url ===
						form?.results_dropbox_url &&
				  (specificQuestion?.summary?.results_image || form?.results_image[0]
						? form?.results_image[0]?.file_name ===
						  specificQuestion?.summary?.results_filename
						: true)
				: specificQuestion?.summary?.positive_results === form?.results &&
				  specificQuestion?.summary?.positive_results_dropbox_url ===
						form?.results_dropbox_url &&
				  (specificQuestion?.summary?.positive_results_image ||
				  form?.results_image[0]
						? form?.results_image[0]?.file_name ===
						  specificQuestion?.summary?.positive_results_filename
						: true) &&
				  specificQuestion?.summary?.negative_results ===
						form?.negative_results &&
				  specificQuestion?.summary?.negative_results_dropbox_url ===
						form?.negative_results_dropbox_url &&
				  (specificQuestion?.summary?.negative_results_image ||
				  form?.negative_results_image[0]
						? form?.negative_results_image[0]?.file_name ===
						  specificQuestion?.summary?.negative_results_filename
						: true))
		);
	} else {
		return specificQuestion?.end_date === convertedDate;
	}
};

// compare api data and new data
export const checkNewElementQuestion = (specificQuestion, question) => {
	let result = [];
	if (question?.length === 0) {
		result.push(true);
	} else {
		for (let i = 0; i < specificQuestion?.questions?.length; i++) {
			if (specificQuestion?.questions?.length === question?.length) {
				if (question[i]?.data?.length) {
					if (
						(question[i]?.data[0]?.uploadedFiles
							? question[i]?.data[0]?.uploadedFiles[0]?.file_name ===
							  specificQuestion?.questions[i]?.file_name
							: false) &&
						question[i]?.data[0]?.dropbox_url ===
							specificQuestion?.questions[i]?.dropbox_url
					) {
						result.push(true);
					} else {
						result.push(false);
					}
				} else {
					result.push(true);
				}
			} else {
				return !checkEmptyQuestion(question);
			}
		}
	}

	return result.every((item) => item === true);
};

// D R A F T

export const checkSortOrderOnEdit = (specificQuestion, question) => {
	let result = [];
	for (let i = 0; i < question?.length; i++) {
		result.push(
			specificQuestion.questions[i].sort_order === question[i].sort_order
		);
	}
	return result.some((item) => item === false);
};

const checkDuplicateLabel = (specificQuestion, data) => {
	let dataLabels = data?.labels?.map((dataL) => {
		return specificQuestion?.labels.includes(dataL.name);
	});

	return dataLabels.some((label) => label === false);
};

export const checkEmptyQuestionDraft = (question) => {
	const validateQuestionDraft = question.map((item) => {
		if (item?.data) {
			if (
				item?.data[0]?.uploadedFiles?.length > 0 ||
				item?.data[0]?.question ||
				item?.data[0]?.answers?.length > 0 ||
				item?.data[0]?.labels?.length > 0 ||
				item?.data[0]?.dropbox_url
			) {
				return true;
			}
		} else {
			return false;
		}
	});

	return validateQuestionDraft.every((item) => item === true);
};
export const checkNewElementQuestionDraft = (specificQuestion, question) => {
	let result = [];
	if (question.length === 0) {
		result.push(true);
	} else {
		for (let i = 0; i < specificQuestion?.questions?.length; i++) {
			if (specificQuestion?.questions?.length === question.length) {
				if (question[i]?.data) {
					if (
						(question[i]?.data[0]?.uploadedFiles
							? question[i]?.data[0]?.uploadedFiles[0]?.file_name ===
							  specificQuestion?.questions[i]?.file_name
							: true) &&
						question[i]?.data[0]?.dropbox_url ===
							specificQuestion?.questions[i]?.dropbox_url &&
						question[i]?.data[0]?.labels?.length ===
							specificQuestion?.questions[i]?.labels?.length &&
						!checkDuplicateLabel(
							specificQuestion?.questions[i],
							question[i]?.data[0]
						) &&
						question[i]?.data[0]?.question ===
							specificQuestion?.questions[i]?.question &&
						(question[i]?.data[0]?.answers?.length > 0 &&
						question[i]?.data[0]?.answers[0]?.answer
							? question[i]?.data[0]?.answers[0]?.answer ===
							  specificQuestion?.questions[i]?.answers[0]?.answer
							: true) &&
						(question[i]?.data[0]?.answers?.length > 0 &&
						question[i]?.data[0]?.answers[1]?.answer
							? question[i]?.data[0]?.answers[1]?.answer ===
							  specificQuestion?.questions[i]?.answers[1]?.answer
							: true) &&
						(question[i]?.data[0]?.answers?.length > 0 &&
						question[i]?.data[0]?.answers[2]?.answer
							? question[i]?.data[0]?.answers[2]?.answer ===
							  specificQuestion?.questions[i]?.answers[2]?.answer
							: true) &&
						(question[i]?.data[0]?.answers?.length > 0 &&
						question[i]?.data[0]?.answers[3]?.answer
							? question[i]?.data[0]?.answers[3]?.answer ===
							  specificQuestion?.questions[i]?.answers[3]?.answer
							: true) &&
						question[i]?.data[0]?.answers?.length ===
							specificQuestion?.questions[i]?.answers?.length
					) {
						result.push(true);
					} else {
						result.push(false);
					}
				} else {
					result.push(true);
				}
			} else {
				return !checkEmptyQuestionDraft(question);
			}
		}
	}
	return result.every((item) => item === true);
};
