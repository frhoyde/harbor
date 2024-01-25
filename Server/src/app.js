import cors from "cors";
import express from "express";
import morganBody from "morgan-body";
import minifyHTML from "express-minify-html";

import { env } from "./config.js";
// Router imports
import scrapeRouter from "./modules/scraping-bee/scrape.route.js";
import storageRouter from "./modules/storage/storage.route.js";
import snapshotRouter from "./modules/snapshot/snapshot.route.js";
import { config } from "dotenv";
config();
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

app.use(
	minifyHTML({
		override: true,
		exception_url: false,
		htmlMinifier: {
			removeComments: true,
			collapseWhitespace: true,
			collapseBooleanAttributes: true,
			removeAttributeQuotes: true,
			removeEmptyAttributes: true,
			minifyJS: true,
		},
	})
);

// Routes
app.use("/scrape", scrapeRouter);
app.use("/storage", storageRouter);
app.use("/snapshot", snapshotRouter);
app.get("/are-you-ok", (req, res) => {
	return res
		.status(200)
		.send({ message: "Yeah, I am OK." });
});

export default app;
