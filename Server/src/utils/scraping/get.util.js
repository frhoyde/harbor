import scrapingbee from 'scrapingbee';
import { env } from '../../config.js';

export async function get(url) {
    var client = new scrapingbee.ScrapingBeeClient(env.scrapingBeeApiKey);
    var response = await client.get({
        url: url,
        params: {

        },
    })
    return response;
}