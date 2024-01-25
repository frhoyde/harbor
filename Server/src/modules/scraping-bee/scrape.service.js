import htmlMinifier from "html-minifier";
import scrapingbee from "scrapingbee";
import { parseStorplaceData } from "../../utils/extracting/storplace.js";
import { parseIStorageData } from "../../utils/extracting/iStorage.js";
import { parseStorageRentalsData } from "../../utils/extracting/storageRentals.js";
import jsdom from "jsdom";
import { databaseClient } from "../../database/index.js";
import { logger } from "../../utils/log/logger.util.js";

const client = new scrapingbee.ScrapingBeeClient(
	process.env.SCRAPING_BEE_API_KEY
);
export const scrapeService = {
	getScrapedDOM: async (url, selector) => {
		try {
			const response = await client.get({
				url,
				params: {
					block_resources: "True",
					wait_browser: "load",
					wait_for: selector,
				},
			});
			return response.data;
		} catch (error) {
			logger.error(
				`Error fetching data from ${url}: ${error.message}`
			);
			throw error;
		}
	},

	minifyHTML: (scrapedHtml) => {
		try {
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
		} catch (error) {
			console.error(
				"Error minifying HTML:",
				error.message
			);
			throw error;
		}
	},

	scrapeAndStore: async (
		facilityName,
		scrapeFunction
	) => {
		try {
			const endpoints = urls.filter(
				(url) => url.facilityName === facilityName
			);

			const storageUnits = await Promise.all(
				endpoints.map(async (endpoint) => {
					try {
						const scrapedData =
							await scrapeFunction(endpoint.url);
						return scrapedData;
					} catch (error) {
						console.error(
							`Error scraping ${facilityName}: ${error.message}`
						);
						return null;
					}
				})
			);

			const snapshots =
				await databaseClient.snapshot.create({
					data: {
						storageUnits: {
							create:
								storageUnits.filter(Boolean),
						}, // filter out null values
						facility: {
							connect: { facilityName },
						},
					},
				});

			return snapshots;
		} catch (error) {
			console.error(
				`Error processing ${facilityName}: ${error.message}`
			);
			throw error;
		}
	},

	scrapeFullStorPlace: async () => {
		try {
			// const endPoints =
			// 	await databaseClient.endPoints.findMany({
			// 		where: {
			// 			facilityName: "storPlace",
			// 		},
			// 	});

			const endPoints = urls.map((url) => {
				return {
					url: url,
					facilityName: "storplace",
				};
			});
			let storageUnits = [];
			endPoints.map(async (endPoint) => {
				let result =
					await scrapeService.scrapeStorPlaceOnce(
						endPoint.url
					);
				storageUnits.push(result);
			});

			console.log(storageUnits);
			// const snapshots =
			// 	await databaseClient.snapshot.create({
			// 		data: {
			// 			storageUnits: {
			// 				create: storageUnits,
			// 			},
			// 			facility: {
			// 				connect: {
			// 					facilityName: "storPlace",
			// 				},
			// 			},
			// 		},
			// 	});

			// return snapshots;
		} catch (error) {
			console.log(error);
		}
	},

	scrapeFullIStorage: async () => {
		try {
			const endPoints =
				await databaseClient.endPoints.findMany({
					where: {
						facilityName: "IStorage",
					},
				});

			logger.info(
				`Scraping ${endPoints.length} endpoints`
			);
			const storageUnits = await Promise.all(
				endPoints.map(async (endPoint) => {
					return await scrapeService.scrapeIStorageOnce(
						endPoint.url
					);
				})
			);

			const snapshots =
				await databaseClient.snapshot.create({
					data: {
						storageUnits: {
							create: storageUnits[0].map(
								(unit) => {
									return {
										...unit,
									};
								}
							),
						},
						facility: {
							connect: {
								name: "IStorage",
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

	scrapeIStorageOnce: async (url) => {
		let extractedIStorageData;
		try {
			let data;
			logger.info(`Scraping ${url}`);
			const scraped =
				await scrapeService.getScrapedDOM(
					url,
					".unit-select-item"
				);

			let decoder = new TextDecoder();
			let text = decoder.decode(scraped);
			data = scrapeService.minifyHTML(text);
			extractedIStorageData =
				parseIStorageData(data);

			return extractedIStorageData;
		} catch (error) {
			logger.error(error);
		}
	},

	scrapeStorPlaceOnce: async (url) => {
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
