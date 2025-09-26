import api from './axiosInstance';

const authApi = {
    login: async (username: string, password: string): Promise<string> => {
        const response = await api.post('/auth/login', { username, password });
        return response.data.token;
    }
};

export default authApi;
