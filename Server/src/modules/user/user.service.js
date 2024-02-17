import { databaseClient } from "../../database/index.js";
export const userService = {
	createUser: async (data) => {
		try {
			await databaseClient.user.create({
				data: {
					...data,
				},
			});
		} catch (error) {
			throw new Error(error);
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
