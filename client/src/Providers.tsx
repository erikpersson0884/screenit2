import React from "react";

import { AuthProvider } from './contexts/AuthContext.tsx';
import { EventProvider } from './contexts/EventContext.tsx';
import { UsersProvider } from './contexts/UsersContext.tsx';
import { GalleryProvider } from './contexts/GalleryContext.tsx';
import { ModalProvider } from './contexts/ModalContext.tsx';
import { NotificationProvider } from "./contexts/NotificationContext.tsx";

const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <NotificationProvider>
            <UsersProvider>
                <AuthProvider>
                    <GalleryProvider>
                        <EventProvider>
                            <ModalProvider>
                                {children}
                            </ModalProvider>
                        </EventProvider>
                    </GalleryProvider>
                </AuthProvider>
            </UsersProvider>
        </NotificationProvider>
    )
}

export default Providers;
