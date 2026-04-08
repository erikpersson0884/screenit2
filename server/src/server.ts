import app from "./app.js";
import dotenv from "dotenv";
import { startDeleteOldEventsJob } from "./jobs/deleteOldEvents.js";
import { startSyncChalmersEventsJob } from "./jobs/syncChalmersITEvents.js";

dotenv.config();

const PORT = process.env.PORT || 3001;

startDeleteOldEventsJob();
startSyncChalmersEventsJob();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
