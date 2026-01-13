import pool from "#config/database.js";

const getAll = async () => {
    const [rows] = await pool.query(`SELECT * FROM conversations`);
    return rows;
};

const getOne = async (id) => {
    const [rows] = await pool.query(
        `SELECT * FROM conversations WHERE id = ?`,
        [id]
    );
    return rows[0];
};

const create = async (userName, conversationName, type) => {
    const [rows] = await pool.query(
        `INSERT INTO conversations (created_by, name, type) VALUES (?,?,?)`,
        [userName, conversationName, type]
    );
    return rows;
};
const addUserToConversation = async (user_id, conversation_id) => {
    const [rows] = await pool.query(
        `INSERT INTO conversation_participants (conversation_id, user_id)
        VALUES (?, ?);`,
        [conversation_id, user_id]
    );
    return rows;
};

const userInConversation = async (user_id, conversation_id) => {
    const [rows] = await pool.query(
        `SELECT * FROM conversation_participants WHERE conversation_id = ? AND user_id = ?`,
        [conversation_id, user_id]
    );
    return rows.length > 0;
};

const addMessage = async (user_id, conversation_id, content) => {
    const [rows] = await pool.query(
        `INSERT INTO messages (sender_id, conversation_id, content) VALUES(?,?,?)`,
        [user_id, conversation_id, content]
    );
    return rows.insertId;
};

const getAllMessageFromConversation = async (conversation_id) => {
    const [rows] = await pool.query(
        `SELECT * FROM messages WHERE conversation_id = ?`,
        [conversation_id]
    );
    return rows;
};

const getUserConversations = async (user_id) => {
    const [rows] = await pool.query(
        `SELECT DISTINCT c.* FROM conversations c
         JOIN conversation_participants cp ON c.id = cp.conversation_id
         WHERE cp.user_id = ?
         ORDER BY c.created_at DESC`,
        [user_id]
    );
    return rows;
};

const getAllMessageFromConversationWithSender = async (conversation_id) => {
    const [rows] = await pool.query(
        `SELECT m.id, m.conversation_id, 
                JSON_OBJECT('id', u.user_id, 'email', u.email) as sender,
                m.content, m.created_at
         FROM messages m
         JOIN users u ON m.sender_id = u.user_id
         WHERE m.conversation_id = ?
         ORDER BY m.created_at ASC`,
        [conversation_id]
    );
    return rows;
};

export default {
    getAll,
    getOne,
    addUserToConversation,
    userInConversation,
    create,
    addMessage,
    getAllMessageFromConversation,
    getUserConversations,
    getAllMessageFromConversationWithSender,
};
