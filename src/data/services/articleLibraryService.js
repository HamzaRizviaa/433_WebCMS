import axiosInstance from "../axiosInstance";

class ArticleLibraryService {
	static getAllArticlesServiceCall = (endPoint) =>
		axiosInstance.get(`/${endPoint}`);

	static getLabelsApi = () => axiosInstance.get(`/label/all-labels`);

	static getSpecificArticleApi = (id) =>
		axiosInstance.get(`/article/get-specific-article/${id}`);

	static getArticleMainCategoriesApi = () =>
		axiosInstance.get(`/article/get-main-categories`);

	static getArticleSubCategoriesApi = (id) =>
		axiosInstance.get(`/article/get-sub-categories/${id}`);
}

export default ArticleLibraryService;
