export const checkEmptyMediaNews = (news) => {
	const validateNews = news.map((item) => {
		if (item.data) {
			return !item.data[0].media_url ? false : true;
		} else {
			return false;
		}
	});
	return validateNews.every((item) => item === true);
};

export const comparingNewsFields = (specificNews, form) => {
	return (
		specificNews?.show_likes === form.show_likes &&
		specificNews?.show_comments === form.show_comments
	);
};
