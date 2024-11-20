import express from "express";
import * as PrivateController from "../controllers/private";
import { protect } from "../middlewares/authProtect";

const usersRouter = express.Router();

usersRouter.get("/user", protect, PrivateController.getUser);

usersRouter.post("/changepassword/:userId", protect, PrivateController.changePassword);

usersRouter.post("/pair-invite", protect, PrivateController.sendPairInvite);

usersRouter.put('/accept-pair/:token/:id', PrivateController.acceptPairInvite);

usersRouter.put('/toggle-pairmode', protect, PrivateController.togglePairMode);

usersRouter.put('/unpair-user', protect, PrivateController.unPairUser);

export default usersRouter;











