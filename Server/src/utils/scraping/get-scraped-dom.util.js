import scrapingbee from "scrapingbee";
import { env } from "../../config.js";

const client = new scrapingbee.ScrapingBeeClient(
	env.scrapingBeeApiKey
);

export const getScrapedDOM = async (
	url,
	selector
) => {
	try {
		const response = await client.get({
			url,
			params: {
				block_resources: "True",
				wait_browser: "load",
				wait_for: selector,
			},
		});
		return response.data;
	} catch (error) {
		logger.error(
			`Error fetching data from ${url}: ${error}`
		);
	}
};
