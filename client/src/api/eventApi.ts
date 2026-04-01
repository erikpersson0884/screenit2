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

    createEvent: async (date: Date, name: string, imageFile: File) => {
        const eventData = new FormData();
        eventData.append("image", imageFile);
        eventData.append("date", date.toISOString());
        eventData.append("eventName", name);

        try {
            const response = await api.post('/event', eventData);
            return response.data;
        } catch (error) {
            console.error('Error creating event:', error);
            throw error;
        }
    },

    updateEvent: async (eventId: string, eventData: Partial<IEvent>) => {
        try {
            const response = await api.put(`/event/${eventId}`, eventData);
            return response.data;
        } catch (error) {
            console.error('Error updating event:', error);
            throw error;
        }
    },

    deleteEvent: async (eventId: string) => {
        try {
            const response = await api.delete(`/event/${eventId}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting event:', error);
            throw error;
        }
    },
};

export default eventApi;
