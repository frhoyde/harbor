import { Router } from "express";

import { storageController } from "./storage.controller.js";

const storageRouter = Router();

storageRouter.post(
	"/create",
	storageController.createStorageFacility
);
