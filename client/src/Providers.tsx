import React from "react";

import { AuthProvider } from './contexts/AuthContext.tsx';
import { EventProvider } from './contexts/EventContext.tsx';
import { UsersProvider } from './contexts/UsersContext.tsx';

import { GalleryProvider } from './contexts/GalleryContext.tsx';


const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <UsersProvider>
            <AuthProvider>
                <GalleryProvider>
                    <EventProvider>
                        {children}
                    </EventProvider>
                </GalleryProvider>
            </AuthProvider>
        </UsersProvider>
    )
}

export default Providers;
