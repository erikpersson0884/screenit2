import api from './axiosInstance';

export const eventApi = {
    fetchEvents: async () => {
        try {
            const response = await api.get('/event');
            return response.data;
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error;
        }
    },
};

export default eventApi;
