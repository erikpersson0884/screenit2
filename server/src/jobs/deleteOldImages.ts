import createEventService from "../services/eventService.js";
import { IEventService } from "../models/services/IEventService.js";
import logger from "../lib/logger.js";
import { isDbReady } from "../lib/dbState.js";
import { EventWithRelations } from "../types/types.js";
import fs from "fs/promises";
import path from "path";

const eventService: IEventService = createEventService();

const DELETE_OLD_IMAGES_INTERVAL = 24 * 60 * 60 * 1000;
const UPLOAD_DIR = "uploads";


const getAllImages = async (): Promise<string[]> => {
    const uploadsDir = path.join(process.cwd(), UPLOAD_DIR);

    const entries = await fs.readdir(uploadsDir, { withFileTypes: true });

    return entries
        .filter(entry => entry.isFile())
        .map(entry => entry.name)
};

console.log( await getAllImages() );

const shouldImageBeDeleted = async (imagePath: string): Promise<boolean> => {
    const events: EventWithRelations[] = await eventService.getAllEvents();
    const imageUsedInEvent: boolean = events.some(event => event.imagePath === imagePath);
    return !imageUsedInEvent;
}

const deleteImage = async (imagePath: string): Promise<void> => {
    const fullPath = path.join(process.cwd(), imagePath);
    await fs.unlink(fullPath);
    logger.info(`Deleted image: ${imagePath}`);
}

export const deleteOldImages = async () => {
    try {
        const allImages: string[] = await getAllImages();

        for (const image of allImages) {
            try {
                if (await shouldImageBeDeleted(image)) {
                    await deleteImage(image);
                }
            } catch (err) {
                logger.error(`Failed to delete event ${image}`, err);
            }
        }
    } catch (error) {
        logger.error("DeleteOldImage job failed (likely DB issue)", error);
    }
};

export const startDeleteOldImagesJob = async () => {
    logger.info("Starting DeleteOldImages job");
    const safeRun = async () => {
        try {
            if (!isDbReady()) {
                logger.warn("DB not ready → skipping group sync");
                return;
            }
            await deleteOldImages();
        } catch (err) {
            logger.error("Unhandled job crash prevented", err);
        }
    };

    safeRun();
    setInterval(safeRun, DELETE_OLD_IMAGES_INTERVAL);
};

export default startDeleteOldImagesJob;
