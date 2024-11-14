import React from 'react';
import './PopupDiv.css';

interface PopupDivProps {
    children: React.ReactNode;
}

const PopupDiv: React.FC<PopupDivProps> = ({ children }) => {
    return (
        <div className="popupDiv">
            {children}
        </div>
    );
};

export default PopupDiv;