import express from "express";
import * as UsersController from "../controllers/auth";


const authRouter = express.Router();

authRouter.post("/signup", UsersController.signup);

authRouter.post("/login", UsersController.login);

authRouter.post("/:id/verify/:token", UsersController.verifyEmail);

authRouter.post("/forgotpassword", UsersController.forgotpassword);

authRouter.put("/reset-password/:resetToken", UsersController.resetPassword);

export default authRouter;