const express = require("express");
const router = express.Router();
const { create, allBlog } = require("../controllers/BlogController");

router.route("/create").post(create);
router.route("/all").get(allBlog);



module.exports = router;