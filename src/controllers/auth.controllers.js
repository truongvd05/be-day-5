import authModel from "../models/auth.model.js";
import jwtconfig from "#config/jwt.js";
import jwtService from "#service/jwtService.js";

const register = async (req, res) => {
    const { email, password } = req.body;
    try {
        const emailUser = await authModel.findUserByEmail(email);
        if (emailUser.length > 0) {
            return res.error(
                {
                    message: "Email không hợp lệ",
                },
                409
            );
        }
        const result = await authModel.registerUser(email, password);

        const token = jwtService(result.insertId, jwtconfig.secret);

        res.success(
            {
                id: result.insertId,
                email,
            },
            201,
            {
                access_token: token,
                access_token_ttl: 3600,
            }
        );
    } catch (err) {
        console.log(err);
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await authModel.findUserByEmailAndPassword(
            email,
            password
        );
        if (user.length === 0) {
            return res.error(
                {
                    message: "Email hoặc password không đúng",
                },
                401
            );
        }
        const token = jwtService(user[0].user_id, jwtconfig.secret);
        return res.success(user[0].email, 200, {
            access_token: token,
            access_token_ttl: 3600,
        });
    } catch (err) {
        console.log(err);
    }
};

const getCurrentUser = async (req, res) => {
    return res.success({
        user_id: req.user.user_id,
        email: req.user.email,
    });
};

export default { register, login, getCurrentUser };
