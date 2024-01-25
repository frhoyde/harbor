import { scrapeService } from "./scrape.service.js";
export const scrapeController = {
	scrapeStorPlace: async (req, res) => {
		try {
			const snapshots =
				await scrapeService.scrapeFullStorPlace();
			return res.status(200).send(snapshots);
		} catch (error) {
			console.log(error);
		}
	},

	scrapeIStorage: async (req, res) => {
		try {
			const snapshots =
				await scrapeService.scrapeFullIStorage();
			return res.status(200).send(snapshots);
		} catch (error) {
			console.log(error);
		}
	},
};
