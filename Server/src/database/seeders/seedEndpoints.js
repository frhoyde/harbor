import { databaseClient } from "../index.js";
export const seedEndpoints = async () => {
	let existingEndpoints;

	try {
		existingEndpoints =
			await databaseClient.endPoints.findMany();
	} catch (error) {
		console.log(error);
	}

	if (existingEndpoints) {
		return;
	}

	const storageLocations = urls.map((url) => {
		return {
			url: url,
			facilityName: "storplace",
		};
	});
	const seededEndpoints =
		await databaseClient.endPoints.createMany({
			data: storageLocations,
		});
};
export const urls = [
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
