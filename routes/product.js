const router = require("express").Router();
const adminOnly = require("../middleware/adminOnly")
const { addProduct, updateProduct, getProducts, getProduct, deleteProduct } = require("../controllers/product");

router.get("/", getProducts);
router.get("/:productId", getProduct);
router.post("/", adminOnly, addProduct);
router.put("/:productId", adminOnly, updateProduct);
router.delete("/:productId", adminOnly, deleteProduct);

module.exports = router;
