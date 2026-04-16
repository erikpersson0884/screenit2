import { registry } from "../registry.js";
import { z } from "zod";

import {
    EventsResponseSchema,
    EventResponseSchema,
    UpdateEventDTO,
    CreateEventDTO,
    UpdateEventSchema,
} from "../../models/dtos/EventDTO.js";

const IdParamSchema = z.object({
    id: z.string(),
});

registry.registerPath({
    method: "get",
    path: "/api/events",

    tags: ["📅 Events"],

    responses: {
        200: {
            description: "Get all events",
            content: {
                "application/json": {
                    schema: EventsResponseSchema,
                },
            },
        },
    },
});

registry.registerPath({
    method: "get",
    path: "/api/events/{id}",

    tags: ["📅 Events"],

    request: {
        params: IdParamSchema,
    },

    responses: {
        200: {
            description: "Get event by id",
            content: {
                "application/json": {
                    schema: EventsResponseSchema,
                },
            },
        },
    },
});

registry.registerPath({
    method: "post",
    path: "/api/events",
    tags: ["📅 Events"],
    security: [{ bearerAuth: [] }],
    summary: "Create new event",
    description: "Allows creating new events with name, date and associated groups. Only accessible by authenticated users.",
    request: {
        body: {
            content: {
                "multipart/form-data": {
                    schema: z.object({
                        name: z.string(),
                        date: z.string(),
                        groupIds: z.array(z.string()).optional(),

                        // file upload (Swagger shows this as a file input)
                        file: z.any(),
                    }),
                },
            },
        },
    },

    responses: {
        200: {
            description: "Event created successfully",
            content: {
                "application/json": {
                    schema: EventResponseSchema,
                },
            },
        },
        403: {
            description: "User is blocked",
        },
        400: {
            description: "Missing file",
        },
    },
});

registry.registerPath({
    method: "patch",
    path: "/api/events/{id}",
    tags: ["📅 Events"],
    security: [{ bearerAuth: [] }],
    summary: "Update event information",
    description: "Allows updating event information such as name, date and associated groups. Only accessible by admins, the user that created the event or the groups assosiated with the event.",
    request: {
        params: IdParamSchema,
        body: {
            content: {
                "application/json": {
                    schema: UpdateEventSchema,
                },
            },
        },
    },

    responses: {
        200: {
            description: "Event updated successfully",
            content: {
                "application/json": {
                    schema: EventResponseSchema,
                },
            },
        },
        403: {
            description: "Not allowed to modify event",
        },
        404: {
            description: "Event not found",
        },
    },
});

registry.registerPath({
    method: "delete",
    path: "/api/events/{id}",

    tags: ["📅 Events"],

    security: [{ bearerAuth: [] }],

    request: {
        params: IdParamSchema,
    },

    responses: {
        200: {
            description: "Event deleted successfully",
            content: {
                "application/json": {
                    schema: EventResponseSchema,
                },
            },
        },
        404: {
            description: "Event not found",
        },
        403: {
            description: "Not allowed to delete event",
        },
    },
});