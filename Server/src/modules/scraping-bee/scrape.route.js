import { Router } from "express";
import { scrapeController } from "./scrape.controller.js";

const scrapeRouter = Router();

scrapeRouter.get(
	"/scrape",
	scrapeController.scrapeOneUrl
);

export default scrapeRouter;
