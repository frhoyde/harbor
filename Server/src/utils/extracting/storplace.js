import jsdom from "jsdom";
function parseStorplaceData(data) {
	const { JSDOM } = jsdom;
	if (!data) {
		console.error(
			"No data provided to parseStorplaceData"
		);
		return;
	}

	const competitor = {
		name: "",
		storage_units: [],
	};

	const dom = new JSDOM(data);
	console.log(dom.window.document.body);
	const storageUnitElements =
		dom.window.document.querySelectorAll(
			".card-body"
		);

	storageUnitElements.forEach((unitElement) => {
		try {
			const unitData =
				parseUnitElement(unitElement);
			competitor.storage_units.push(unitData);
		} catch (error) {
			console.error(
				"Error parsing unit element:",
				error
			);
		}
	});
	return competitor;
}

function parseUnitElement(unitElement) {
	const domPortion = unitElement.outerHTML;
	return {
		domPortion,
	};
}

export { parseStorplaceData };
