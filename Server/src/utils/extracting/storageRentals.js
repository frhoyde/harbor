import jsdom from "jsdom";
function parseStorageRentalsData(data) {
	const competitor = {
		name: "",
		storage_units: [],
	};

	const { JSDOM } = jsdom;
	const dom = new JSDOM(data);

	const storageUnitElements =
		dom.window.document.querySelectorAll(
			"span#storageUnitsItem-text-unitSize"
		);

	console.log(storageUnitElements.length);

	storageUnitElements.forEach(
		(unitElement, index) => {
			const sizeString =
				unitElement.querySelector(
					".unitSize"
				).innerHTML;
			const size = parseSize(sizeString);

			const type =
				unitElement.querySelector(
					".sizeWord"
				).innerText;

			const price = parseFloat(
				unitElement
					.querySelector(".unitPrice")
					.innerText.replace(/[^\d.]/g, "")
			);

			const features = Array.from(
				unitElement.getElementsByClassName(
					"unitTag"
				)
			).map((div) => div.innerText);

			const lastElement =
				features[features.length - 1];
			const appliedSuffix = "\n\nApplied";
			const special = lastElement.endsWith(
				appliedSuffix
			)
				? features
						.pop()
						.slice(0, -appliedSuffix.length)
				: undefined;

			competitor.storage_units.push({
				size,
				type,
				price,
				features,
				special,
			});
		}
	);

	return competitor;
}

function parseSize(sizeString) {
	// Use a regular expression to extract width and depth values
	const match = sizeString.match(
		/\s*(\d+)\s*'\s*x\s*(\d+)\s*'/
	);
	if (match) {
		const width = parseFloat(match[1]);
		const depth = parseFloat(match[2]);
		return { width, depth };
	}
	// Return a default size if the format is not as expected
	return { width: 0, depth: 0 };
}

function escapeHtml(unsafe) {
	return unsafe
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#39;");
}

export { parseStorageRentalsData };
