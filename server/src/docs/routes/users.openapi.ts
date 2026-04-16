import { registry } from "../registry.js";
import { z } from "zod";
import { UserResponseSchema, UpdateUserRequestSchema } from "../../models/dtos/UserDTOs.js";


registry.registerPath({
    method: "get",
    path: "/api/user",
    tags: ["👤 User"],
    summary: "Get all users",
    description: "Returns a list of all users in the system.",
    responses: {
        200: {
            description: "Get all users",
            content: {
                "application/json": {
                    schema: z.array(UserResponseSchema)
                },
            },
        },
    },
});

registry.registerPath({
    method: "get",
    path: "/api/user/{id}",
    tags: ["👤 User"],
    summary: "Get user by id",
    description: "Returns user information based on the provided user id",
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
    summary: "Get current authenticated user",
    description: "Returns information about the currently authenticated user based on the provided JWT token",
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
    summary: "Update user information",
    description: "Allows updating user information such as username and role. Only accessible by admins or the user themselfs.",
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
                    schema: UserResponseSchema,
                },
            },
        },
    },
});