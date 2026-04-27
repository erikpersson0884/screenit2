import React from 'react';
import './ConnectionErrorPage.css';
import elevatorMusic from '../../assets/elevator-music.mp3';

const ConnectionErrorPage: React.FC = () => {

    return (
        <div className="gallery error">
            Backend is down. Please try again later.
            <br /> *Calm elevator music playing*
            <audio className='elevator-music' controls autoPlay loop>
                <source src={elevatorMusic} type="audio/mpeg" />
            </audio>
        </div>
    )
}

export default ConnectionErrorPage;
