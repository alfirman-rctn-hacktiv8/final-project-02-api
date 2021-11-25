const router = require("express").Router();
const { addProduct, updateProduct, getProducts, getProduct, deleteProduct } = require("../controllers/product");

router.get("/", getProducts);
router.post("/", addProduct);
router.get("/:productId", getProduct);
router.put("/:productId", updateProduct);
router.delete("/:productId", deleteProduct);

module.exports = router;
