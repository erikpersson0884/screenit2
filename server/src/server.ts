import app from "./app.js";
import logger from "./lib/logger.js";
import { env } from "./config/env.js"; // Ensure environment variables are loaded and validated

import { startSyncChalmersEventsJob } from "./jobs/syncChalmersITEvents.js";
import { startDeleteOldEventsJob } from "./jobs/deleteOldEvents.js";
import { startDeleteOldImagesJob } from "./jobs/deleteOldImages.js";
import { startDbHealthCheck } from "./jobs/checkDbConnection.js";



await startDbHealthCheck();
startSyncChalmersEventsJob();
startDeleteOldEventsJob();
startDeleteOldImagesJob();

const PORT = env.PORT;

app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
});
