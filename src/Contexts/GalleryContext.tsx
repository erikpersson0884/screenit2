import React from "react";
import { Post} from "../types";


const initialDisplayTime = 10000;


type GalleryContextType = {
    postDisplayTime: number;
    setPostDisplayTime: React.Dispatch<React.SetStateAction<number>>;

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
    const [postIndex, setPostIndex] = React.useState<number>(0);

    const [showSidebar, setShowSidebar] = React.useState<boolean>(false);
    const [showHubbenRattan, setShowHubbenRattan] = React.useState<boolean>(true);
    const [showSettings, setShowSettings] = React.useState<boolean>(false);

    return (
        <GalleryContext.Provider value={{ postDisplayTime, setPostDisplayTime, postIndex, setPostIndex, showSidebar, setShowSidebar, showHubbenRattan, setShowHubbenRattan, showSettings, setShowSettings }}>
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