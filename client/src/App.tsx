import { BrowserRouter, Route, Routes } from "react-router-dom";

import './App.css'
import Navigation from './components/navigation/Navigation.tsx';
import Gallery from './pages/gallery/Gallery.tsx';

import { AuthProvider } from './contexts/authContext.tsx';
import { EventProvider } from './contexts/eventContext.tsx';
import { UsersProvider } from './contexts/usersContext.tsx';

import { GalleryProvider } from './contexts/galleryContext.tsx';
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
