import React, { useEffect, useState, useRef } from "react";
import "./HubbenRattan.css";
import { useGalleryContext } from "@/contexts/GalleryContext";
import { useNotificationContext } from "@/contexts/NotificationContext";

import messages from "@/data/hubben-rattan-messages.json";
import levelMessages from "@/data/hubben-rattan-levels.json";
import hubbenRattanImage from "@/assets/hubben-rattan.gif";


const HUBBEN_RATTAN_LEVEL_UP_INTERVAL = 60 * 60 * 1000; // 1 hour in milliseconds

const HubbenRattan: React.FC = () => {
    const { hubbenRattanDisplayTime, hubbenRattanDisplayInterval, showHubbenRattan } = useGalleryContext();
    const { notify } = useNotificationContext();

    const [ visible, setVisible ] = useState(false);
    const [ message, setMessage ] = useState("");
    const timerRef = useRef<NodeJS.Timeout | null>(null) ;

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


    useEffect(() => { // Level up cycle
        if (!showHubbenRattan) return;

        const interval = setInterval(() => {
            const level: number = Number(localStorage.getItem("hubbenRattanLevel")) || 0;
            localStorage.setItem("hubbenRattanLevel", (level + 1).toString());
            notify("Hubbenråttan leveled up!", "info");
        }, HUBBEN_RATTAN_LEVEL_UP_INTERVAL);

        return () => clearInterval(interval);
    }, [showHubbenRattan]);

    const showLevelUpMessage = () => {
        const level: number = Number(localStorage.getItem("hubbenRattanLevel")) || 0;
        const entry = levelMessages.find(l => level <= l.maxLevel);
        const lvlMessage = entry?.message ?? "Jag är en råtta... Lite fövirrad över vilken lvlel jag är på."
        setMessage(`${lvlMessage} (Level ${level})`);
    };

    if (!visible) return null;

    return (
        <div className="hubben-rattan-container" onClick={showLevelUpMessage}>
            <img src={hubbenRattanImage} alt="Hubben Råttan" height={50} />
            <div className="speech-bubble">
                <p>{message}</p>
            </div>
        </div>
    );
};

export default HubbenRattan;
