import cors from "cors";
import express from "express";
import morganBody from "morgan-body";
import fs from 'fs';

import { env } from "./config.js";
import { httpLogger } from "./utils/log/http-logger.util.js";
import { getRequestLogger } from "./utils/log/index.js";
import { get } from "./utils/scraping/get.util.js";
// Router imports

// Initialization
const app = express();

// Configuration
app.set("port", env.port);

// Middlewares
app.use(
  cors({
    origin: [env.webHospitalTicketingBaseUrl, env.webSelfTicketingBaseUrl],
    credentials: true
  })
);

app.use(express.json({ limit: "16mb" }));
app.use(express.urlencoded({ extended: false }));

// HTTP loggers
morganBody(app, {
  logReqDateTime: false,
  logReqUserAgent: false,
  logIP: false,
  maxBodyLength: 1024
});
app.use(httpLogger);
app.use(getRequestLogger);
// Routes

app.get("/are-you-ok", (req, res) => {
  return res.status(200).send("Yeah, I am OK.");
});
app.get("/scraper", async (req, res) => {
  var response = await get("https://scrapingbee.com/blog");
  fs.writeFileSync('test.txt', response.data);
  return res.status(200).send("done");
});

export default app;