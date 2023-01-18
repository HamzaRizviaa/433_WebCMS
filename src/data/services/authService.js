import axiosInstance from '../axiosInstance';

class AuthService {
	static async verifyGoogleUser(tokenId) {
		const { data } = await axiosInstance.post('/cmsuser/verify-google-user', {
			token: tokenId
		});

		return data;
	}

	static async logout() {
		const { data } = await axiosInstance.post('/cmsuser/logout');
		return data;
	}

	static setUserDataInLocalStorage(data) {
		localStorage.setItem('user_data', JSON.stringify(data));
	}

	static setTokenExpiryDateInLocalStorage(expiryDate) {
		localStorage.setItem('token_expire_time', expiryDate);
	}

	static removeTokenFromLocalStorage() {
		localStorage.removeItem('user_data');
		localStorage.removeItem('token_expire_time');
	}
}

export default AuthService;
