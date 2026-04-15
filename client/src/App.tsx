import React from 'react';
import './styles/App.css'

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Providers from './Providers.tsx';
import Navigation from './components/toolbar/Toolbar.tsx';
import Gallery from './pages/gallery/Gallery.tsx';
import OAuthCallback from './pages/OAuthCallback/OAuthCallback.tsx';
import AdminPage from './pages/adminPage/AdminPage.tsx';
import Footer from "./layout/Footer/Footer.tsx";
import { useHealth } from './hooks/useHealth.ts';

const reloadInterval = 6 * 60 * 60 * 1000; // 6 hours in milliseconds

function App() {
    React.useEffect(() => {
        const timeoutId = window.setTimeout(() => {
            window.location.reload();
        }, reloadInterval); 

        return () => window.clearTimeout(timeoutId);
    }, []);

    const MainContent = (): JSX.Element => {
        if (useHealth() === "down") return <div className="gallery error">Backend is down. Please try again later.<br /> *Calm elevator music playing*</div>;
        else return <Gallery />;
    }

    return (
        <>
            <Providers>
                <BrowserRouter>
                    <Navigation />
                    <Routes>
                        <Route path="/" element={<MainContent />}></Route>
                        <Route path="/admin" element={<AdminPage />}></Route>
                        <Route path="/oauth/callback" element={<OAuthCallback />}></Route>
                    </Routes>
                </BrowserRouter>
            </Providers>

            <Footer />
        </>
    )
}

export default App
