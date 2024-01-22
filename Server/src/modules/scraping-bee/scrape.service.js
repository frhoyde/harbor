import htmlMinifier from "html-minifier";
import scrapingbee from "scrapingbee";

export const scrapeService = {
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
				// You can add more options based on your requirements
			}
		);

		return minifiedHtml;
	},
};
