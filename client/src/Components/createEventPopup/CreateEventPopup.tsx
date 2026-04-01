import './createEventPopup.css';
import React from 'react';

import { useAuthContext } from "../../contexts/AuthContext";
import { useGalleryContext } from '../../contexts/GalleryContext';
import { useEventContext } from '../../contexts/EventContext';

const UploadEventDiv = () => {
    const { isAuthenticated } = useAuthContext();
    const { showUpload, setShowUpload } = useGalleryContext();
    const { createEvent } = useEventContext();

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

    const uploadEventHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!image || !date || !eventName) {
            return;
        }
        const success = await createEvent(new Date(date), eventName, image);
        if (success) {
            setShowUpload(false);
        } 
        // else {
        //     alert("Failed to upload event. Please try again.");
        // }
    };

    if (!showUpload) return null;

    if (isAuthenticated) return (
        <form className="upload-post-div popupbox" onSubmit={uploadEventHandler}>
            <h2>Upload Event</h2>

            <hr />

            <div
                style={{
                    backgroundImage: previewUrl ? `url(${previewUrl})` : undefined
                }}
                className='postImagePreview'
                onClick={() => document.getElementById('uploadNewEventImageInput')?.click()}
            ></div>
            <input id="uploadNewEventImageInput" type="file" onChange={e => imageChangeHandler(e)} />

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
        <p  className="uploadEventDiv popupbox">You must be logged in to upload new posts</p>
    );
};

export default UploadEventDiv;