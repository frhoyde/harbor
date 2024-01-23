function parseStorageRentalsData(data) {
	const competitor = {
		name: "",
		storage_units: [],
	};

	// Select the specific element to insert HTML
	//const targetElement = document.querySelector('html');
	const unitContainer = document.getElementById(
		"unit-html-container"
	);
	unitContainer.insertAdjacentHTML(
		"beforeend",
		data
	);

	const storageUnitElements =
		unitContainer.querySelectorAll(
			".unitItemContainer"
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

			// Create a table row with JSON and raw HTML for each unit
			const tableRow = `
      <tr>
        <td>${index + 1}</td>
        <td><pre contenteditable="true">${JSON.stringify(
					{
						size,
						type,
						price,
						features,
						special,
					},
					null,
					2
				)}</pre></td>
        <td><pre>${escapeHtml(unitElement.outerHTML)}</pre></td>
      </tr>`;

			competitor.storage_units.push({
				size,
				type,
				price,
				features,
				special,
			});

			// Append the table row to the result table
			document
				.getElementById("resultTableBody")
				.insertAdjacentHTML(
					"beforeend",
					tableRow
				);
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
