import { z } from "zod";

export const StorageSchema = {
	createStorageFacilitySchema: z.object({
		body: z.object({
			name: z.string(),
			address: z.string(),
			contact: z.object({
				phone: z.string(),
				email: z.string().email(),
			}),
			websiteUrl: z.string().url(),
			organizationUuid: z.string().min(1).max(50),
		}),
	}),
	updateStorageFacilitySchema: z.object({
		params: z.object({
			id: z.string().uuid(),
		}),
		body: z.object({
			name: z.string(),
			address: z.string(),
			contact: z.object({
				phone: z.string(),
				email: z.string().email(),
			}),
			websiteUrl: z.string().url(),
			organizationUuid: z.string().min(1).max(50),
		}),
	}),
	createOneEndPointSchema: z.object({
		body: z.object({
			url: z.string().url(),
			facilityId: z.string().uuid(),
		}),
	}),
	createOneStorageUnitSchema: z.object({
		body: z.object({
			size: z.object({
				width: z.number(),
				height: z.number(),
			}),
			price: z.number(),
			type: z.string(),
			features: z.array(z.string()),
			special: z.string(),
			snapshotId: z.string().uuid(),
		}),
	}),
	createBulkStorageUnitSchema: z.object({
		body: z.object({
			units: z.array(createOneStorageUnitSchema),
		}),
	}),
};
