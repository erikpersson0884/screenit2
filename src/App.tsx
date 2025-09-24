import { BrowserRouter, Route, Routes } from "react-router-dom";

import './App.css'
import Navigation from './Components/Navigation/Navigation.tsx';
import Gallery from './Components/Gallery/Gallery.tsx';

import { AuthProvider } from './Contexts/AuthContext.tsx';
import { PostsProvider } from './Contexts/PostsContext.tsx';

import { GalleryProvider } from './Contexts/GalleryContext.tsx';
import Footer from "./Components/Footer/Footer.tsx";

function App() {
    return (
        <>
            <AuthProvider>
            <PostsProvider>
            <GalleryProvider>
                <BrowserRouter>
                    <Navigation />
                    <Routes>
                        <Route path="/" element={<Gallery />}></Route>
                    </Routes>
                </BrowserRouter>
            </GalleryProvider>
            </PostsProvider>
            </AuthProvider>

            <Footer />
        </>
    )
}

export default App
