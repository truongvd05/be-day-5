import pool from "#config/database.js";

const findUserById = async (id) => {
    const [rows] = await pool.query(`SELECT * FROM users WHERE user_id = ?`, [
        id,
    ]);
    return rows[0] || null;
};

const searchByEmail = async (email, excludeUserId) => {
    const [rows] = await pool.query(
        `SELECT user_id, email FROM users 
         WHERE email LIKE ? AND user_id != ?
         LIMIT 10`,
        [`%${email}%`, excludeUserId]
    );
    return rows[0] || null;
};

export default { findUserById, searchByEmail };
