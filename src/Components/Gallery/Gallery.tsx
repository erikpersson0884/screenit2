// App.tsx
import React, { useEffect, useState, useRef } from 'react';
import Carousel from './Carousel/Carousel';

const Gallery: React.FC = () => {
    const [images, setImages] = useState<any[]>([]);

    const [carouselSpeed, setCarouselSpeed] = useState(8000); // default to 8 seconds
    const [autoRefreshTime, setAutoRefreshTime] = useState(10 * 60 * 1000); // default 10 minutes
    const [fetchInterval, setFetchInterval] = useState(autoRefreshTime);

    const carouselRef = useRef<number | undefined>();

    const backendUrl = import.meta.env.VITE_BACKEND_API_URL

    fetch(`${backendUrl}/images/getFutureImages`)
    .then((response) => response.json())
    .then((data) => {
        setImages(data);
    });
    
    


    return (
        <div className="gallery">
            <Carousel images={images}/>

        </div>
    );
};

export default Gallery;
