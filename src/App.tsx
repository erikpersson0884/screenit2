import { BrowserRouter, Route, Routes } from "react-router-dom";

import './App.css'
import Navigation from './Components/Navigation/Navigation.tsx';
import Gallery from './Components/Gallery/Gallery.tsx';

import { AuthProvider } from './Contexts/AuthContext.tsx';
import { PostsProvider } from './Contexts/PostsContext.tsx';


function App() {

    return (
        <AuthProvider>
            <PostsProvider>
                <BrowserRouter>
                
                    <Navigation />
                    
                    <Routes>
                        <Route path="/" element={<Gallery />}></Route>
                    </Routes>

                </BrowserRouter>
            </PostsProvider>
        </AuthProvider>
    )
}

export default App
