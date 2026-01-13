import express from "express";
import usersControllers from "#controllers/users.controllers.js";
import authMeRequired from "#middlewares/authMeRequired.js";

const userRouter = express.Router();

userRouter.get("/search", authMeRequired, usersControllers.search);

export default userRouter;
