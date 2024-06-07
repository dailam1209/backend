const express = require("express");
const router = express.Router();
const { create, change, remove   } = require("../controllers/CartController");
const { isAuthenticatedUser } = require("../middleware/auth");


router.route("/create").post(isAuthenticatedUser, create);
router.route("/change").post(isAuthenticatedUser, change);
router.route("/remove").post(isAuthenticatedUser, remove);

module.exports = router;