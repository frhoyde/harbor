import { logger } from "../log/logger.util.js";
import jsdom from "jsdom";

const parseIStorageData = (data) => {
	const { JSDOM } = jsdom;

	try {
		if (!data) {
			logger.error(
				"No data provided to parseIStorageData"
			);
			return [];
		}

		const dom = new JSDOM(data);
		const storageUnitElements =
			dom.window.document.querySelectorAll(
				".unit-select-item"
			);

		const storageUnits = Array.from(
			storageUnitElements
		).map((unitElement) => {
			try {
				const sizeString =
					unitElement.querySelector(
						".unit-select-item-detail-heading"
					).innerHTML;
				const size = parseSize(sizeString);

				const type =
					unitElement.querySelector(
						".det"
					).innerHTML;
				const price = parseInt(
					unitElement
						.querySelector(".part_item_price")
						.innerHTML.match(/\$(\d+)/)[1],
					10
				);

				const featuresString = Array.from(
					unitElement.getElementsByClassName(
						"det-listing"
					)
				).map((feature) => feature.innerHTML);
				const featureDom = new JSDOM(
					featuresString
				);
				const features = Array.from(
					featureDom.window.document.querySelectorAll(
						"li span"
					)
				).map((span) => span.textContent);

				const specialElement =
					unitElement.querySelector(
						".part_badge"
					);
				const special = specialElement
					? specialElement.querySelector("span")
						? specialElement.querySelector("span")
								.textContent
						: ""
					: "";

				logger.info(
					"Storage unit parsed successfully"
				);
				return {
					size,
					type,
					price,
					features,
					special,
				};
			} catch (error) {
				logger.error(
					"Error parsing storage unit element:",
					error
				);
				return null;
			}
		});

		return storageUnits.filter(Boolean); // Filter out null values
	} catch (error) {
		console.error(
			"Error parsing iStorage data:",
			error
		);
		return [];
	}
};

const parseSize = (sizeString) => {
	const match = sizeString.match(
		/\s*(\d+)\s*x\s*(\d+)\s*/
	);
	if (match) {
		const width = parseFloat(match[1]);
		const depth = parseFloat(match[2]);
		return { width, depth };
	}
	return { width: 0, depth: 0 };
};

export { parseIStorageData };
