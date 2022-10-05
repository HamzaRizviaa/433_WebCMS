import axiosInstance from '../axiosInstance';

class GamesLibraryService {
	static getGamesApi = (endPoint) => axiosInstance.get(`/${endPoint}`);

	static getLabelsApi = () => axiosInstance.get(`/label/all-labels`);

	static getSpecificGameApi = (id) =>
		axiosInstance.get(
			`${process.env.REACT_APP_API_ENDPOINT}/games/get-specific-game/${id}`
		);
}

export default GamesLibraryService;
