declare global {
    interface User {
        id: string;
        gammaId: string;
        username: string;
        createdAt: Date;
        updatedAt: Date;
        role: Role;
        isAdmin: boolean;
        groups: Group[];
    }

    interface Group {
        id: string;
        name: string;
        prettyName: string;
        superGroupId: string;
    }

    type Role = 'user' | 'admin';

    interface IEvent {
        id: string;
        name: string;
        date: Date;
        imagePath: string;
        createdAt: Date;
        updatedAt: Date;
        createdById: string;
        byGroups: Group[];
    }
}

export {};
