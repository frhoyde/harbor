import jsdom from "jsdom";

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

export { parseStorplaceData };
