import { Router } from "express";

import { snapshotController } from "./snapshot.controller.js";

const snapshotRouter = Router();

snapshotRouter.get(
	"/recent/get",
	snapshotController.getRecentSnapshots
);

export default snapshotRouter;
