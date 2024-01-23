import htmlMinifier from "html-minifier";
import scrapingbee from "scrapingbee";
import { parseIStorageData } from "../../utils/extracting/iStorage.js";
import { parseStorplaceData } from "../../utils/extracting/storplace.js";
import { parseStorageRentalsData } from "../../utils/extracting/storageRentals.js";
import jsdom from "jsdom";
import { databaseClient } from "../../database/index.js";
export const scrapeService = {
	scrapeFullStorPlace: async () => {
		try {
			const urls =
				await databaseClient.endPoints.findMany({
					where: {
						facilityName: "storPlace",
					},
				});

			const storageUnits = await Promise.all(
				urls.map((url) => {
					return scrapeService.scrapeStorPlaceOnce(
						url.url
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

	scrapeStorPlaceOnce: () => {
		let extractedStorePlacedata;
		try {
			let data;
			scrapeService
				.getScrapedDOM(
					"https://www.storplaceselfstorage.com/storage-units/kentucky/bowling-green/storplace-of-greenwood-347038/"
				)
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
				"AL5HMKKAX9TI8T15PIGUCIBT5IJL8T9AVS6ZR862288TNWGTM231CH2X7363WFQH0GULWB3YRQK4XR1H"
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
