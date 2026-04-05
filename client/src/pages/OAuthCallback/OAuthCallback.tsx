import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "@/contexts/AuthContext";

const OAuthCallback: React.FC = () => {
    const navigate = useNavigate();
    const { setAuthToken } = useAuthContext(); // new helper to parse token

    useEffect(() => {
        // Parse token from URL
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");

        if (token) {
            setAuthToken(token); // store in localStorage + update context
            navigate("/"); // redirect to logged-in page
        } else {
            // handle error
            // alert("OAuth login failed: No token found in callback URL"); 
            // navigate("/login?error=oauth_failed");
            // this alerted the user even when all worked as intedned :(

            //TODO: Implement a working solution for when token is missing or invalid.
        }
    }, []);

    return <p>Logging in...</p>;
};

export default OAuthCallback;
