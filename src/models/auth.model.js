import pool from "#config/database.js";

const registerUser = async (email, password) => {
    const [rows] = await pool.query(
        `INSERT INTO users (email, password) VALUES (?, ?)`,
        [email, password]
    );
    return rows;
};

const findUserByEmailAndPassword = async (email, password) => {
    const [rows] = await pool.query(
        "SELECT * FROM users WHERE email = ? AND `password` = ?",
        [email, password]
    );
    return rows;
};

const findUserByEmail = async (email) => {
    const [rows] = await pool.query(
        `SELECT * FROM users WHERE email = ? LIMIT 1`,
        [email]
    );
    return rows || null;
};

export default { registerUser, findUserByEmailAndPassword, findUserByEmail };
