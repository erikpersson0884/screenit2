import { registry } from "../registry.js";
import { z } from "zod";
import { HealthResponseSchema } from "../../models/dtos/HealthDTO.js";

registry.registerPath({
    method: "get",
    path: "/api/health",
    tags: ["⚙️ System"],
    summary: "Health Check",
    description: "Checks if the server is healthy and can connect to the database",
    responses: {
        200: {
            description: "Service is healthy",
            content: {
                "application/json": {
                    schema: HealthResponseSchema,
                },
            },
        },
        500: {
            description: "Health check failed",
            content: {
                "application/json": {
                    schema: HealthResponseSchema,
                },
            },
        },
    },
});