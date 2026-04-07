import './CreateEventPopup.css';
import React from 'react';

import { useAuthContext } from "@/contexts/AuthContext";
import { useEventContext } from '@/contexts/EventContext';
import { useModalContext } from '@/contexts/ModalContext';

import groupIcon from "@/assets/group.svg";

const CreateEventPopup = () => {
    const { isAuthenticated, currentUser } = useAuthContext();
    const { createEvent } = useEventContext();
    const { closeModal } = useModalContext();

    const [ image, setImage ] = React.useState<File | null>(null);
    const [ previewUrl, setPreviewUrl ] = React.useState<string | null>(null);
    const [ date, setDate ] = React.useState<string>("");
    const [ eventName, setEventName ] = React.useState<string>("");
    const [ uploadAs, setUploadAs ] = React.useState<string>("user");
    const [ showUploadAsOptions, setShowUploadAsOptions ] = React.useState<boolean>(false);

    const [ errorText, setErrorText ] = React.useState<string>("");

    const imageChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;

        if (!files) {
            return;
        }

        setImage(files[0]);
    };

    React.useEffect(() => {
        if (!image)  return;

        const fileReader = new FileReader();
        fileReader.onload = () => setPreviewUrl(fileReader.result as string);

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

        const success = await createEvent(new Date(date), eventName, image, uploadAs);
        if (success) {
            closeModal();
        } else setErrorText("Failed to create event. Please try again.");
    };

    if (!isAuthenticated || !currentUser) return <p className="uploadEventDiv popupbox">You must be logged in to upload new posts</p>;


    // Components 
    const ImageInput: React.FC = () => (
        <>
            <div
                style={{
                    backgroundImage: previewUrl ? `url(${previewUrl})` : undefined
                }}
                className='postImagePreview'
                onClick={() => document.getElementById('uploadNewEventImageInput')?.click()}
            ></div>
            <input id="uploadNewEventImageInput" type="file" onChange={e => imageChangeHandler(e)} />
        </>
    );

    const DateInput: React.FC = () => (
        <div className='input-group'>
            <label htmlFor="date">Date</label>
            <input type="date" onChange={(e) => setDate(e.target.value)}/>
        </div>
    );

    const EventNameInput: React.FC = () => (
        <div className='input-group'>
            <label htmlFor="event">Event name</label>
            <input type="text" placeholder="Event name" onChange={(e) => setEventName(e.target.value)}/>
        </div>
    );

    // Upload as options
    const UploadAsOptions: React.FC = () => (
        <ul className="radio-group upload-as">
            <li className='radio-group' onClick={() => setUploadAs("user")}>
                <input
                    type="radio"
                    name="uploadAs"
                    value={"user"}
                    checked={uploadAs === "user"}
                    onChange={(e) => setUploadAs(e.target.value)}
                />
                <label className={uploadAs === "user" ? "selected-option" : undefined}>{currentUser.username}</label>
            </li>

            <UploadAsGroup />

            {uploadAs !== "user" && <CommiteeOptions />}
        </ul>
    );

    const UploadAsGroup: React.FC = () => {
        const isSeleted = uploadAs !== "user";
        if (currentUser.groups.length === 0) return null;
        else return (
            <li className='radio-group' onClick={() => setUploadAs(currentUser.groups[0].id)}>
                <input
                    type="radio"
                    name="uploadAs"
                    value={currentUser.groups[0].id}
                    checked={isSeleted}
                    onChange={(e) => setUploadAs(e.target.value)}
                />
                <label className={isSeleted ? "selected-option" : undefined}>Group</label>
            </li>
        );
    };

    const CommiteeOptions: React.FC = () => (
        <li className='commitees'>
            <ul>
                {currentUser.groups.map(group => (
                    <li key={group.id} className='radio-group' onClick={() => setUploadAs(group.id)}>
                        <input
                            type="radio"
                            name="uploadAsCommitee"
                            value={group.id}
                            checked={uploadAs === group.id}
                            onChange={(e) => setUploadAs(e.target.value)}
                        />
                        <label className={uploadAs === group.id ? "selected-option" : undefined}>{group.prettyName}</label>
                    </li>
                ))}
            </ul>
        </li>
    );

    return (
        <form className="create-event-popup popup" onSubmit={uploadEventHandler} onClick={(e) => e.stopPropagation()}>
            <h2>Upload Event</h2>
            <hr />
            <ImageInput />
            <hr />
            <DateInput />
            <EventNameInput />
            
            {showUploadAsOptions ? 
                <UploadAsOptions /> 
                :
                <div className='open-upload-as-option' onClick={() => setShowUploadAsOptions(true)}>
                    <img src={groupIcon} alt="Change icon" height={21} />
                    <p>Upload as group</p>
                </div>
            }
                
            {/* <hr />
            <h3>Upload as:</h3>
            <UploadAsOptions /> */}

            <button type="submit">Upload</button>
            { errorText && <p className='error'>{errorText}</p> }
        </form>
    )
};

export default CreateEventPopup;
