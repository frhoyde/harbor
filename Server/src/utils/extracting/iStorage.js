import jsdom from "jsdom";
function parseIStorageData(data) {
	const { JSDOM } = jsdom;
	if (!data) {
		console.error(
			"No data provided to parseIStorageData"
		);
		return;
	}
	const competitor = {
		name: "",
		storage_units: [],
	};

	const dom = new JSDOM(data);

	const storageUnitElements =
		dom.window.document.querySelectorAll(
			".unit-select-item"
		);

	storageUnitElements.forEach(
		(unitElement, index) => {
			const sizeString =
				unitElement.querySelector(
					".unit-select-item-detail-heading"
				).innerHTML;
			const size = parseSize(sizeString);

			const type =
				unitElement.querySelector(
					".det"
				).innerHTML;

			const price = unitElement
				.querySelector(".part_item_price")
				.innerHTML.match(/\$(\d+)/)[1];

			const featuresString = Array.from(
				unitElement.getElementsByClassName(
					"det-listing"
				)
			).map((feature) => feature.innerHTML);

			const featureDom = new JSDOM(
				featuresString
			);
			const window = featureDom.window;
			const features = Array.from(
				window.document.querySelectorAll(
					"li span"
				)
			).map((span) => span.textContent);

			const specialElement =
				unitElement.querySelector(".part_badge");
			const special = specialElement
				? specialElement.querySelector("span")
						.innerText
				: null;

			competitor.storage_units.push({
				size,
				type,
				price,
				features,
				special,
			});
		}
	);

	return competitor.storage_units;
}

function parseSize(sizeString) {
	// Use a regular expression to extract width and depth values
	const match = sizeString.match(
		/\s*(\d+)\s*x\s*(\d+)\s*/
	);
	if (match) {
		const width = parseFloat(match[1]);
		const depth = parseFloat(match[2]);
		return { width, depth };
	}
	// Return a default size if the format is not as expected
	return { width: 0, depth: 0 };
}

export { parseIStorageData };
