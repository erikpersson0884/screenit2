import { registry } from "../registry.js";
import { z } from "zod";
import { tagNames } from "../tags.js";

/**
 * GET /auth/gamma
 * Starts OAuth login flow
 */
registry.registerPath({
    method: "get",
    path: "/api/auth/gamma",
    tags: [tagNames.auth],
    summary: "Initiate Gamma OAuth Login",
    description: "Initiates Gamma OAuth login flow by redirecting user to Gamma's authorization endpoint",
    responses: {
        302: {
            description: "Redirects user to Gamma OAuth login page",
        },
    },
});

/**
 * GET /auth/gamma/callback
 * Handles OAuth callback from Gamma
 */
registry.registerPath({
    method: "get",
    path: "/api/auth/gamma/callback",
    tags: [tagNames.auth],
    summary: "Handle Gamma OAuth Callback",
    description: "Handles the OAuth callback from Gamma, exchanges authorization code for JWT token and redirects user to frontend with token in query string",
    request: {
        query: z.object({
            code: z.string().min(1),
        }),
    },

    responses: {
        302: {
            description: "Redirects user to frontend with JWT token in query string",
        },
        400: {
            description: "Missing or invalid authorization code",
        },
    },
});