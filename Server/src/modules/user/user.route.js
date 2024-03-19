import { Router } from "express";
import { userController } from "./user.controller.js";
import { validate } from "../../middlewares/validate.middleware.js";

const userRouter = Router();

userRouter.post(
	"/user/register",
	validate(userSchema.registerUserSchema),
	userController.registerUser
);

userRouter.get(
	"/login",
	userController.loginUser
);

userRouter.patch(
	"/user/:id",
	validate(userSchema.updateUserSchema),
	userController.updateUser
);

userRouter.delete(
	"/user/:id",
	userController.deleteUser
);
