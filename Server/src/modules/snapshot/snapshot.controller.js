import { logger } from "../../utils/log/logger.util.js";
import { snapshotService } from "./snapshot.service.js";
export const snapshotController = {
	getRecentSnapshots: async (req, res) => {
		const { facilityName } = req.query;
		try {
			let snapshots;
			if (!facilityName) {
				snapshots =
					await snapshotService.getAllRecentSnapshots();
			} else {
				snapshots =
					await snapshotService.getRecentSnapshotsByFacility(
						facilityName
					);
			}

			return res.status(200).json(snapshots);
		} catch (error) {
			logger.error(
				`Error getting snapshot: ${error}`
			);
		}
	},

	getAllSnapshots: async (req, res) => {
		const { facilityName } = req.query;
		try {
			let snapshots;
			snapshots =
				await snapshotService.getAllSnapshotsByFacilityName(
					facilityName
				);

			return res.status(200).json(snapshots);
		} catch (error) {
			logger.error(
				`Error getting snapshot: ${error}`
			);
		}
	},

	deleteSnapshot: async (req, res) => {
		const { id } = req.params;
		try {
			const snapshot =
				await snapshotService.deleteSnapshotById(
					id
				);

			return res.status(200).json(snapshot);
		} catch (error) {
			logger.error(
				`Error deleting snapshot: ${error}`
			);
		}
	},

	deleteBulkSnapshots: async (req, res) => {
		const { ids } = req.body;
		try {
			const snapshot =
				await snapshotService.deleteBulkSnapshotsByIds(
					ids
				);

			return res.status(200).json(snapshot);
		} catch (error) {
			logger.error(
				`Error deleting snapshot: ${error}`
			);
		}
	},
};
