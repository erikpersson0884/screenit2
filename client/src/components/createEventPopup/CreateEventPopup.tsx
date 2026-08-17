import './CreateEventPopup.css';
import React from 'react';

import { useAuthContext } from "@/contexts/AuthContext";
import { useEventContext } from '@/contexts/EventContext';
import { useModalContext } from '@/contexts/ModalContext';
import { useNotificationContext } from '@/contexts/NotificationContext';

import groupIcon from "@/assets/group.svg";

const CreateEventPopup = () => {
    const { isAuthenticated, currentUser } = useAuthContext();
    const { createEvent } = useEventContext();
    const { closeModal } = useModalContext();
    const { notify } = useNotificationContext();

    const [ image, setImage ] = React.useState<File | null>(null);
    const [ previewUrl, setPreviewUrl ] = React.useState<string | null>(null);
    const [ date, setDate ] = React.useState<string>("");
    const [ eventName, setEventName ] = React.useState<string>("");
    const [ uploadAs, setUploadAs ] = React.useState<string>("user");
    const [ showUploadAsOptions, setShowUploadAsOptions ] = React.useState<boolean>(false);

    const [ errorText, setErrorText ] = React.useState<string>("");
    const fileInputRef = React.useRef<HTMLInputElement>(null);

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

        return () => {
            fileReader.abort();
        };
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

        const success = await createEvent(new Date(date), eventName, image, uploadAs === "user" ? [] : [uploadAs]);
        if (success) {
            closeModal();
            notify("Event created successfully!", "success");
        } else setErrorText("Failed to create event. Please try again.");
    };

    if (!isAuthenticated || !currentUser) return <p className="uploadEventDiv popupbox">You must be logged in to upload new posts</p>;


    const ImageInput: React.FC = () => {
        const handleClick = () => fileInputRef.current?.click();
        const handleDragOver = (e: React.DragEvent) => {
            e.preventDefault();
            e.currentTarget.classList.add('drag-over');
        };
        const handleDragLeave = (e: React.DragEvent) => {
            e.currentTarget.classList.remove('drag-over');
        };
        const handleDrop = (e: React.DragEvent) => {
            e.preventDefault();
            e.currentTarget.classList.remove('drag-over');
            const file = e.dataTransfer.files[0];
            if (file) setImage(file);
        };

        return (
            <div
                className={`dropzone${image ? ' has-file' : ''}`}
                onClick={handleClick}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                >
                <div className="dropzone-text">
                    {image ? image.name : 'Drop photo here, or browse'}
                </div>
                <div className="dropzone-sub">
                    {image ? `${(image.size / 1024 / 1024).toFixed(1)} MB` : 'JPG or PNG, up to 20MB'}
                </div>
                {previewUrl && <img className="dropzone-preview" src={previewUrl} alt="" />}
                <input
                    ref={fileInputRef}
                    type="file"
                    id="poster-image-upload"
                    accept="image/*"
                    onChange={imageChangeHandler}
                />
            </div>
        );
    };

    const DateInput: React.FC = () => (
        <div className='input-group'>
            <label htmlFor="date">Date</label>
            <input 
                type="date" 
                onChange={(e) => setDate(e.target.value)}
                value={date}
            />
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
        const isSelected = uploadAs !== "user";
        if (currentUser.groups.length === 0) return null;
        else return (
            <li
                className='radio-group'
                onClick={() => {
                    if (uploadAs === "user") setUploadAs(currentUser.groups[0].id);
                }}
            >
                <input
                    type="radio"
                    name="uploadAs"
                    value={currentUser.groups[0].id}
                    checked={isSelected}
                    onChange={(e) => setUploadAs(e.target.value)}
                />
                <label className={isSelected ? "selected-option" : undefined}>Group</label>
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
                            readOnly
                        />
                        <label className={uploadAs === group.id ? "selected-option" : undefined}>{group.prettyName}</label>
                    </li>
                ))}
            </ul>
        </li>
    );

    return (
        <form className="create-event-popup popup" onSubmit={uploadEventHandler} onClick={(e) => e.stopPropagation()}>
            <header>
                <h2>Upload Poster</h2>
                <label htmlFor="poster-image-upload">Add photos to the poster</label>
            </header>
            <ImageInput />
          
            <DateInput />

            {
                // Event name input (cannot be its own component because of the error text that needs to be shown)
            }
            <div className='input-group'>
                <label htmlFor="event">Event name</label>
                <input 
                    type="text" 
                    placeholder="Event name" 
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                />
            </div>
            
            {showUploadAsOptions ? 
                <UploadAsOptions /> 
                :
                <div className='open-upload-as-option' onClick={() => setShowUploadAsOptions(true)}>
                    <img src={groupIcon} alt="Change icon" height={21} />
                    <p>Upload as group</p>
                </div>
            }

            <button type="submit" className='upload-button'>Upload</button>
            { errorText && <p className='error'>{errorText}</p> }
        </form>
    )
};

export default CreateEventPopup;
