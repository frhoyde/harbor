import { config } from "dotenv";

config();

export const env = {
    port: process.env.PORT || 8000,
    scrapingBeeApiKey: process.env.SCRAPING_BEE_API_KEY
};

