import htmlMinifier from "html-minifier";
import scrapingbee from "scrapingbee";
import { parseStorplaceData } from "../../utils/extracting/storplace.js";
import { parseIStorageData } from "../../utils/extracting/iStorage.js";
import { parseStorageRentalsData } from "../../utils/extracting/storageRentals.js";
import jsdom from "jsdom";
import { databaseClient } from "../../database/index.js";
export const scrapeService = {
	scrapeFullStorPlace: async () => {
		try {
			const endPoints =
				await databaseClient.endPoints.findMany({
					where: {
						facilityName: "storPlace",
					},
				});

			const storageUnits = await Promise.all(
				endPoints.map((endPoint) => {
					return scrapeService.scrapeStorPlaceOnce(
						endPoint.url
					);
				})
			);

			const snapshots =
				await databaseClient.snapshot.create({
					data: {
						storageUnits: {
							create: storageUnits,
						},
						facility: {
							connect: {
								facilityName: "storPlace",
							},
						},
					},
				});

			return snapshots;
		} catch (error) {
			console.log(error);
		}
	},

	scrapeFullIStorage: async () => {
		try {
			const endPoints =
				await databaseClient.endPoints.findMany({
					where: {
						facilityName: "iStorage",
					},
				});

			const storageUnits = await Promise.all(
				endPoints.map((endPoint) => {
					return scrapeService.scrapeIStorageOnce(
						endPoint.url
					);
				})
			);

			const snapshots =
				await databaseClient.snapshot.create({
					data: {
						storageUnits: {
							create: storageUnits,
						},
						facility: {
							connect: {
								facilityName: "iStorage",
							},
						},
					},
				});

			return snapshots;
		} catch (error) {
			console.log(error);
		}
	},

	scrapeFullStorageRentals: async () => {
		try {
			const endPoints =
				await databaseClient.endPoints.findMany({
					where: {
						facilityName: "storageRentals",
					},
				});

			const storageUnits = await Promise.all(
				endPoints.map((endPoint) => {
					return scrapeService.scrapeStorageRentalsOnce(
						endPoint.url
					);
				})
			);

			const snapshots =
				await databaseClient.snapshot.create({
					data: {
						storageUnits: {
							create: storageUnits,
						},
						facility: {
							connect: {
								facilityName: "storageRentals",
							},
						},
					},
				});

			return snapshots;
		} catch (error) {
			console.log(error);
		}
	},

	scrapeStorageRentalsOnce: async (req, res) => {
		let extractedStorageRentalsData;
		try {
			let data;
			scrapeService
				.getScrapedDOM(
					"https://www.sroa.com/storage-units/tennessee/old-hickory"
				)
				.then(function (response) {
					let decoder = new TextDecoder();
					let text = decoder.decode(
						response.data
					);
					data = scrapeService.minifyHTML(text);
					console.log(data);
					extractedStorageRentalsData =
						parseStorageRentalsData(data);
					res.send(data);
				})
				.catch((e) => console.log(e));
		} catch (error) {
			console.log(error);
		}
	},

	scrapeIStorageOnce: (url) => {
		let extractedIStorageData;
		try {
			let data;
			scrapeService
				.getScrapedDOM(
					"https://www.istorage.com/storage/tennessee/storage-units-alcoa/142-Airport-Plaza-Blvd-821"
				)
				.then(function (response) {
					let decoder = new TextDecoder();
					let text = decoder.decode(
						response.data
					);
					data = scrapeService.minifyHTML(text);
					extractedIStorageData =
						parseIStorageData(data);
				})
				.catch((e) =>
					console.log(
						"A problem occurs : " + e.message
					)
				);

			return extractedIStorageData;
		} catch (error) {
			console.log(error);
		}
	},

	scrapeStorPlaceOnce: (url) => {
		let extractedStorePlacedata;
		try {
			let data;
			scrapeService
				.getScrapedDOM(url)
				.then(function (response) {
					let decoder = new TextDecoder();
					let text = decoder.decode(
						response.data
					);
					data = scrapeService.minifyHTML(text);
					extractedStorePlacedata =
						scrapeService.extractStorePlace(data);
				})
				.catch((e) =>
					console.log(
						"A problem occurs : " + e.message
					)
				);

			return extractedStorePlacedata;
		} catch (error) {
			console.log(error);
		}
	},

	getScrapedDOM: async (url) => {
		var client =
			new scrapingbee.ScrapingBeeClient(
				"AR18KX39ONCZ0PNYSKXOZ7KSYZDNRSHA7NN85R3U4D44ZMW54I83T6Y3S6IF5UQTRP8J616DS3M8R7DL"
			);
		var response = await client.get({
			url: url,
			params: {},
		});

		return response;
	},

	minifyHTML: (scrapedHtml) => {
		const minifiedHtml = htmlMinifier.minify(
			scrapedHtml,
			{
				collapseWhitespace: true,
				collapseBooleanAttributes: true,
				collapseInlineTagWhitespace: true,
				decodeEntities: true,
				html5: true,
				processConditionalComments: true,
				processScripts: ["text/html"],
				removeAttributeQuotes: true,
				removeEmptyAttributes: true,
				removeOptionalTags: true,
				removeRedundantAttributes: true,
				removeStyleLinkTypeAttributes: true,
				removeTagWhitespace: true,
				useShortDoctype: true,
				sortAttributes: true,
				sortClassName: true,
				trimCustomFragments: true,
				removeComments: true,
				minifyCSS: true,
				minifyJS: true,
			}
		);

		return minifiedHtml;
	},

	extractStorePlace: (minifiedHtml) => {
		const result =
			parseStorplaceData(minifiedHtml);

		const values = result.storage_units.map(
			(unit) => {
				return scrapeService.extractValuesFromStorPlaceDOM(
					unit.domPortion
				);
			}
		);

		const filteredValues = values.filter(
			(value) =>
				value.size.width > 0 &&
				value.size.depth > 0
		);

		return JSON.stringify(
			filteredValues,
			null,
			2
		);
	},

	extractValuesFromStorPlaceDOM: (
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
			: null;

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

		const typeMatch =
			minifiedHtml.match(typeRegex);
		const type = typeMatch ? typeMatch[1] : null;
		const featuresRegex =
			/<div class="amenities" data-v-[^>]+><div data-v-[^>]+>([^<]+)<\/div><\/div>/;

		const featuresMatch = minifiedHtml.match(
			featuresRegex
		);
		const features = featuresMatch
			? featuresMatch[1]
			: null;

		const priceMatch = minifiedHtml.match(
			/<span class="bold price" data-v-[^>]+>\$(\d+)<\/span>/
		);
		const price = priceMatch
			? parseInt(priceMatch[1], 10)
			: null;

		return {
			size,
			type,
			price,
			features,
			special,
		};
	},
};
