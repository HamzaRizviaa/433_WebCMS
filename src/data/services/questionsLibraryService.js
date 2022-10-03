import axiosInstance from "../axiosInstance";

class QuestionsLibraryService {
	static getQuestionApi = (endPoint) => axiosInstance.get(`/${endPoint}`);

	static getQuizLabelsApi = () => axiosInstance.get(`/label/all-labels`);

	static getQuestionEditApi = (endPoint) =>
		axiosInstance.get(`/${endPoint}`);
}

export default QuestionsLibraryService;
