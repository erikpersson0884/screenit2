import './CreateEventPopup.css';
import React from 'react';
import Modal from '@/components/modal/Modal';

import { useAuthContext } from "@/contexts/AuthContext";
import { useEventContext } from '@/contexts/EventContext';
import { useModalContext } from '@/contexts/ModalContext';

const CreateEventPopup = () => {
    const { isAuthenticated } = useAuthContext();
    const { createEvent } = useEventContext();
    const { closeModal } = useModalContext();

    const [image, setImage] = React.useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
    const [date, setDate] = React.useState<string>("");
    const [eventName, setEventName] = React.useState<string>("");

    const [ errorText, setErrorText ] = React.useState<string>("");

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

        if (!image) {
            setErrorText("Please select an image for the event.");
            return;
        } else if (!date) {
            setErrorText("Please select a date for the event.");
            return;
        } else {
            setErrorText("");
        }

        const success = await createEvent(new Date(date), eventName, image);
        if (success) {
            closeModal();
        } else setErrorText("Failed to create event. Please try again.");
    };

    if (!isAuthenticated) return <p className="uploadEventDiv popupbox">You must be logged in to upload new posts</p>;
    else return (
        <form className="create-event-popup popup" onSubmit={uploadEventHandler} onClick={(e) => e.stopPropagation()}>
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
            { errorText && <p className='error'>{errorText}</p> }
        </form>
    )
};

export default CreateEventPopup;