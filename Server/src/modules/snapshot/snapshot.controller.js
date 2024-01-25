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
};
