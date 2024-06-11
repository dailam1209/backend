const express = require("express");
const router = express.Router();
const { signup, signin, getuser, updateuser } = require("../controllers/UserController");
const { isAuthenticatedUser } = require("../middleware/auth");


router.route("/signup").post(signup);
router.route("/signin").post(signin);
router.route("/getuser").post(isAuthenticatedUser, getuser);
router.route("/updateuser").post(isAuthenticatedUser, updateuser)


module.exports = router;