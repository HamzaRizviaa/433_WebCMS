const validateGamesForm = (type, form, postButtonStatus) => {
	console.log(form?.uploadedFiles.length);
	if (type === 'jogo') {
		const validate =
			!form?.uploadedFiles.length ||
			!form?.orientation ||
			!form?.game_orientation ||
			!form?.uploadedExplanationOrIcon.length ||
			postButtonStatus ||
			!form?.title ||
			!form?.description ||
			!form?.time ||
			!form?.scoring ||
			!form?.objective ||
			!form?.payload;
		return validate;
	} else {
		if (form?.arcade_game_type === 'Outside App') {
			const validate =
				!form?.uploadedFiles.length ||
				!form?.uploadedExplanationOrIcon.length ||
				postButtonStatus ||
				!form?.title ||
				!form?.description ||
				!form?.arcade_game_type ||
				!form?.package_id?.android ||
				!form?.package_id?.ios ||
				!form?.store_url?.play_store ||
				!form?.store_url?.apple_store ||
				!form?.deep_link?.android ||
				!form?.deep_link?.ios;
			return validate;
		} else {
			const validate =
				!form?.uploadedFiles.length ||
				!form?.uploadedExplanationOrIcon.length ||
				postButtonStatus ||
				!form?.title ||
				!form?.description ||
				!form?.arcade_game_type ||
				!form?.game_id;
			return validate;
		}
	}
};

export default validateGamesForm;
