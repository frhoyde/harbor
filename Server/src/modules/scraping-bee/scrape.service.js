import htmlMinifier from "html-minifier";
import scrapingbee from "scrapingbee";
import { extractStorePlace } from "../../utils/extracting/storplace.js";
import { parseIStorageData } from "../../utils/extracting/iStorage.js";
import { parseStorageRentalsData } from "../../utils/extracting/storageRentals.js";
import { databaseClient } from "../../database/index.js";
import { logger } from "../../utils/log/logger.util.js";
import { getScrapedDOM } from "../../utils/scraping/get-scraped-dom.util.js";

export const scrapeService = {
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
			logger.error(
				`Error minifying HTML:",
				${error}`
			);
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
						},
						facility: {
							connect: { facilityName },
						},
					},
				});

			return snapshots;
		} catch (error) {
			logger.error(
				`Error processing ${facilityName}: ${error}`
			);
		}
	},

	scrapeFullStorPlace: async () => {
		try {
			const endPoints =
				await databaseClient.endPoints.findMany({
					where: {
						facilityName: "StorPlace",
					},
				});
			if (!endPoints.length) {
				throw new Error("No endpoints were found");

			}
			logger.info(
				`Scraping ${endPoints.length} endpoints`
			);


			const storageUnits = await Promise.all(
				endPoints.map(async (endPoint) => {
					return await scrapeService.scrapeStorPlaceOnce(
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
								name: "StorPlace",
							},
						},
					},
				});
			return snapshots;
		} catch (error) {
			logger.error(
				`Error scraping StorPlace: ${error}`
			);
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
			if (!endPoints.length) {
				throw new Error("No endpoints were found");

			}
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
			logger.error(
				`Error scraping IStorage: ${error}`
			);
		}
	},

	// scrapeFullStorageRentals: async () => {
	// 	try {
	// 		const endPoints =
	// 			await databaseClient.endPoints.findMany({
	// 				where: {
	// 					facilityName: "storageRentals",
	// 				},
	// 			});

	// 		const storageUnits = await Promise.all(
	// 			endPoints.map((endPoint) => {
	// 				return scrapeService.scrapeStorageRentalsOnce(
	// 					endPoint.url
	// 				);
	// 			})
	// 		);

	// 		const snapshots =
	// 			await databaseClient.snapshot.create({
	// 				data: {
	// 					storageUnits: {
	// 						create: storageUnits,
	// 					},
	// 					facility: {
	// 						connect: {
	// 							facilityName: "storageRentals",
	// 						},
	// 					},
	// 				},
	// 			});

	// 		return snapshots;
	// 	} catch (error) {
	// 		logger.error(
	// 			`Error scraping StorageRentals: ${error}`
	// 		);
	// 	}
	// },

	// scrapeStorageRentalsOnce: async (req, res) => {
	// 	let extractedStorageRentalsData;
	// 	try {
	// 		let data;
	// 			.getScrapedDOM(
	// 				"https://www.sroa.com/storage-units/tennessee/old-hickory"
	// 			)
	// 			.then(function (response) {
	// 				let decoder = new TextDecoder();
	// 				let text = decoder.decode(
	// 					response.data
	// 				);
	// 				data = scrapeService.minifyHTML(text);
	// 				console.log(data);
	// 				extractedStorageRentalsData =
	// 					parseStorageRentalsData(data);
	// 				res.send(data);
	// 			})
	// 			.catch((e) => console.log(e));
	// 	} catch (error) {
	// 		logger.error(
	// 			`Error scraping StorageRentals: ${error}`
	// 		);
	// 	}
	// },

	scrapeIStorageOnce: async (url) => {
		let extractedIStorageData;
		try {
			let data;
			logger.info(`Scraping ${url}`);
			const scraped = await getScrapedDOM(
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
			logger.error(
				`Error scraping IStorage: ${error}`
			);
		}
	},

	scrapeStorPlaceOnce: async (url) => {
		let extractedStorePlacedata;
		try {
			let data;
			logger.info(`Scraping ${url}`);
			const scraped = await getScrapedDOM(
				url,
				".card-body"
			);
			let decoder = new TextDecoder();
			let text = decoder.decode(scraped);
			data = scrapeService.minifyHTML(text);
			extractedStorePlacedata =
				extractStorePlace(data);

			return extractedStorePlacedata;
		} catch (error) {
			logger.error(
				`Error scraping StorPlace: ${error}`
			);
		}
	},
};
