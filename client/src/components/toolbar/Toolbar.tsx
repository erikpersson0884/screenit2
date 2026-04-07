import React from 'react';
import './Toolbar.css';
import { useAuthContext } from '@/contexts/AuthContext';
import { useGalleryContext } from '@/contexts/GalleryContext';
import { useModalContext } from "@/contexts/ModalContext";

import CreateEventPopup from '@/components/createEventPopup/CreateEventPopup';
import GallerySettings from '@/components/gallerySettings/GallerySettings';
import AccountPopup from '@/components/accountPopup/AccountPopup';

const Navigation: React.FC = () => {
    const { isAuthenticated, authenticate } = useAuthContext();
    const { openModal, closeModal } = useModalContext();

    return (
        <div className='toolbar'>
            {isAuthenticated && <button onClick={() => openModal(<CreateEventPopup />)}>Upload</button>}

            <button onClick={() => openModal(<GallerySettings />)}>Settings</button>

            <button onClick={isAuthenticated ? () => openModal(<AccountPopup />) : authenticate}>
                {isAuthenticated ? 'Account' : 'Login'}  
            </button>
        </div>
    );
}

export default Navigation;