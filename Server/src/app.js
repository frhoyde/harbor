import cors from "cors";
import express from "express";
import morganBody from "morgan-body";


import { env } from "./config.js";
import { httpLogger } from "./utils/log/http-logger.util.js";
import { getRequestLogger } from "./utils/log/index.js";
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

export default app;