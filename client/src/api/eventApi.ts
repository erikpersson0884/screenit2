import api from './axiosInstance';

const convertToClientEvents = (serverEvents: any): IEvent[] => {
    const clientEvents: IEvent[] = serverEvents.map((event: any) => ({
        ...event,
        id: String(event.id),
        date: new Date(event.date),
        createdAt: new Date(event.createdAt),
        name: String(event.name),
        imagePath: String(event.imagePath),
        byGroups: event.byGroups.map((group: any) => ({
            id: String(group.id),
            name: String(group.name),
            prettyName: String(group.prettyName),
            superGroupId: String(group.superGroupId),
        })),
    }));

    return clientEvents;
}

export const eventApi = {
    fetchEvents: async (): Promise<IEvent[]> => {
        try {
            const response = await api.get('/event');
            return convertToClientEvents(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error;
        }
    },

    createEvent: async (date: Date, name: string, imageFile: File, groupIds: string[]) => {
        const eventData = new FormData();
        eventData.append("image", imageFile);
        eventData.append("date", date.toISOString());
        eventData.append("name", name);
        eventData.append("groupIds", JSON.stringify(groupIds));

        try {
            const response = await api.post('/event', eventData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data
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
