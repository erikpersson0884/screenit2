import React from 'react';
import './Toolbar.css';
import { useAuthContext } from '@/contexts/AuthContext';
import { useGalleryContext } from '@/contexts/GalleryContext';
import { useModalContext } from "@/contexts/ModalContext";
import { Link, useLocation  } from 'react-router-dom';

import CreateEventPopup from '@/components/createEventPopup/CreateEventPopup';
import GallerySettings from '@/components/gallerySettings/GallerySettings';
import AccountPopup from '@/components/accountPopup/AccountPopup';

const TOOLBAR_VISIBILITY_TIMEOUT = 2_000; // 5 seconds

interface ToolBarButtonProps {
    buttonText: string;
    popupToOpen: JSX.Element;
}

const ToolBarButton: React.FC<ToolBarButtonProps> = ({ buttonText, popupToOpen }) => {
    const { openModal, closeModal, modalIsOpen, modalContent } = useModalContext();


    const handleButtonClick = () => {
        if (!modalIsOpen) {
            openModal(popupToOpen);
        } else if (
            React.isValidElement(modalContent) &&
            modalContent.type === popupToOpen.type
        ) {
            closeModal();
        } else {
            openModal(popupToOpen);
        }
    };

    return (
        <button onClick={handleButtonClick}>
            {buttonText}
        </button>
    );
}

const Navigation: React.FC = () => {
    const { isAuthenticated, currentUser, authenticate } = useAuthContext();
    const { modalIsOpen } = useModalContext();
    const { autoHideToolbar, setAutoHideToolbar } = useGalleryContext();

    const [ toolBarIsHidden, setToolBarIsHidden ] = React.useState<boolean>(false);

    const location = useLocation();
    const isAdminPage = location.pathname === '/admin';

    React.useEffect(() => {
        let inactivityTimeout: NodeJS.Timeout;

        const handleMouseActivity = () => {
            setToolBarIsHidden(false);
            clearTimeout(inactivityTimeout);

            inactivityTimeout = setTimeout(() => {
                if (!modalIsOpen && autoHideToolbar) {
                    setToolBarIsHidden(true);
                }
            }, TOOLBAR_VISIBILITY_TIMEOUT);
        };

        window.addEventListener('mousemove', handleMouseActivity);

        inactivityTimeout = setTimeout(() => {
            if (!modalIsOpen && autoHideToolbar) {
                setToolBarIsHidden(true);
            }
        }, TOOLBAR_VISIBILITY_TIMEOUT);

        return () => {
            window.removeEventListener('mousemove', handleMouseActivity);
            clearTimeout(inactivityTimeout);
        };
    }, [modalIsOpen, autoHideToolbar]);

    if (isAdminPage) return (
        <div className='toolbar'>
            <Link to="/">
                <button>Back to Gallery</button>
            </Link>
        </div>
    );

    return (
        <div className={"toolbar" + (toolBarIsHidden ? " hidden" : "")}>
            {isAuthenticated && (
                <ToolBarButton buttonText="Create Event" popupToOpen={<CreateEventPopup />} />
            )}

            <ToolBarButton buttonText='Settings' popupToOpen={<GallerySettings />} />

            { currentUser && currentUser.role == "admin" && 
                <button>
                    <Link to="/admin">Admin</Link>
                </button>
            }

            { isAuthenticated ?
                <ToolBarButton buttonText="Account" popupToOpen={<AccountPopup />} /> :
                <button onClick={authenticate}>Login</button>
            }
        </div>
    );
}

export default Navigation;