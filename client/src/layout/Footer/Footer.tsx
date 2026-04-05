import React from 'react';
import './Footer.css';

import pixelnHeart from '../../assets/pixelnheart.png';

const Footer: React.FC = () => {
    return (
        <footer className='page-footer'>
            <p>Made with</p>
            <img src={pixelnHeart} alt="Pixeln Heart" height={20} />
            <p>by <a href="https://github.com/erikpersson0884/">Göken</a></p>
        </footer>
    );
};

export default Footer;
