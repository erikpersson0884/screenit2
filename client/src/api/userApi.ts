import api from './axiosInstance';

export const userApi = {
    fetchUsers: async () => {
        try {
            const response = await api.get('/user');
            return response.data;
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error;
        }
    },

    getCurrentUser: async () => {
        try {
            const response = await api.get('/user/me');
            return response.data;
        }
        catch (error: unknown) {
            if (error instanceof Error && (error as any).response && (error as any).response.status === 401) {
                return null; // User is not authenticated
            } else {
                throw error;
            }
        }
    },

    fetchUserById: async (userId: string) => {
        try {
            const response = await api.get(`/user/${userId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching user by ID:', error);
            throw error;
        }
    },
};

export default userApi;
