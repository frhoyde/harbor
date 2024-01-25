import { databaseClient } from "../../database/index.js";
export const storageService = {
	createStorageFacility: async (data) => {
		try {
			await databaseClient.facility.create({
				data: {
					...data,
				},
			});
		} catch (error) {
			throw new Error(error);
		}
	},

	getAllStorageFacilities: async () => {
		try {
			const storage =
				await databaseClient.facility.findMany();
			return storage;
		} catch (error) {
			throw new Error(error);
		}
	},

	getStorageFacilityById: async (id) => {
		try {
			const storage =
				await databaseClient.facility.findUnique({
					where: {
						id,
					},
				});
			return storage;
		} catch (error) {
			throw new Error(error);
		}
	},

	updateStorageFacility: async (id, data) => {
		try {
			await databaseClient.facility.update({
				where: {
					id,
				},
				data: {
					...data,
				},
			});
		} catch (error) {
			throw new Error(error);
		}
	},

	deleteStorageFacility: async (id) => {
		try {
			await databaseClient.facility.delete({
				where: {
					id,
				},
			});
		} catch (error) {
			throw new Error(error);
		}
	},

	createOneEndPoint: async (req, res) => {
		const { data } = req.body;
		try {
			await databaseClient.endPoints.create({
				data: {
					...data,
				},
			});
			res.status(200).json({
				message: "EndPoint created successfully",
			});
		} catch (error) {
			res
				.status(404)
				.json({ message: error.message });
		}
	},

	getAllEndPoints: async (req, res) => {
		try {
			const endPoints =
				await databaseClient.endPoints.findMany();
			res.status(200).json(endPoints);
		} catch (error) {
			res
				.status(404)
				.json({ message: error.message });
		}
	},

	getEndPointsByFacilityId: async (req, res) => {
		const { id } = req.params;
		try {
			const endPoints =
				await databaseClient.endPoints.findMany({
					where: {
						facilityId: id,
					},
				});
			res.status(200).json(endPoints);
		} catch (error) {
			res
				.status(404)
				.json({ message: error.message });
		}
	},

	deleteOneEndPoint: async (req, res) => {
		const { id } = req.params;
		try {
			await databaseClient.endPoints.delete({
				where: {
					id,
				},
			});
			res.status(200).json({
				message: "EndPoint deleted successfully",
			});
		} catch (error) {
			res
				.status(404)
				.json({ message: error.message });
		}
	},

	createStorageUnit: async (req, res) => {
		const { data } = req.body;
		try {
			await databaseClient.storageUnit.create({
				data: {
					...data,
				},
			});
			res.status(200).json({
				message:
					"Storage Unit created successfully",
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
				await databaseClient.storageUnit.findMany();
			res.status(200).json(storageUnits);
		} catch (error) {
			res
				.status(404)
				.json({ message: error.message });
		}
	},

	getOneStorageUnit: async (req, res) => {
		const { id } = req.params;
		try {
			const storageUnit =
				await databaseClient.storageUnit.findUnique(
					{
						where: {
							id,
						},
					}
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
			await databaseClient.storageUnit.update({
				where: {
					id,
				},
				data: {
					...data,
				},
			});
			res.status(200).json({
				message:
					"Storage Unit updated successfully",
			});
		} catch (error) {
			res
				.status(404)
				.json({ message: error.message });
		}
	},

	deleteOneStorageUnit: async (req, res) => {
		const { id } = req.params;
		try {
			await databaseClient.storageUnit.delete({
				where: {
					id,
				},
			});
			res.status(200).json({
				message:
					"Storage Unit deleted successfully",
			});
		} catch (error) {
			res
				.status(404)
				.json({ message: error.message });
		}
	},

	createBulkStorageUnits: async (req, res) => {
		const { data } = req.body;
		try {
			await databaseClient.storageUnit.createMany(
				{
					data: [...data],
				}
			);
			res.status(200).json({
				message:
					"Storage Units created successfully",
			});
		} catch (error) {
			res
				.status(404)
				.json({ message: error.message });
		}
	},
};
