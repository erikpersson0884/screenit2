declare global {
    interface User {
        id: string;
        username: string;
        createdAt: Date;
        updatedAt: Date;
        role: Role;
        isAdmin: boolean;
    }

    type Role = 'user' | 'admin';

    interface IEvent {
        id: string;
        name: string;
        date: Date;
        imagePath: string;
        createdAt: Date;
        updatedAt: Date;
        createdBy: string;
    }
}

export {};
