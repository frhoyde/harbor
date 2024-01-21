import { Router } from "express";
import { scrapeController } from "./scrape.controller.js";
const scrapeRouter = Router();

scrapeRouter.get("/scrape", async (req, res) => {
	await scrapeController
		.get(
			"https://www.storplaceselfstorage.com/storage-units/kentucky/bowling-green/storplace-of-greenwood-347038/"
		)
		.then(function (response) {
			var decoder = new TextDecoder();
			var text = decoder.decode(response.data);
			console.log(text);
			res.send(response.data);
		})
		.catch((e) =>
			console.log(
				"A problem occurs : " + e.message
			)
		);
});

export default scrapeRouter;
