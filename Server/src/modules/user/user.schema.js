import { z } from "zod";

export const UserSchema = {
	registerUserSchema: z.object({
		body: z.object({
			username: z.string(),
			email: z.string().email(),
			password: z.string().min(6).max(50),
			organizationUuid: z.string().min(1).max(50),
		}),
	}),
	updateUserSchema: z.object({
		params: z.object({
			id: z.string().uuid(),
		}),
		body: z.object({
			username: z.string(),
			email: z.string().email(),
			password: z.string().min(6).max(50),
			organizationUuid: z.string().min(1).max(50),
		}),
	}),
};
