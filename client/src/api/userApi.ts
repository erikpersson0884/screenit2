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

    createUser: async (username: string, password: string) => {
        try {
            const body = {
                username,
                password,
            }
            const response = await api.post('/user', body);
            return response.data;
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    },

    updateUser: async (userId: string, username?: string, password?: string) => {
        try {
            const body: { username?: string; password?: string } = {};
            if (username !== undefined) {
                body.username = username;
            }
            if (password !== undefined) {
                body.password = password;
            }
            const response = await api.patch(`/user/${userId}`, body);
            return response.data;
        } catch (error) {
            console.error('Error updating user:', error);
            throw error;
        }
    },

    deleteUser: async (userId: string) => {
        try {
            const response = await api.delete(`/user/${userId}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting user:', error);
            throw error;
        }
    },
};

export default userApi;
