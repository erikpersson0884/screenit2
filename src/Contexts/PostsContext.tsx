import React from "react";
import { Post, User, AdminKey} from "../types";

type PostsContextType = {
    posts: Post[];
};

const PostsContext = React.createContext<PostsContextType | undefined>(undefined);

const PostsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [posts, setPosts] = React.useState<Post[]>([]);

    return (
        <PostsContext.Provider value={{ posts }}>
            {children}
        </PostsContext.Provider>
    );
};

const usePostsContext = () => {
    const context = React.useContext(PostsContext);
    if (context === undefined) {
        throw new Error("usePosts must be used within a PostsProvider");
    }
    return context;
};

export { PostsProvider, usePostsContext };