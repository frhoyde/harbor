import scrapingbee from "scrapingbee";
import app from "../../app.js";
export const scrapeController = {
	get: async (url) => {
		var client =
			new scrapingbee.ScrapingBeeClient(
				"AL5HMKKAX9TI8T15PIGUCIBT5IJL8T9AVS6ZR862288TNWGTM231CH2X7363WFQH0GULWB3YRQK4XR1H"
			);
		var response = await client.get({
			url: url,
			params: {},
		});
		return response;
	},
};
