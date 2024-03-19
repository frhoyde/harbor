import { databaseClient } from "../../database/index.js";
import argon2 from "argon2";

export const userService = {
	register: async (user) => {
		try {
			const hashedPassword = await argon2.hash(
				user.password
			);

			await databaseClient.user.create({
				data: {
					...user,
					password: hashedPassword,
				},
			});
		} catch (error) {
			throw new Error(error);
		}
	},

	getUserByEmail: async (email) => {
		try {
			const user =
				await databaseClient.user.findUnique({
					where: {
						email,
					},
				});

			return user;
		} catch (error) {
			res.status(500).json({
				message: "Internal server error",
			});
		}
	},

	updateUserById: async (id, data) => {
		try {
			await databaseClient.user.update({
				where: {
					id,
				},
				data: {
					...data,
				},
			});
		} catch (error) {
			throw new Error(error);
		}
	},

	deleteUserById: async (id) => {
		try {
			await databaseClient.user.delete({
				where: {
					id,
				},
			});
		} catch (error) {
			throw new Error(error);
		}
	},
};
