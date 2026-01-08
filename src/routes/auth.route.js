import express from "express";

import authController from "../controllers/auth.controllers.js";
import authMeRequired from "#middlewares/authMeRequired.js";

const authRouter = express.Router();

authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);
authRouter.get("/me", authMeRequired, authController.getCurrentUser);

export default authRouter;
