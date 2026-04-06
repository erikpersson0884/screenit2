import React from 'react';
import './App.css'

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Providers from './Providers.tsx';
import Navigation from './components/toolbar/Toolbar.tsx';
import Gallery from './pages/gallery/Gallery.tsx';
import OAuthCallback from './pages/OAuthCallback/OAuthCallback.tsx';
import Footer from "./layout/Footer/Footer.tsx";

const reloadInterval = 6 * 60 * 60 * 1000; // 6 hours in milliseconds

function App() {
    React.useEffect(() => {
        const timeoutId = window.setTimeout(() => {
            window.location.reload();
        }, reloadInterval); 

        return () => window.clearTimeout(timeoutId);
    }, []);

    return (
        <>
            <Providers>
                <BrowserRouter>
                    <Navigation />
                    <Routes>
                        <Route path="/" element={<Gallery />}></Route>
                        <Route path="/oauth/callback" element={<OAuthCallback />}></Route>
                    </Routes>
                </BrowserRouter>
            </Providers>

            <Footer />
        </>
    )
}

export default App
