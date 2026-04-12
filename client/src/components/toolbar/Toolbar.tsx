import React from 'react';
import './Toolbar.css';
import { useAuthContext } from '@/contexts/AuthContext';
import { useGalleryContext } from '@/contexts/GalleryContext';
import { useModalContext } from "@/contexts/ModalContext";

import CreateEventPopup from '@/components/createEventPopup/CreateEventPopup';
import GallerySettings from '@/components/gallerySettings/GallerySettings';
import AccountPopup from '@/components/accountPopup/AccountPopup';


interface ToolBarButtonProps {
    buttonText: string;
    popupToOpen: JSX.Element;
}

const ToolBarButton: React.FC<ToolBarButtonProps> = ({ buttonText, popupToOpen }) => {
    const { openModal, closeModal, modalIsOpen, modalContent } = useModalContext();

    const handleButtonClick = () => {
        if (modalIsOpen) closeModal();
        if (modalContent !== popupToOpen) openModal(popupToOpen);
    };

    return (
        <button onClick={handleButtonClick}>
            {buttonText}
        </button>
    );
}

const Navigation: React.FC = () => {
    const { isAuthenticated, authenticate } = useAuthContext();

    return (
        <div className='toolbar'>
            {isAuthenticated && (
                <ToolBarButton buttonText="Create Event" popupToOpen={<CreateEventPopup />} />
            )}

            <ToolBarButton buttonText='Settings' popupToOpen={<GallerySettings />} />

            { isAuthenticated ?
                <ToolBarButton buttonText="Account" popupToOpen={<AccountPopup />} /> :
                <button onClick={authenticate}>Login</button>
            }
        </div>
    );
}

export default Navigation;