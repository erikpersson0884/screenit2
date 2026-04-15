import { registry } from "../registry.js";
import { z } from "zod";
import { UpdateUserRequestSchema } from "../../models/dtos/UserDTOs.js";

registry.registerPath({
    method: "get",
    path: "/api/user",
    tags: ["👤 User"],
    responses: {
        200: {
            description: "Get all users",
            content: {
                "application/json": {
                    schema: z.array(
                        z.object({
                            id: z.string(),
                            username: z.string(),
                            role: z.enum(["user", "admin"]),
                        })
                    ),
                },
            },
        },
    },
});

registry.registerPath({
    method: "get",
    path: "/api/user/{id}",
    tags: ["👤 User"],
    request: {
        params: z.object({
            id: z.string(),
        }),
    },
    responses: {
        200: {
            description: "Get user by id",
            content: {
                "application/json": {
                    schema: z.object({
                        id: z.string(),
                        username: z.string(),
                        role: z.enum(["user", "admin"]),
                    }),
                },
            },
        },
    },
});

registry.registerPath({
    method: "get",
    path: "/api/user/me",
    tags: ["👤 User"],
    security: [{ bearerAuth: [] }],
    responses: {
        200: {
            description: "Current authenticated user",
            content: {
                "application/json": {
                    schema: z.object({
                        id: z.string(),
                        username: z.string(),
                        role: z.enum(["user", "admin"]),
                    }),
                },
            },
        },
        401: {
            description: "Unauthorized",
        },
    },
});

registry.registerPath({
    method: "patch",
    path: "/api/user/{id}",
    tags: ["👤 User"],
    security: [{ bearerAuth: [] }],
    request: {
        params: z.object({
            id: z.string(),
        }),
        body: {
            content: {
                "application/json": {
                    schema: UpdateUserRequestSchema,
                },
            },
        },
    },
    responses: {
        200: {
            description: "User updated successfully",
            content: {
                "application/json": {
                    schema: z.object({
                        success: z.boolean(),
                    }),
                },
            },
        },
    },
});