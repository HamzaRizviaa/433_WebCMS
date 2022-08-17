export const checkEmptyMediaQuestions = (news) => {
	const validateNews = news.map((item) => {
		if (item?.data) {
			return !item?.data[0]?.media_url ? false : true;
		} else {
			return false;
		}
	});
	return validateNews.every((item) => item === true);
};
