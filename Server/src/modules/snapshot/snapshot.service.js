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

	getAllSnapshotsByFacilityName: async (
		facilityName
	) => {
		let snapshots;
		if (!facilityName) {
			snapshots =
				await databaseClient.snapshot.findMany({
					orderBy: {
						snapshotAt: "desc",
					},
				});
		} else {
			snapshots =
				await databaseClient.snapshot.findMany({
					where: {
						facilityName: facilityName,
					},
					orderBy: {
						snapshotAt: "desc",
					},
				});
		}

		return snapshots;
	},

	deleteSnapshotById: async (id) => {
		const snapshot =
			await databaseClient.snapshot.delete({
				where: {
					id: id,
				},
			});

		return snapshot;
	},

	deleteBulkSnapshotsByIds: async (ids) => {
		const snapshots =
			await databaseClient.snapshot.deleteMany({
				where: {
					id: {
						in: ids,
					},
				},
			});

		return snapshots;
	},
};
