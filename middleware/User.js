const UserModel = require("../modules/UserModule");
const verrifyToken = async (req, res, next) => {
    try {
        const token  = req.cookies.token;
        if(!token) {
            return res.status(401).json({ message: "Unauthorized"});
        }
        const user = await UserModel.findByToken(token);
        if(!user) {
            return res.status(401).json({
                message: "Unauthorized"
            })

        }
        req.user = user;
        next()
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

module.exports = verrifyToken;