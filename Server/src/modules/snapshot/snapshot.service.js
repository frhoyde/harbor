import { databaseClient } from "../../database/index.js";

export const snapshotService = {
	getAllRecentSnapshots: async () => {
		// take one of each name
		// order by createdAt
		// return

		const snapshots =
			await databaseClient.snapshot.findMany({
				orderBy: {
					snapshotAt: "desc",
				},
				distinct: ["facilityName"],
			});

		return snapshots;
	},

	getRecentSnapshotsByFacility: async (
		facilityName
	) => {
		const snapshots =
			await databaseClient.snapshot.findMany({
				where: {
					facilityName: facilityName,
				},
				orderBy: {
					snapshotAt: "desc",
				},
				take: 1,
				skip: 0,
			});

		return snapshots;
	},
};
