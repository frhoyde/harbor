import { storageService } from "./storage.service.js";
export const storageController = {
	createStorageFacility: async (req, res) => {
		try {
			await storageService.createStorageFacility(
				req.body.data
			);
			res.status(201).json({
				message: "Storage created successfully",
			});
		} catch (error) {
			res
				.status(409)
				.json({ message: error.message });
		}
	},

	getAllStorageFacilities: async (req, res) => {
		try {
			const storage =
				await storageService.getAllStorageFacilities();
			res.status(200).json(storage);
		} catch (error) {
			res
				.status(404)
				.json({ message: error.message });
		}
	},

	getStorageFacility: async (req, res) => {
		const { id } = req.params;
		try {
			const storage =
				await storageService.getStorageFacilityById(
					id
				);
			res.status(200).json(storage);
		} catch (error) {
			res
				.status(404)
				.json({ message: error.message });
		}
	},

	updateStorageFacility: async (req, res) => {
		const { id } = req.params;
		const { data } = req.body;
		try {
			const storage =
				await storageService.updateStorageFacility(
					id,
					data
				);
			res.status(200).json({
				message: "Storage updated successfully",
			});
		} catch (error) {
			res
				.status(404)
				.json({ message: error.message });
		}
	},

	deleteStorageFacility: async (req, res) => {
		const { id } = req.params;
		try {
			await storageService.findByIdAndDelete(id);
			res.status(200).json({
				message: "Storage deleted successfully",
			});
		} catch (error) {
			res
				.status(404)
				.json({ message: error.message });
		}
	},

	createOneEndPoint: async (req, res) => {
		const { data } = req.body;
		try {
			await storageService.createEndPoint(data);
			res.status(201).json({
				message: "EndPoint created successfully",
			});
		} catch (error) {
			res
				.status(409)
				.json({ message: error.message });
		}
	},

	getAllEndPoints: async (req, res) => {
		try {
			const storage =
				await storageService.getEndPoints();
			res.status(200).json(storage);
		} catch (error) {
			res
				.status(404)
				.json({ message: error.message });
		}
	},

	getEndPointByFacility: async (req, res) => {
		const { id } = req.params;
		try {
			const storage =
				await storageService.getEndPointsByFacilityId(
					id
				);
			res.status(200).json(storage);
		} catch (error) {
			res
				.status(404)
				.json({ message: error.message });
		}
	},

	deleteOneEndpoint: async (req, res) => {
		const { id } = req.params;
		try {
			await storageService.deleteOneEndPoint(id);
			res.status(200).json({
				message: "Storage deleted successfully",
			});
		} catch (error) {
			res
				.status(404)
				.json({ message: error.message });
		}
	},

	getAllStorageUnits: async (req, res) => {
		try {
			const storageUnits =
				await storageService.getAllStorageUnits();
			res.status(200).json(storageUnits);
		} catch (error) {
			res
				.status(404)
				.json({ message: error.message });
		}
	},

	createOneStorageUnit: async (req, res) => {
		try {
			await storageService.createStorageUnit(
				req.body.data
			);
			res.status(201).json({
				message: "Storage created successfully",
			});
		} catch (error) {
			res
				.status(409)
				.json({ message: error.message });
		}
	},

	getOneStorageUnit: async (req, res) => {
		const { id } = req.params;
		try {
			const storageUnit =
				await storageService.getOneStorageUnit(
					id
				);
			res.status(200).json(storageUnit);
		} catch (error) {
			res
				.status(404)
				.json({ message: error.message });
		}
	},

	updateOneStorageUnit: async (req, res) => {
		const { id } = req.params;
		const { data } = req.body;
		try {
			const storageUnit =
				await storageService.updateOneStorageUnit(
					id,
					data
				);
			res.status(200).json({
				message: "Storage updated successfully",
			});
		} catch (error) {
			res
				.status(404)
				.json({ message: error.message });
		}
	},

	createBulkStorageUnits: async (req, res) => {
		try {
			await storageService.createBulkStorageUnits(
				req.body.data
			);
			res.status(201).json({
				message: "Storage created successfully",
			});
		} catch (error) {
			res
				.status(409)
				.json({ message: error.message });
		}
	},

	deleteOneStorageUnit: async (req, res) => {
		const { id } = req.params;
		try {
			await storageService.deleteOneStorageUnit(
				id
			);
			res.status(200).json({
				message: "Storage deleted successfully",
			});
		} catch (error) {
			res
				.status(404)
				.json({ message: error.message });
		}
	},
};
