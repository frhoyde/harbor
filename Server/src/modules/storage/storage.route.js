import { Router } from "express";

import { storageController } from "./storage.controller.js";

const storageRouter = Router();

storageRouter.post(
	"/facility/create",
	storageController.createStorageFacility
);

storageRouter.get(
	"/facility/all",
	storageController.getAllStorageFacilities
);

storageRouter.get(
	"/facility/:id",
	storageController.getStorageFacility
);

storageRouter.put(
	"/facility/:id",
	storageController.updateStorageFacility
);

storageRouter.delete(
	"/facility/:id",
	storageController.deleteStorageFacility
);

storageRouter.post(
	"/endpoint/create",
	storageController.createOneEndPoint
);

storageRouter.get(
	"/endpoint/all",
	storageController.getAllEndPoints
);

storageRouter.get(
	"/facility/endpoint/:id",
	storageController.getEndPointByFacility
);

storageRouter.delete(
	"/endpoint/:id",
	storageController.deleteOneEndpoint
);

storageRouter.get(
	"/storage-units/all",
	storageController.getAllStorageUnits
);

storageRouter.get(
	"/storage-units/:id",
	storageController.getOneStorageUnit
);

storageRouter.post(
	"/storage-units/create",
	storageController.createOneStorageUnit
);

storageRouter.put(
	"/storage-units/:id",
	storageController.updateOneStorageUnit
);

storageRouter.post(
	"/storage-units/bulk-create",
	storageController.createBulkStorageUnits
);

storageRouter.delete(
	"/storage-units/:id",
	storageController.deleteOneStorageUnit
);

export default storageRouter;
