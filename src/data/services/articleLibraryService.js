import axiosInstance from '../axiosInstance';

const sortKeysMapping = {
	article_title: 'title',
	post_date: 'postdate',
	labels: 'label',
	user: 'user',
	last_edit: 'lastedit',
	status: 'status'
};

class ArticleLibraryService {
	static getAllArticlesServiceCall(queryParams) {
		const params = {
			...queryParams,
			limit: 20,
			sort_by: sortKeysMapping[queryParams.sort_by] || null
		};

		return axiosInstance.get('/article/all-articles', { params });
	}

	static getLabelsApi = () => axiosInstance.get(`/label/all-labels`);

	static getSpecificArticleApi = (id) =>
		axiosInstance.get(`/article/get-specific-article/${id}`);

	static getArticleMainCategoriesApi = () =>
		axiosInstance.get(`/article/get-main-categories`);

	static getArticleSubCategoriesApi = (id) =>
		axiosInstance.get(`/article/get-sub-categories/${id}`);
}

export default ArticleLibraryService;
