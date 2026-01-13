import userModel from "#models/user.model.js";

const search = async (req, res) => {
    const { q } = req.query;
    const user_id = req.user.user_id;
    try {
        if (!q || typeof q !== "string" || q.trim().length === 0) {
            return res.error({ message: "Missing search query" }, 400);
        }
        const keyword = q.trim();
        const users = await userModel.searchByEmail(keyword, user_id);

        if (!users) {
            return res.error({ message: "user not found" }, 404);
        }
        return res.success({ user_id: users.user_id, email: users.email }, 200);
    } catch (err) {
        return res.error({ message: "Internal server error" }, 500);
    }
};

export default { search };
