import React from "react";


const initialDisplayTime = 20;
const initialHubbenRattanDisplayTime = 5;


type GalleryContextType = {
    showAccount: boolean;
    setShowAccount: React.Dispatch<React.SetStateAction<boolean>>;

    showUpload: boolean;
    setShowUpload: React.Dispatch<React.SetStateAction<boolean>>;

    postDisplayTime: number;
    setPostDisplayTime: React.Dispatch<React.SetStateAction<number>>;

    hubbenRattanDisplayTime: number;
    setHubbenRattanDisplayTime: React.Dispatch<React.SetStateAction<number>>;

    postIndex: number;
    setPostIndex: React.Dispatch<React.SetStateAction<number>>;

    showSidebar: boolean;
    setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;

    showHubbenRattan: boolean;
    setShowHubbenRattan: React.Dispatch<React.SetStateAction<boolean>>;

    showSettings: boolean;
    setShowSettings: React.Dispatch<React.SetStateAction<boolean>>;
};

const GalleryContext = React.createContext<GalleryContextType | undefined>(undefined);

const GalleryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [postDisplayTime, setPostDisplayTime] = React.useState<number>(initialDisplayTime);
    const [hubbenRattanDisplayTime, setHubbenRattanDisplayTime] = React.useState<number>(initialHubbenRattanDisplayTime);
    const [postIndex, setPostIndex] = React.useState<number>(0);
    const [showAccount, setShowAccount] = React.useState<boolean>(false);
    const [showUpload, setShowUpload] = React.useState<boolean>(false);

    const [showSidebar, setShowSidebar] = React.useState<boolean>(false);
    const [showHubbenRattan, setShowHubbenRattan] = React.useState<boolean>(true);
    const [showSettings, setShowSettings] = React.useState<boolean>(false);

    const activePopup = React.useState<"account" | "upload" | "settings" | null>(null);
    React.useEffect(() => {
        [showAccount, showUpload, showSettings].forEach((state, index) => {
            if (state) {
                activePopup[1](index === 0 ? "account" : index === 1 ? "upload" : "settings");
            }
        });
        if (!showAccount && !showUpload && !showSettings) {
            activePopup[1](null);
        }
    }, [showAccount, showUpload, showSettings]);



    return (
        <GalleryContext.Provider value={{ 
            postDisplayTime, 
            setPostDisplayTime, 
            postIndex, 
            setPostIndex, 

            showSidebar, 
            setShowSidebar, 

            showHubbenRattan, 
            setShowHubbenRattan, 

            showSettings, 
            setShowSettings,

            hubbenRattanDisplayTime,
            setHubbenRattanDisplayTime,

            showAccount,
            setShowAccount,

            showUpload,
            setShowUpload,
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