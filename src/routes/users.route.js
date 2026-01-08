import express from "express";
import usersControllers from "#controllers/users.controllers.js";

const userRouter = express.Router();

userRouter.get("/search", usersControllers.search);

export default userRouter;
