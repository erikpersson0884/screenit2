import { registry } from "../registry.js";
import { z } from "zod";

/**
 * GET /auth/gamma
 * Starts OAuth login flow
 */
registry.registerPath({
    method: "get",
    path: "/api/auth/gamma",
    tags: ["🔐 Auth"],
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
    tags: ["🔐 Auth"],
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