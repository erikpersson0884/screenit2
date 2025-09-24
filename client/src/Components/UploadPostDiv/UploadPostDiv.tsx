import './UploadPostDiv.css';
import React from 'react';

import { useAuthContext } from "../../Contexts/AuthContext";
import { useGalleryContext } from '../../Contexts/GalleryContext';

const UploadPostDiv = () => {
    const { isLoggedIn } = useAuthContext();
    const { showUpload, setShowUpload } = useGalleryContext();

    const [image, setImage] = React.useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
    const [date, setDate] = React.useState<string>("");
    const [eventName, setEventName] = React.useState<string>("");

    const imageChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;

        if (!files) {
            return;
        }

        setImage(files[0]);
    };

    React.useEffect(() => {
        if (!image) {
            return;
        }

        const fileReader = new FileReader();
        fileReader.onload = () => {
            setPreviewUrl(fileReader.result as string);
        };

        fileReader.readAsDataURL(image);
    }, [image]);

    const uploadPostHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!image || !date || !eventName) {
            return;
        }

        const formData = new FormData();
        formData.append("image", image);
        formData.append("date", date);
        formData.append("eventName", eventName);

        fetch(import.meta.env.VITE_API_URL + "/images/upload", {
            method: "POST",
            body: formData,
        })
            .then((response) => {
                if (response.ok) {
                    console.log("Post uploaded successfully");
                    setShowUpload(false);
                } else {
                    console.log("Failed to upload post");
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    if (!showUpload) return null;

    if (isLoggedIn) return (
        <form className="upload-post-div popupbox" onSubmit={uploadPostHandler}>
            <h2>Upload Post</h2>

            <hr />

            <div
                style={{
                    backgroundImage: previewUrl ? `url(${previewUrl})` : undefined
                }}
                className='postImagePreview'
                onClick={() => document.getElementById('uploadNewPostImageInput')?.click()}
            ></div>
            <input id="uploadNewPostImageInput" type="file" onChange={e => imageChangeHandler(e)} />

            <hr />

            <div className='input-group'>
                <label htmlFor="date">Date</label>
                <input type="date" onChange={(e) => setDate(e.target.value)}/>
            </div>

            <div className='input-group'>
                <label htmlFor="event">Event name</label>
                <input type="text" placeholder="Event name" onChange={(e) => setEventName(e.target.value)}/>
            </div>

            <button type="submit">Upload</button>
        </form>
    )

    else return (
        <p  className="uploadPostDiv popupbox">You must be logged in to upload new posts</p>
    );
};

export default UploadPostDiv;