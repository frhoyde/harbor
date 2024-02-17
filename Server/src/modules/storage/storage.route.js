import { Router } from "express";

import { storageController } from "./storage.controller.js";
import { validate } from "../../middlewares/validate.middleware.js";

const storageRouter = Router();

storageRouter.post(
	"/facility/create",
	validate(createStorageFacilitySchema),
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

storageRouter.patch(
	"/facility/:id",
	validate(updateStorageFacilitySchema),
	storageController.updateStorageFacility
);

storageRouter.delete(
	"/facility/:id",
	storageController.deleteStorageFacility
);

storageRouter.post(
	"/endpoint/create",
	validate(createOneEndPointSchema),
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
	validate(createOneStorageUnitSchema),
	storageController.createOneStorageUnit
);

storageRouter.patch(
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
