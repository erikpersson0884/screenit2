import { createLogger, format, transports } from "winston";

const logger = createLogger({
    level: process.env.LOG_LEVEL,

    format: format.combine(
        format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        format.errors({ stack: true }),
        format.splat(),
        format.json()
    ),

    defaultMeta: { service: "screenit-backend" },

    transports: [
        new transports.Console({
            format: format.combine(
                format.colorize(),
                format.simple()
            ),
        }),

        new transports.File({
            filename: "logs/error.log",
            level: "error",
        }),

        new transports.File({
            filename: "logs/combined.log",
        }),
    ],
});

export default logger;
