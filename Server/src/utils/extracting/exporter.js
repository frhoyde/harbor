import jsdom from "jsdom";
function escapeDoubleQuotesAndNewLines(str) {
	return str
		.replace(/"/g, '\\"')
		.replace(/\n/g, "\\n");
}

function escapeCsvValue(value) {
	if (
		value.includes(",") ||
		value.includes('"')
	) {
		return `"${value.replace(/"/g, '""')}"`;
	}
	return value;
}

function exportToJSONL(data) {
	const rows = data.storage_units;
	const jsonLines = Array.from(rows).map(
		(row, index) => {
			const jsonData = row.querySelector(
				"td:nth-child(2) pre"
			).innerText;
			const htmlData = row.querySelector(
				"td:nth-child(3) pre"
			).innerText;
			return `{"index": ${
				index + 1
			}, "htmlData": "${escapeDoubleQuotesAndNewLines(
				htmlData
			)}", "jsonData": "${escapeDoubleQuotesAndNewLines(jsonData)}"}`;
		}
	);

	const jsonLContent = jsonLines.join("\n");
	downloadFile(
		jsonLContent,
		"export.jsonl",
		"application/json"
	);
}

function exportToCSV() {
	const rows = document.querySelectorAll(
		"#resultTableBody tr"
	);
	const csvContent = [
		["#", "JSON", "Raw HTML"].join(","),
	];

	rows.forEach((row, index) => {
		const indexData = (index + 1).toString();
		const jsonData = escapeCsvValue(
			row.querySelector("td:nth-child(2) pre")
				.innerText
		);
		const htmlData = escapeCsvValue(
			row.querySelector("td:nth-child(3) pre")
				.innerText
		);
		csvContent.push(
			[indexData, jsonData, htmlData].join(",")
		);
	});

	const csvString = csvContent.join("\n");
	downloadFile(
		csvString,
		"export.csv",
		"text/csv"
	);
}

function exportJSONLDataset() {
	const rows = document.querySelectorAll(
		"#resultTableBody tr"
	);
	const jsonLines = [];

	rows.forEach((row, index) => {
		const jsonData = row.querySelector(
			"td:nth-child(2) pre"
		).innerText;
		const htmlData = row.querySelector(
			"td:nth-child(3) pre"
		).innerText;

		const jsonLine = `{"messages": [
      {"role": "system", "content": "Sam is a data extraction chatbot developed by Harbor."},
      {"role": "user", "content": "${escapeDoubleQuotesAndNewLines(htmlData)}"},
      {"role": "assistant", "content": "${escapeDoubleQuotesAndNewLines(
				jsonData
			)}"}
    ]}`;
		jsonLines.push(jsonLine);
	});

	const jsonLContent = jsonLines.join("\n");
	downloadFile(
		jsonLContent,
		"export.jsonl",
		"application/json"
	);
}

function downloadFile(
	content,
	fileName,
	mimeType
) {
	const blob = new Blob([content], {
		type: mimeType,
	});
	const link = document.createElement("a");
	link.href = window.URL.createObjectURL(blob);
	link.download = fileName;
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
}

export {
	exportToJSONL,
	exportToCSV,
	exportJSONLDataset,
};
