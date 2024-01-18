import app from "./app.js";
import { logger } from "./utils/log/logger.util.js";
import { throwServerError } from "./utils/error/error.util.js";
import { databaseClient } from "./database/index.js";

app.listen(app.get("port"), async () => {
  logger.info("Server running on http://localhost:" + app.get("port") + "/");

  try {
    await databaseClient.$connect();
    logger.info("Database connection has been established.");
  } catch (error) {
    logger.error("Database connection could not be established.");
    throwServerError(error);
  }

  logger.info("Application is now ready to serve.");
});