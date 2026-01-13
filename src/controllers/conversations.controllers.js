import conversationsModel from "../models/conversations.model.js";
import userModel from "../models/user.model.js";

const getAllConversation = async (req, res) => {
    const user_id = req.user.user_id;
    try {
        const rows = await conversationsModel.getUserConversations(user_id);
        return res.success(rows, 200);
    } catch (err) {
        return res.error({ message: "Internal server error" }, 500);
    }
};

const createConversations = async (req, res) => {
    const { name, type, participant_ids } = req.body;
    const userName = req.user.email;
    const typeString =
        typeof type === "string" ? type.toLowerCase().trim() : "";
    if (!type || !["group", "direct"].includes(typeString)) {
        return res.error({ message: "Invalid conversation type" }, 400);
    }
    if (!name || name.trim().length < 3) {
        return res.error(
            { message: "name must be at least 3 characters" },
            400
        );
    }
    if (!Array.isArray(participant_ids)) {
        return res.error({ message: "participant_ids must be an array" }, 400);
    }
    try {
        const newConversation = await conversationsModel.create(
            userName,
            name,
            type
        );
        await conversationsModel.addUserToConversation(
            user_id,
            newConversation.insertId
        );
        for (const participantId of participant_ids) {
            await conversationsModel.addUserToConversation(
                participantId,
                newConversation.insertId
            );
        }
        return res.success(
            {
                id: newConversation.insertId,
                name,
                type,
                created_by: user_id,
            },
            201
        );
    } catch (err) {
        return res.error({ message: "Internal server error" }, 500);
    }
};

const addMember = async (req, res) => {
    const { user_id } = req.body;
    const conversationId = +req.params.id;
    // validate conversation id
    if (!Number.isInteger(conversationId) || conversationId <= 0) {
        return res.error({ message: "Invalid conversation id" }, 400);
    }
    // validate user id
    if (!Number.isInteger(user_id) || user_id <= 0) {
        return res.error({ message: "Invalid user id" }, 400);
    }
    try {
        const conversation = await conversationsModel.getOne(conversationId);
        // kiểm tra conversation có tồn tại hay không
        if (!conversation) {
            return res.error(
                {
                    message: "conversation not found",
                },
                404
            );
        }
        // kiểm tra xem conversation type là gì
        if (conversation.type === "direct") {
            return res.error(
                {
                    message: "Not allow to add",
                },
                400
            );
        }
        const user = await userModel.findUserById(user_id);
        // kiểm tra xem user được add có tồn tại hay không?
        if (!user) {
            return res.error({ message: "User not found" }, 404);
        }
        // kiểm tra xem user có ở trong conversation chưa
        const userIn = await conversationsModel.userInConversation(
            user_id,
            conversation.id
        );
        if (userIn) {
            return res.error({ message: "user already in conversation" }, 400);
        }
        const addUser = await conversationsModel.addUserToConversation(
            user_id,
            conversation.id
        );
        return res.success(
            {
                message: "Add member successfully",
            },
            200
        );
    } catch (err) {
        console.log(err);
        return res.error({ message: "Internal server error" }, 500);
    }
};

const send = async (req, res) => {
    const conversationId = +req.params.id;
    const user_id = req.user.user_id;
    const { content } = req.body;
    try {
        if (typeof content !== "string" || content.trim().length === 0) {
            return res.error({ message: "invalid content" }, 400);
        }
        // validate conversation id
        if (!Number.isInteger(conversationId) || conversationId <= 0) {
            return res.error({ message: "Invalid conversation id" }, 400);
        }
        // kiểm tra conversation có tồn tại hay không
        const conversation = await conversationsModel.getOne(conversationId);
        if (!conversation) {
            return res.error(
                {
                    message: "conversation not found",
                },
                404
            );
        }
        // kiểm tra xem user có ở trong conversation không
        const userIn = await conversationsModel.userInConversation(
            user_id,
            conversation.id
        );
        if (!userIn) {
            return res.error({ message: "Not a conversation member" }, 403);
        }

        const sendMessage = await conversationsModel.addMessage(
            user_id,
            conversationId,
            content
        );
        return res.success(
            { id: sendMessage, content: content.trim(), sender_id: user_id },
            201
        );
    } catch (err) {
        console.log(err);
    }
};
const getAllMessage = async (req, res) => {
    const conversationId = +req.params.id;
    const user_id = req.user.user_id;
    // validate conversation id
    if (!Number.isInteger(conversationId) || conversationId <= 0) {
        return res.error({ message: "Invalid conversation id" }, 400);
    }
    try {
        const conversation = await conversationsModel.getOne(conversationId);
        if (!conversation) {
            return res.error({ message: "conversation not found" }, 404);
        }
        const userIn = await conversationsModel.userInConversation(
            user_id,
            conversationId
        );
        if (!userIn) {
            return res.error({ message: "Not a conversation member" }, 403);
        }
        const messages =
            await conversationsModel.getAllMessageFromConversationWithSender(
                conversationId
            );
        res.success(messages, 200);
    } catch (err) {
        return res.error({ message: "Internal server error" }, 500);
    }
};

export default {
    createConversations,
    addMember,
    getAllConversation,
    send,
    getAllMessage,
};
