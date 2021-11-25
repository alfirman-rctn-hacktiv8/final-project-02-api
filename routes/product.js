const router = require("express").Router();
const { addProduct } = require("../controllers/product");

router.post("/", addProduct);

module.exports = router;
