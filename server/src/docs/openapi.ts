import "../docs/register.js";

import { OpenApiGeneratorV3 } from "@asteasolutions/zod-to-openapi";
import { registry } from "./registry.js";

export const openApiDocument = new OpenApiGeneratorV3(registry.definitions).generateDocument({
    openapi: "3.0.0",
    info: {
        title: "Screenit API",
        version: "1.0.0",
    },
});