import { scrapeService } from "./scrape.service.js";
export const scrapeController = {
	scrapeOneUrl: async (req, res) => {
		try {
			let data;
			scrapeService
				.getScrapedDOM(
					"https://www.storplaceselfstorage.com/storage-units/kentucky/bowling-green/storplace-of-greenwood-347038/"
				)
				.then(function (response) {
					let decoder = new TextDecoder();
					let text = decoder.decode(
						response.data
					);
					data = scrapeService.minifyHTML(text);
					res.status(200).send(data);
				})
				.catch((e) =>
					console.log(
						"A problem occurs : " + e.message
					)
				);
		} catch (error) {
			console.log(error);
		}
	},
};
