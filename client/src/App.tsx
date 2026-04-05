import { BrowserRouter, Route, Routes } from "react-router-dom";

import './App.css'
import Navigation from './components/navigation/Navigation.tsx';
import Gallery from './pages/gallery/Gallery.tsx';
import OAuthCallback from './pages/OAuthCallback/OAuthCallback.tsx';

import { AuthProvider } from './contexts/AuthContext.tsx';
import { EventProvider } from './contexts/EventContext.tsx';
import { UsersProvider } from './contexts/UsersContext.tsx';

import { GalleryProvider } from './contexts/GalleryContext.tsx';
import Footer from "./layout/Footer/Footer.tsx";

function App() {
    return (
        <>
            <UsersProvider>
                <AuthProvider>
                <EventProvider>
                <GalleryProvider>
                    <BrowserRouter>
                        <Navigation />
                        <Routes>
                            <Route path="/" element={<Gallery />}></Route>
                            <Route path="/oauth/callback" element={<OAuthCallback />}></Route>
                        </Routes>
                    </BrowserRouter>
                </GalleryProvider>
                </EventProvider>
                </AuthProvider>
            </UsersProvider>    
            <Footer />
        </>
    )
}

export default App
