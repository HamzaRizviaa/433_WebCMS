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

	static postArticle = (data, apiVersion = 5) => {
		return axiosInstance.post(`/article/post-article`, data, {
			params: {
				api_version: apiVersion
			}
		});
	};

	/**
	 * This function is responsible for the deletion of a single article
	 * @param {Object} data - The data field contains the article_id and is_draft properties
	 * @returns Promise of the AxiosResponse Object
	 */
	static deleteArticle = (data) => {
		return axiosInstance.post(`/article/delete-article`, data);
	};

	static getArticleCheckTitle = (title) => {
		return axiosInstance.get(`/article/check/${title}`);
	};

	//
	// Article Template APIs
	//
	static getAllArticleTemplates = (queryParams) => {
		const params = {
			...queryParams,
			limit: 50
		};

		return axiosInstance.get('/article-template', { params });
	};

	static getSpecificArticleTemplate = (templateId) => {
		return axiosInstance.get(`/article-template/get-template/${templateId}`);
	};

	static postArticleTemplate = (data) => {
		return axiosInstance.post(
			`/article-template/create-article-template`,
			data
		);
	};

	static articleTemplateCheckName = (templateName) => {
		return axiosInstance.get(
			`/article-template/check-template-name/${templateName}`
		);
	};

	static deleteArticleTemplate = (templateId) => {
		return axiosInstance.delete(
			`/article-template/delete-template/${templateId}`
		);
	};
}

export default ArticleLibraryService;
