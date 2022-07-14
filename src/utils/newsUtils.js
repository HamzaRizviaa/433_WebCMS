export const checkEmptyMediaNews = (news) => {
	const validateNews = news.map((item) => {
		if (item?.data) {
			return !item?.data[0]?.media_url ? false : true;
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

export const checkNewElementNEWS = (specificNews, news) => {
	let result = [];
	if (news.length === 0) {
		result.push(true);
	} else {
		for (let i = 0; i < specificNews?.slides?.length; i++) {
			if (specificNews.slides?.length === news.length) {
				if (news[i]?.data && news[i]?.data[0]?.file_name !== '') {
					if (
						news[i]?.data[0]?.file_name ===
							specificNews?.slides[i]?.file_name &&
						news[i]?.data[0]?.dropbox_url ===
							specificNews?.slides[i]?.dropbox_url &&
						news[i]?.data[0]?.title === specificNews?.slides[i]?.title &&
						news[i]?.data[0]?.description ===
							specificNews?.slides[i]?.description &&
						news[i]?.data[0]?.name === specificNews?.slides[i]?.name
					) {
						result.push(true);
					} else {
						result.push(false);
					}
				} else {
					result.push(true);
				}
			} else {
				return !checkEmptyMediaNews(news);
			}
		}
	}
	return result.every((item) => item === true);
};

export const checkSortOrderOnEdit = (specificNews, news) => {
	let result = [];
	for (let i = 0; i < news?.length; i++) {
		result.push(specificNews.slides[i].sort_order === news[i].sort_order);
	}
	return result.some((item) => item === false);
};
