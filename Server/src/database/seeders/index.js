import { seedEndpoints } from "./seedEndpoints.js";

export const seedDataBase = async () => {
	await seedEndpoints();
};
