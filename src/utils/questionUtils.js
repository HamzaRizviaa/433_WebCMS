export const checkEmptyQuestion = (question) => {
	console.log(question, 'question');
	const validateQuestion = question.map((item) => {
		console.log(item, 'item in 1st');
		if (item) {
			return (
				item?.uploadedFiles?.length > 0 &&
				item?.question &&
				item?.labels?.length > 6 &&
				(item?.answers?.length > 1
					? item?.answers.every((item) => item?.answer !== '')
					: false)
			);
		} else {
			return false;
		}
	});
	console.log(validateQuestion, 'validateQuestion');
	return validateQuestion.every((item) => item === true);
};

// compare main form data
export const comparingFormFields = (specificQuestion, form) => {
	return specificQuestion?.end_date === form?.end_date;
};

// compare api data and new data
export const checkNewElementQuestion = (specificQuestion, question) => {
	let result = [];
	if (question.length === 0) {
		result.push(true);
	} else {
		for (let i = 0; i < specificQuestion?.questions?.length; i++) {
			if (specificQuestion?.questions?.length === question?.length) {
				if (question[i]?.uploadedFiles[0]?.file_name !== '') {
					console.log(
						question,
						specificQuestion,
						question[i]?.dropbox_url,
						specificQuestion?.questions[i]?.dropbox_url,
						question[i]?.uploadedFiles[0]?.file_name,
						specificQuestion?.questions[i]?.file_name,
						'specificQuestion, question 2'
					);
					if (
						question[i]?.uploadedFiles[0]?.file_name ===
							specificQuestion?.questions[i]?.file_name &&
						'abc' === specificQuestion?.questions[i]?.dropbox_url
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
	console.log(result, 'result');
	return result.every((item) => item === true);
};
