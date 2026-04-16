import { registry } from "../registry.js";
import { z } from "zod";

import { GroupResponseSchema } from "../../models/dtos/GroupDTO.js";

const IdParamSchema = z.object({
    id: z.string(),
});

registry.registerPath({
    method: "get",
    path: "/api/groups",
    tags: ["👥 Groups"],
    summary: "Get all groups",
    description: "Returns a list of all groups in the system.",
    responses: {
        200: {
            description: "Get all groups",
            content: {
                "application/json": {
                    schema: GroupResponseSchema,
                },
            },
        },
    },
});

registry.registerPath({
    method: "get",
    path: "/api/groups/{id}",
    tags: ["👥 Groups"],
    summary: "Get group by id",
    description: "Returns group information based on the provided group id",
    request: {
        params: IdParamSchema,
    },
    responses: {
        200: {
            description: "Get group by id",
            content: {
                "application/json": {
                    schema: GroupResponseSchema,
                },
            },
        },
        404: {
            description: "Group not found",
        },
    },
});

registry.registerPath({
    method: "get",
    path: "/api/groups/me",
    tags: ["👥 Groups"],
    security: [{ bearerAuth: [] }],
    summary: "Get groups for current authenticated user",
    description: "Returns a list of groups that the currently authenticated user is a member of based on the provided JWT token",
    responses: {
        200: {
            description: "Get groups for current authenticated user",
            content: {
                "application/json": {
                    schema: GroupResponseSchema,
                },
            },
        },
        401: {
            description: "Unauthorized",
        },
    },
});