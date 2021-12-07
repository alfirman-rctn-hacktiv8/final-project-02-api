const router = require("express").Router();
const { getCartItems, addCartItem, removeCartItem, checkout } = require("../controllers/cart");

router.get("/", getCartItems);
router.post("/", addCartItem);
router.delete("/", removeCartItem);
router.post("/checkout", checkout);

module.exports = router;
