import { Router } from "express";

import { snapshotController } from "./snapshot.controller.js";

const snapshotRouter = Router();

snapshotRouter.get(
	"/recent/get",
	snapshotController.getRecentSnapshots
);

snapshotRouter.get(
	"/all/get",
	snapshotController.getAllSnapshots
);

snapshotRouter.delete(
	"/delete/:id",
	snapshotController.deleteSnapshot
);

snapshotRouter.delete(
	"/delete/bulk",
	snapshotController.deleteBulkSnapshots
);

export default snapshotRouter;
