import React from "react";
import { useAuthContext } from "../../Contexts/AuthContext";
import { useGalleryContext } from "../../Contexts/GalleryContext";

import LoginDiv from "./LoginDiv";
import AccountContent from "./AccountDiv";

const AccountDiv: React.FC = () => {
    const { isLoggedIn } = useAuthContext();
    const { showAccount } = useGalleryContext();

    if (!showAccount) return null;

    else if (isLoggedIn) return <AccountContent />;
    
    else return <LoginDiv />;
}

export default AccountDiv;