import jsdom from "jsdom";
import { logger } from "../log/logger.util.js";

const parseStorplaceData = (data) => {
	const { JSDOM } = jsdom;

	try {
		if (!data) {
			console.error(
				"No data provided to parseStorplaceData"
			);
			return { name: "", storage_units: [] };
		}

		const dom = new JSDOM(data);
		const storageUnitElements =
			dom.window.document.querySelectorAll(
				".card-body"
			);

		const competitor = {
			name: "",
			storage_units: Array.from(
				storageUnitElements
			).map((unitElement) => {
				try {
					const unitData =
						parseUnitElement(unitElement);
					return unitData;
				} catch (error) {
					console.error(
						"Error parsing unit element:",
						error
					);
					return null;
				}
			}),
		};

		return competitor;
	} catch (error) {
		console.error(
			"Error parsing Storplace data:",
			error
		);
		return { name: "", storage_units: [] };
	}
};

const parseUnitElement = (unitElement) => {
	try {
		const domPortion = unitElement.outerHTML;
		return { domPortion };
	} catch (error) {
		console.error(
			"Error parsing unit element:",
			error
		);
		return null;
	}
};

const extractValuesFromStorPlaceDOM = (
	minifiedHtml
) => {
	const { JSDOM } = jsdom;
	// Create a DOM from the HTML data
	const dom = new JSDOM(minifiedHtml);

	// Extracting special text from htmlData
	const specialTextElement =
		dom.window.document.querySelector(
			".promo span"
		);
	const special = specialTextElement
		? specialTextElement.textContent.trim()
		: "";

	const sizeMatch = minifiedHtml.match(
		/(\d+)'\s*x\s*(\d+)'/
	);
	const size = {
		width: sizeMatch
			? parseInt(sizeMatch[1], 10)
			: 0,
		depth: sizeMatch
			? parseInt(sizeMatch[2], 10)
			: 0,
	};
	const typeRegex =
		/<div class="unit-category" data-v-[^>]+>([^<]+)<\/div>/;

	const typeMatch = minifiedHtml.match(typeRegex);
	const type = typeMatch ? typeMatch[1] : null;
	const featuresRegex =
		/<div class="amenities" data-v-[^>]+><div data-v-[^>]+>([^<]+)<\/div><\/div>/;

	const featuresMatch = minifiedHtml.match(
		featuresRegex
	);
	const features = featuresMatch
		? [
				featuresMatch[1].replace(
					/\b\d+\s*[xX]\s*\d+\b/g,
					""
				),
			]
		: [];

	const priceMatch = minifiedHtml.match(
		/<span class="bold price" data-v-[^>]+>\$(\d+)<\/span>/
	);
	const price = priceMatch
		? parseInt(priceMatch[1], 10)
		: 0;

	logger.info("Storage unit parsed successfully");
	return {
		size,
		type,
		price,
		features,
		special,
	};
};

const extractStorePlace = (minifiedHtml) => {
	const result = parseStorplaceData(minifiedHtml);

	const values = result.storage_units.map(
		(unit) => {
			return extractValuesFromStorPlaceDOM(
				unit.domPortion
			);
		}
	);

	const filteredValues = values.filter(
		(value) =>
			value.size.width > 0 && value.size.depth > 0
	);

	return filteredValues;
};

export { parseStorplaceData, extractStorePlace };
