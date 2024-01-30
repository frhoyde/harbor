import { logger } from "../../utils/log/logger.util.js";
import { databaseClient } from "../index.js";
export const seedEndpoints = async () => {
	let existingEndpoints;

	try {
		existingEndpoints =
			await databaseClient.endPoints.findMany();
	} catch (error) {
		console.log(error);
	}

	if (existingEndpoints.length) {
		return;
	}

	const storplaceLocations = storplaceUrls.map(
		(url) => {
			return {
				url: url,
				facilityName: "StorPlace",
			};
		}
	);

	const istorageLocations = istorageUrls.map(
		(url) => {
			return {
				url: url,
				facilityName: "IStorage",
			};
		}
	);
	try {
		const seededEndpoints =
			await databaseClient.endPoints.createMany({
				data: [
					...storplaceLocations,
					...istorageLocations,
				],
			});

		logger.info(
			"Database seeded with endpoints."
		);
	} catch (error) {
		console.log(error);
	}
};
export const storplaceUrls = [
	"https://www.storplaceselfstorage.com/storage-units/kentucky/bowling-green/storplace-of-greenwood-347038/",
	"https://www.storplaceselfstorage.com/storage-units/tennessee/murfreesboro/storplace-of-veterans-parkway-347051/",
	"https://www.storplaceselfstorage.com/storage-units/tennessee/murfreesboro/storplace-of-barfield-347045/",
	"https://www.storplaceselfstorage.com/storage-units/tennessee/murfreesboro/storplace-of-stones-river-347043/",
	"https://www.storplaceselfstorage.com/storage-units/tennessee/murfreesboro/storplace-of-rutherford-blvd-347052/",
	"https://www.storplaceselfstorage.com/storage-units/tennessee/murfreesboro/storplace-of-lascassas-pike-347044/",
	"https://www.storplaceselfstorage.com/storage-units/tennessee/murfreesboro/storplace-of-north-murfreesboro-3501029/",
	"https://www.storplaceselfstorage.com/storage-units/tennessee/franklin/storplace-of-franklin-347041/",
	"https://www.storplaceselfstorage.com/storage-units/tennessee/nolensville/storplace-of-nolensville-347055/",
	"https://www.storplaceselfstorage.com/storage-units/tennessee/brentwood/storplace-of-cool-springs-347039/",
	"https://www.storplaceselfstorage.com/storage-units/tennessee/nashville/storplace-of-old-hickory-blvd-at-nolensville-road-347037/",
	"https://www.storplaceselfstorage.com/storage-units/tennessee/nashville/storplace-of-murfreesboro-road-347049/",
	"https://www.storplaceselfstorage.com/storage-units/tennessee/nashville/storplace-of-bellevue-347050/",
	"https://www.storplaceselfstorage.com/storage-units/tennessee/hermitage/storplace-of-hermitage-347042/",
	"https://www.storplaceselfstorage.com/storage-units/tennessee/mt-juliet/storplace-of-mt-juliet-347047/",
	"https://www.storplaceselfstorage.com/storage-units/tennessee/nashville/storplace-of-medical-center-347054/",
	"https://www.storplaceselfstorage.com/storage-units/tennessee/hermitage/storplace-of-lebanon-pike-347046/",
	"https://www.storplaceselfstorage.com/storage-units/tennessee/madison/storplace-of-rivergate-347048/",
	"https://www.storplaceselfstorage.com/storage-units/tennessee/hendersonville/storplace-of-hendersonville-347040/",
];

export const istorageUrls = [
	"https://www.istorage.com/storage/tennessee/storage-units-alcoa/142-Airport-Plaza-Blvd-821",
	"https://www.istorage.com/storage/tennessee/storage-units-clarksville/2598-Pea-Ridge-Rd-485",
	"https://www.istorage.com/storage/tennessee/storage-units-franklin/1903-Columbia-Ave-487",
	"https://www.istorage.com/storage/tennessee/storage-units-friendsville/645-Nelson-Ln-857",
	"https://www.istorage.com/storage/tennessee/storage-units-gallatin/465-Belvedere-Dr-N-493",
	"https://www.istorage.com/storage/tennessee/storage-units-hendersonville/1066-W-Main-St-489",
	"https://www.istorage.com/storage/tennessee/storage-units-hermitage/4060B-Andrew-Jackson-Pkwy-491",
	"https://www.istorage.com/storage/tennessee/storage-units-knoxville/4811-Central-Avenue-Pike-823",
	"https://www.istorage.com/storage/tennessee/storage-units-knoxville/4709-Chapman-Hwy-825",
	"https://www.istorage.com/storage/tennessee/storage-units-knoxville/8848-Kingston-Pike-827",
	"https://www.istorage.com/storage/tennessee/storage-units-knoxville/1700-Linden-Ave-829",
	"https://www.istorage.com/storage/tennessee/storage-units-knoxville/4318-Middlebrook-Pike-831",
	"https://www.istorage.com/storage/tennessee/storage-units-knoxville/8713-Unicorn-Dr-833",
	"https://www.istorage.com/storage/tennessee/storage-units-knoxville/4540-Walker-Blvd-835",
	"https://www.istorage.com/storage/tennessee/storage-units-knoxville/1831-Dry-Gap-Pike-875",
	"https://www.istorage.com/storage/tennessee/storage-units-lebanon/136-Maddox-Simpson-Pkwy-497",
	"https://www.istorage.com/storage/tennessee/storage-units-mt-juliet/400-Quarry-Loop-Rd-495",
	"https://www.istorage.com/storage/tennessee/storage-units-spring-hill/3000-Harrah-Dr-499",
	"https://www.istorage.com/storage/tennessee/storage-units-white-house/2979-Union-Rd-605",
	"https://www.istorage.com/storage/tennessee/storage-units-white-house/1120-Highway-76-501",
];
