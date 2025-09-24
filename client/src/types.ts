export interface Post {
    id: string;
    eventName: string;
    path: string;
    date: string;
    creationDate: string;
    createdBy: string;
}


export interface User {
    id: string;
    username: string;
    type: "admin" | "pr";
}
