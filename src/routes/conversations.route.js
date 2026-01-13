import express from "express";

import conversationsControllers from "../controllers/conversations.controllers.js";
import authMeRequired from "#middlewares/authMeRequired.js";

const conversationsRoute = express.Router();

conversationsRoute.get(
    "/",
    authMeRequired,
    conversationsControllers.getAllConversation
);
conversationsRoute.get(
    "/:id/messages",
    authMeRequired,
    conversationsControllers.getAllMessage
);
conversationsRoute.post(
    "/",
    authMeRequired,
    conversationsControllers.createConversations
);
conversationsRoute.post(
    "/:id/participants",
    authMeRequired,
    conversationsControllers.addMember
);

conversationsRoute.post(
    "/:id/messages",
    authMeRequired,
    conversationsControllers.send
);

export default conversationsRoute;
