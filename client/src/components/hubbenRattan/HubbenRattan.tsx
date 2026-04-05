import React, { useEffect, useState, useRef } from "react";
import "./HubbenRattan.css";
import messages from "@/data/hubben-rattan-messages.json";
import hubbenRattanImage from "@/assets/hubben-rattan.gif";
import { useGalleryContext } from "@/contexts/GalleryContext";

const HubbenRattan: React.FC = () => {
    const { hubbenRattanDisplayTime, hubbenRattanDisplayInterval, showHubbenRattan } = useGalleryContext();
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState("");
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const startCycle = () => {
        // Pick a new random message
        const newMessage = messages[Math.floor(Math.random() * messages.length)];
        setMessage(newMessage);
        setVisible(true);

        // Hide after displayTime seconds
        timerRef.current = setTimeout(() => {
            setVisible(false);

            // Schedule next show after interval seconds
            timerRef.current = setTimeout(startCycle, hubbenRattanDisplayInterval * 1000);
        }, hubbenRattanDisplayTime * 1000);
    };

    useEffect(() => {
        if (!showHubbenRattan) {
            // Stop timers if feature is turned off
            if (timerRef.current) clearTimeout(timerRef.current);
            setVisible(false);
            return;
            }

            // Start immediately
            startCycle();

            return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [hubbenRattanDisplayTime, hubbenRattanDisplayInterval, showHubbenRattan]);

    if (!visible) return null;

    return (
        <div className="hubben-rattan-container">
            <img src={hubbenRattanImage} alt="Hubben Råttan" height={50} />
            <div className="speech-bubble">
                <p>{message}</p>
            </div>
        </div>
    );
};

export default HubbenRattan;
