import { databaseClient } from "../../database";
export const storageService = {
	createStorageFacility: async (data) => {
		try {
			await databaseClient.facility.create({
				data: {
					data,
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
};
