const router = require("express").Router();
const { addProduct, updateProduct, getProducts } = require("../controllers/product");

router.get("/", getProducts);
router.post("/", addProduct);
router.put("/:productId", updateProduct);

module.exports = router;
