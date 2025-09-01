import './UploadPostDiv.css';
import React from 'react';

import { useAuthContext } from "../../Contexts/AuthContext";
import PopupDiv from "../PopupDiv/PopupDiv";
import { useLocation } from "react-router-dom";

const UploadPostDiv = () => {
    const { isLoggedIn } = useAuthContext();
    const location = useLocation();

    if (location.pathname !== "/upload") {
        return null;
    }

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
                } else {
                    console.log("Failed to upload post");
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }


    return (
        <PopupDiv>
            {!isLoggedIn ? (
                <div className="uploadPostDiv">
                    <h1>Upload Post</h1>
                    <div className='postImagePreview'>

                    </div>
                    <form>
                        <input type="file" onChange={e => imageChangeHandler(e)} />

                        <div className='inputDiv'>
                            <label htmlFor="date">Date</label>
                            <input type="date" />
                        </div>

                        <div className='inputDiv'>
                            <label htmlFor="event">Event name</label>
                            <input type="text" placeholder="Event name" />
                        </div>

                        <button>Upload</button>
                    </form>
                </div>
            ) : (
                <p>You must be logged in to upload new posts</p>
            )}
        </PopupDiv>
    );
};

export default UploadPostDiv;