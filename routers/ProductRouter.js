const express = require("express");
const router = express.Router();
const { create, search, bestseller, categorys, detail, manufactures   } = require("../controllers/ProductController");


router.route("/create").post(create);
router.route("/search").post(search);
router.route("/bestseller").post(bestseller);
router.route("/category").get(categorys);
router.route("/detail").post(detail);
router.route("/manufactures").get(manufactures);



module.exports = router;