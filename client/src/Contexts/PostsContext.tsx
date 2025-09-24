import React from "react";
import { Post} from "../types";

type PostsContextType = {
    posts: Post[];
};

const PostsContext = React.createContext<PostsContextType | undefined>(undefined);

const PostsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [posts, setPosts] = React.useState<Post[]>([]);

    React.useEffect(() => {
        fetch(import.meta.env.VITE_API_URL + "/images/getFutureImages")
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Failed to fetch posts");
                }
            })
            .then((data) => setPosts(data))
            .catch((error) => console.error(error.message));
    }, []);

    console.log(posts)

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