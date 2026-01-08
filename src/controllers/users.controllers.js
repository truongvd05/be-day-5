import userModel from "#models/user.model.js";

const search = async (req, res) => {
    const { q } = req.query;
    try {
        if (!q || typeof q !== "string") {
            return res.error({ message: "Missing search query" }, 400);
        }
        const keyword = q.trim();
        const users = await userModel.searchByEmail(keyword);
        console.log(users);

        if (!users) {
            return res.error({ message: "user not found" }, 404);
        }
        return res.success({ user_id: users.user_id, email: users.email }, 200);
    } catch (err) {
        console.log(err);
    }
};

export default { search };
