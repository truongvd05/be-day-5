import pool from "#config/database.js";
import bcrypt from "bcrypt";

const registerUser = async (email, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [rows] = await pool.query(
        `INSERT INTO users (email, password) VALUES (?, ?)`,
        [email, hashedPassword]
    );
    return rows;
};

const findUserByEmailAndPassword = async (email, password) => {
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [
        email,
    ]);
    if (rows.length === 0) return [];
    const isMatch = await bcrypt.compare(password, rows[0].password);
    return isMatch ? rows : [];
};

const findUserByEmail = async (email) => {
    const [rows] = await pool.query(
        `SELECT * FROM users WHERE email = ? LIMIT 1`,
        [email]
    );
    return rows || null;
};

export default { registerUser, findUserByEmailAndPassword, findUserByEmail };
