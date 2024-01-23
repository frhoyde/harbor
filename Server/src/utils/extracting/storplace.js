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
	console.log(storageUnitElements.length);

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

function parseSize(sizeString) {
	if (!sizeString) {
		return { width: 0, depth: 0 };
	}

	const sizePattern =
		/(\d+(?:\.\d*)?) x (\d+(?:\.\d*)?)/;
	const match = sizeString.match(sizePattern);
	if (match) {
		const [, width, depth] = match;
		return {
			width: parseFloat(width),
			depth: parseFloat(depth),
		};
	}
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

export { parseStorplaceData };
