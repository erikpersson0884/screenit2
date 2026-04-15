declare global {
    interface User {
        id: string;
        gammaId: string;
        username: string;
        createdAt: Date;
        updatedAt: Date;
        role: Role;
        blocked: boolean;
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
    type EventType = 'userCreated' | 'chalmersIT';

    interface IEvent {
        id: string;
        name: string;
        date: Date;
        imagePath: string;
        createdAt: Date;
        updatedAt: Date;
        createdById: string;
        visible: boolean;
        type: EventType;
        byGroups: Group[];
    }
}

export {};
