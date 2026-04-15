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