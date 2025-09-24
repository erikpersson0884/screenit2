export interface IUser {
    id: string;
    username: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    role: "admin" | "user";
}

export default IUser;
