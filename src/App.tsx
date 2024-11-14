import { useState } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";

import './App.css'
import Upload from './Components/Upload/Upload.tsx';
import Header from './Components/Navigation/Navigation.tsx';
import Gallery from './Components/Gallery/Gallery.tsx';
function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Header></Header>
      
      <Routes>
        <Route path="/upload" element={<Upload />}></Route>
        <Route path="/" element={<Gallery />}></Route>
        </Routes>
    </BrowserRouter>

  )
}

export default App
