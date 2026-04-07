import React from "react";

const defaultDisplayTime = 10; // seconds
const defaultHubbenRattanDisplayTime = 5; // seconds
const defaultHubbenRattanDisplayInterval = 10; // seconds between the times Hubbenråttan is displayed, if enabled
const defaultFetchInterval = 10; // seconds. How often to fetch new events and images from the server
const defaultShowSidebar = false; // Whether to show the sidebar by default
const defaultShowHubbenRattan = false; // Whether to show Hubbenråttan by default

type GalleryContextType = {
    // Which popups to show
    showAccount: boolean;
    setShowAccount: React.Dispatch<React.SetStateAction<boolean>>;

    showUpload: boolean;
    setShowUpload: React.Dispatch<React.SetStateAction<boolean>>;
    
    showSettings: boolean;
    setShowSettings: React.Dispatch<React.SetStateAction<boolean>>;

    // Hubbenråttan settings
    showHubbenRattan: boolean;
    setShowHubbenRattan: React.Dispatch<React.SetStateAction<boolean>>;

    hubbenRattanDisplayTime: number;
    setHubbenRattanDisplayTime: React.Dispatch<React.SetStateAction<number>>;

    hubbenRattanDisplayInterval: number;
    setHubbenRattanDisplayInterval: React.Dispatch<React.SetStateAction<number>>;

    // Poster display settings
    postIndex: number;
    setEventIndex: React.Dispatch<React.SetStateAction<number>>;

    postDisplayTime: number;
    setEventDisplayTime: React.Dispatch<React.SetStateAction<number>>;

    fetchInterval: number;
    setFetchInterval: React.Dispatch<React.SetStateAction<number>>;

     // Other settings
    showSidebar: boolean;
    setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;

};

const GalleryContext = React.createContext<GalleryContextType | undefined>(undefined);

const GalleryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [postDisplayTime, setEventDisplayTime] = React.useState<number>(
        () => Number(localStorage.getItem("postDisplayTime")) || defaultDisplayTime
    );

    const [hubbenRattanDisplayTime, setHubbenRattanDisplayTime] = React.useState<number>(
        () => Number(localStorage.getItem("hubbenRattanDisplayTime")) || defaultHubbenRattanDisplayTime
    );

    const [hubbenRattanDisplayInterval, setHubbenRattanDisplayInterval] = React.useState<number>(
        () => Number(localStorage.getItem("hubbenRattanDisplayInterval")) || defaultHubbenRattanDisplayInterval
    );

    const [showSidebar, setShowSidebar] = React.useState<boolean>(
        () => JSON.parse(localStorage.getItem("showSidebar") || defaultShowSidebar.toString())
    );
    const [showHubbenRattan, setShowHubbenRattan] = React.useState<boolean>(
        () => JSON.parse(localStorage.getItem("showHubbenRattan") || defaultShowHubbenRattan.toString())
    );

    const [fetchInterval, setFetchInterval] = React.useState<number>(
        () => Number(localStorage.getItem("fetchInterval")) || defaultFetchInterval
    ); 

    const [showAccount, setShowAccount] = React.useState<boolean>(false);
    const [showUpload, setShowUpload] = React.useState<boolean>(false);
    const [showSettings, setShowSettings] = React.useState<boolean>(false);

    const [postIndex, setEventIndex] = React.useState<number>(0);

    // Persist variables saved to localStorage whenever they changes
    React.useEffect(() => {
        localStorage.setItem("postDisplayTime", postDisplayTime.toString());
    }, [postDisplayTime]);

    React.useEffect(() => {
        localStorage.setItem("hubbenRattanDisplayTime", hubbenRattanDisplayTime.toString());
    }, [hubbenRattanDisplayTime]);

    React.useEffect(() => {
        localStorage.setItem("showSidebar", JSON.stringify(showSidebar));
    }, [showSidebar]);

    React.useEffect(() => {
        localStorage.setItem("showHubbenRattan", JSON.stringify(showHubbenRattan));
    }, [showHubbenRattan]);

    React.useEffect(() => {
        localStorage.setItem("hubbenRattanDisplayInterval", hubbenRattanDisplayInterval.toString());
    }, [hubbenRattanDisplayInterval]);

    React.useEffect(() => {
        localStorage.setItem("fetchInterval", fetchInterval.toString());
    }, [fetchInterval]);
        






    return (
        <GalleryContext.Provider value={{ 
            // Popups
            showAccount,
            setShowAccount,
            
            showSettings, 
            setShowSettings,

            showUpload,
            setShowUpload,


            // Poster display settings
            postIndex, 
            setEventIndex, 

            postDisplayTime, 
            setEventDisplayTime, 

            fetchInterval,
            setFetchInterval,

            // Hubbenråttan settings
            showHubbenRattan, 
            setShowHubbenRattan,

            hubbenRattanDisplayInterval,
            setHubbenRattanDisplayInterval,

            hubbenRattanDisplayTime,
            setHubbenRattanDisplayTime,
        
            // Other settings
            showSidebar, 
            setShowSidebar, 
        }}>
            {children}
        </GalleryContext.Provider>
    );

};

const useGalleryContext = () => {
    const context = React.useContext(GalleryContext);
    if (context === undefined) {
        throw new Error("useGallery must be used within a GalleryProvider");
    }
    return context;
};

export { GalleryProvider, useGalleryContext };