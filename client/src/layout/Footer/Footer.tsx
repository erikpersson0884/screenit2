import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
    return (
        <footer className='page-footer'>
            <p>Made with <span style={{ color: 'red' }}>&hearts;</span> by <a href="https://github.com/erikpersson0884/">Göken</a></p>
        </footer>
    );
};

export default Footer;
