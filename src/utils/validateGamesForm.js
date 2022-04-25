const validateGamesForm = (type, form, postButtonStatus) => {
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
				!form?.android ||
				!form?.ios ||
				!form?.play_store ||
				!form?.apple_store ||
				!form?.play_store_deeplink ||
				!form?.apple_store_deeplink;
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
