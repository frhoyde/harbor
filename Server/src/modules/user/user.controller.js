import argon2 from "argon2";
import jwt from "jsonwebtoken";

export const userController = {
	registerUser: async (req, res) => {
		try {
			const { user } = req.body;

			if (
				!user.username ||
				!user.password ||
				!user.email
			) {
				return res.status(400).json({
					message:
						"Username and password and email are required",
				});
			}

			const userExists =
				await userService.getUserByEmail(
					user.email
				);

			if (userExists) {
				return res.status(400).json({
					message: "User already exists",
				});
			}

			await userService.register(user);
			return res.status(201).json({
				message: "User registered successfully",
			});
		} catch (error) {
			return res.status(500).json({
				message: "Internal server error",
			});
		}
	},

	loginUser: async (req, res) => {
		try {
			const { email, password } = req.body;
			const user =
				await userService.getUserByEmail(email);

			if (!user) {
				return res.status(404).json({
					message: "User not found",
				});
			}

			const passwordMatch = await argon2.verify(
				user.password,
				password
			);

			if (!passwordMatch) {
				return res.status(401).json({
					message: "Invalid credentials",
				});
			}

			const token = jwt.sign(
				{
					id: user.id,
					email: user.email,
				},
				process.env.JWT_SECRET,
				{
					expiresIn: "1h",
				}
			);

			return res.status(200).json({
				message: "User logged in successfully",
				token,
			});
		} catch (error) {
			return res.status(500).json({
				message: "Internal server error",
			});
		}
	},

	updateUser: async (req, res) => {
		try {
			const { id } = req.params;
			const user = req.body;
			await userService.updateUser(id, user);
			res.status(200).json({
				message: "User updated successfully",
			});
		} catch (error) {
			res.status(500).json({
				message: "Internal server error",
			});
		}
	},

	deleteUser: async (req, res) => {
		try {
			const { id } = req.params;
			await userService.deleteUser(id);
			res.status(200).json({
				message: "User deleted successfully",
			});
		} catch (error) {
			res.status(500).json({
				message: "Internal server error",
			});
		}
	},
};
