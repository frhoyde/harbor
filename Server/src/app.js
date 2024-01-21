import cors from "cors";
import express from "express";
import morganBody from "morgan-body";

import { env } from "./config.js";
import { httpLogger } from "./utils/log/http-logger.util.js";
import { getRequestLogger } from "./utils/log/index.js";
// Router imports
import scrapeRouter from "./modules/scraping-bee/scrape.route.js";
// Initialization
const app = express();

// Configuration
app.set("port", env.port);

// Middlewares
app.use(cors());
app.use(express.json());
// HTTP loggers
morganBody(app, {
	logReqDateTime: false,
	logReqUserAgent: false,
	logIP: false,
	maxBodyLength: 1024,
});
// Routes
app.use("/scrape", scrapeRouter);
app.get("/are-you-ok", (req, res) => {
	return res
		.status(200)
		.send({ message: "Yeah, I am OK." });
});

export default app;
