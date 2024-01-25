import app from "./app.js";
import { databaseClient } from "./database/index.js";
import { seedDataBase } from "./database/seeders/index.js";
import cron from "node-cron";
import { logger } from "./utils/log/logger.util.js";
import { scrapeService } from "./modules/scraping-bee/scrape.service.js";
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
	} catch (error) {
		logger.error(
			"Database connection could not be established."
		);
	}

	try {
		// await seedDataBase();
	} catch (error) {
		logger.error(
			"Database could not be seeded.",
			error
		);
	}

	try {
		cron.schedule("*/30 * * * * *", () => {
			// const IStorage_units =
			// scrapeService.scrapeFullIStorage();
			const Storplace_units =
				scrapeService.scrapeFullStorPlace();

			console.log(Storplace_units);
		});
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
