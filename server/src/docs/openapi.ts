import "../docs/register.js";
import tags from "../docs/tags.js";

import { OpenApiGeneratorV3 } from "@asteasolutions/zod-to-openapi";
import { registry } from "./registry.js";

export const openApiDocument = new OpenApiGeneratorV3(registry.definitions).generateDocument({
    openapi: "3.0.0",
    info: {
        title: "screenIT2 API",
        version: "1.0.0",
        
        contact: {
            name: "Erik Persson",
            url: "https://erik-persson.com",
            email: "erperss@chalmers.it",
        },
        description: `
API for managing events, users, groups, and authentication in screenIT2.

### Features
- Authentication via Gamma SSO
- Event & poster management
- Group permissions system
- System health endpoints

### Environments
- Local development (proxy)
- Local direct
- Production API

About the creator:
        `,
    },
    externalDocs: {
        description: "GitHub repository",
        url: "https://erik-persson.com/screenIT2",
    },

    servers: [
        {
            url: "http://localhost:3000",
            description: "Local development server with API proxy",
        },
        {
            url: "http://localhost:3001",
            description: "Local development server",
        },
        {
            url: "https://screenit.chalmers.it",
            description: "Production server",
        },
    ],
    tags: Object.values(tags),
});