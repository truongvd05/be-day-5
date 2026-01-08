import pool from "#config/database.js";

const findUserById = async (id) => {
    const [rows] = await pool.query(`SELECT * FROM users WHERE user_id = ?`, [
        id,
    ]);
    return rows[0] || null;
};

const searchByEmail = async (email) => {
    const [rows] = await pool.query(`SELECT * FROM users WHERE email = ?`, [
        email,
    ]);
    return rows[0] || null;
};

export default { findUserById, searchByEmail };
