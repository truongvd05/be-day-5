import jwt from "jsonwebtoken";
import jwtconfig from "#config/jwt.js";
import userModel from "#models/user.model.js";

const authMeRequired = async (req, res, next) => {
    const access_token = req.headers.authorization.split(" ")[1].trim();
    try {
        const payload = jwt.verify(access_token, jwtconfig.secret);
        const currentUser = await userModel.findUserById(payload.sub);
        if (currentUser) {
            req.user = currentUser;
        }
    } catch (err) {
        return res.error("Unauthorized", 401);
    }
    next();
};

export default authMeRequired;
