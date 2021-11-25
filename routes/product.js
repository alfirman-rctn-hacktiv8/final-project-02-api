const router = require("express").Router();
const { addProduct, updateProduct, getProducts, getProduct } = require("../controllers/product");

router.get("/", getProducts);
router.post("/", addProduct);
router.get("/:productId", getProduct);
router.put("/:productId", updateProduct);

module.exports = router;
