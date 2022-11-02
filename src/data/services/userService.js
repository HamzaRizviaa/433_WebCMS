import axiosInstance from '../axiosInstance';

class UserService {
    static async logout() {
        const response = await axiosInstance.post('/cmsuser/logout')
        return response
    }
}

export default UserService;