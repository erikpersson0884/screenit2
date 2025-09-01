import React from 'react';
import './PostsDisplay.css';
import { useGalleryContext } from '../../../Contexts/GalleryContext';
import { usePostsContext } from '../../../Contexts/PostsContext';

const defaultPostImage = 'images/pixelnheart.png';

const PostsDisplay: React.FC = () => {

    const { postDisplayTime, postIndex, setPostIndex } = useGalleryContext();
    const { posts } = usePostsContext();

    const [postImagePath, setPostImagePath] = React.useState<string>(defaultPostImage); 

    React.useEffect(() => {
        const interval = setInterval(() => {
            setPostIndex((postIndex + 1) % posts.length);
            if (posts.length > 0) {
                setPostImagePath(posts[postIndex].path);
            } else {
                setPostImagePath(defaultPostImage);
            }
        }, postDisplayTime);
        return () => clearInterval(interval);
    }, [postIndex, posts.length, postDisplayTime]);

    
    return (
        <div className="postsDisplay">
            <img src={postImagePath} alt="post image" width={300}/>
        </div>
    );
};

export default PostsDisplay;