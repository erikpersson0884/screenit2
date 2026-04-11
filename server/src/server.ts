import app from "./app.js";
import dotenv from "dotenv";
import { startDeleteOldEventsJob } from "./jobs/deleteOldEvents.js";
import { startSyncChalmersEventsJob } from "./jobs/syncChalmersITEvents.js";
import { startDbHealthCheck } from "./jobs/checkDbConnection.js";
import logger from "./lib/logger.js";

dotenv.config();

const PORT = process.env.PORT || 3001;


startDeleteOldEventsJob();
startSyncChalmersEventsJob();
startDbHealthCheck();

app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
});
