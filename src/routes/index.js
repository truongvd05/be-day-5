import express from "express";

const router = express.Router();

import authRouter from "./auth.route.js";
import conversationsRoute from "./conversations.route.js";
import userRouter from "./users.route.js";

router.use("/auth", authRouter);
router.use("/conversations", conversationsRoute);
router.use("/users", userRouter);

export default router;
