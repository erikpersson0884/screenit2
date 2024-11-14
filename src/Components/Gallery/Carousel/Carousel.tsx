// Carousel.tsx
import React from 'react';
import './Carousel.css'; // Component-specific styles
import { Image } from '../../../types';

interface CarouselProps {
    images: Image[];
    carouselSpeed: number;
}

const Carousel: React.FC<{images: Image[]}> = ({ images }) => {

    const [currentImage, setCurrentImage] = React.useState<Image | undefined>(undefined);
    const [currentIndex, setCurrentIndex] = React.useState<number>(0);
    const [defaultImageSrc, setDefaultImageSrc] = React.useState<string>('/images/defaultImage.jpg');

    React.useEffect(() => {
        if (images.length > 0) {
            setCurrentImage(images[currentIndex]);
        }
    }, [images, currentIndex]);
 
    

    return (
        <section className="carouselContainer">
            <img
                src={currentImage ? `/images/eventImages/${currentImage.path}` : defaultImageSrc}
                onError={(e) => {
                }}
              alt="imageCarousel"
            />
        </section>
    );
};

export default Carousel;
