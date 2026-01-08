import jwt from "jsonwebtoken";

const jwtService = (userid, secret) => {
    const token = jwt.sign(
        {
            sub: userid,
            exp: Date.now() + 60 + 60 + 1000,
        },
        secret
    );
    return token;
};

export default jwtService;
