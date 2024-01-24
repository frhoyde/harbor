import { Router } from "express";
import { scrapeController } from "./scrape.controller.js";
import { scrapeService } from "./scrape.service.js";

const scrapeRouter = Router();

scrapeRouter.get(
	"/storplace",
	scrapeController.scrapeStorPlace
);

scrapeRouter.get(
	"/istorage",
	scrapeService.scrapeIStorageOnce
);

export default scrapeRouter;
