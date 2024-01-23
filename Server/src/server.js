import app from "./app.js";
import { databaseClient } from "./database/index.js";
import { seedDataBase } from "./database/seeders/index.js";
import { logger } from "./utils/log/logger.util.js";
app.listen(app.get("port"), async () => {
	logger.info(
		"Server running on http://localhost:" +
			app.get("port") +
			"/"
	);

	try {
		await databaseClient.$connect();
		logger.info(
			"Database connection has been established."
		);
		await seedDataBase();
	} catch (error) {
		logger.error(
			"Database connection could not be established."
		);
	}

	try {
	} catch (error) {
		logger.error(
			"Database could not be seeded.",
			error
		);
	}

	logger.info(
		"Application is now ready to serve."
	);
});
