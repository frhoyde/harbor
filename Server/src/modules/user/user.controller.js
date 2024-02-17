export const userController = {
	registerUser: async (req, res) => {
		try {
			const user = req.body;
			await userService.registerUser(user);
			res
				.status(201)
				.json({
					message: "User registered successfully",
				});
		} catch (error) {
			res
				.status(500)
				.json({
					message: "Internal server error",
				});
		}
	},

	updateUser: async (req, res) => {
		try {
			const { id } = req.params;
			const user = req.body;
			await userService.updateUser(id, user);
			res
				.status(200)
				.json({
					message: "User updated successfully",
				});
		} catch (error) {
			res
				.status(500)
				.json({
					message: "Internal server error",
				});
		}
	},

	deleteUser: async (req, res) => {
		try {
			const { id } = req.params;
			await userService.deleteUser(id);
			res
				.status(200)
				.json({
					message: "User deleted successfully",
				});
		} catch (error) {
			res
				.status(500)
				.json({
					message: "Internal server error",
				});
		}
	},
};
