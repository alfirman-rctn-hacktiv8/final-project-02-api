const router = require("express").Router();
const adminOnly = require("../middleware/adminOnly")
const { addProduct, updateProduct, getProducts, getProduct, deleteProduct, getIncomeData, checkout } = require("../controllers/product");

router.get("/", getProducts);
router.get("/income", adminOnly, getIncomeData);
router.get("/:productId", getProduct);
router.post("/", adminOnly, addProduct);
router.post("/checkout", checkout);
router.put("/:productId", adminOnly, updateProduct);
router.delete("/:productId", adminOnly, deleteProduct);

module.exports = router;
