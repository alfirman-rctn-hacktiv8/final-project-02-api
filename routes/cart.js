const router = require("express").Router();
const { getCartItems, addCartItem, removeCartItem } = require("../controllers/cart");

router.get("/", getCartItems);
router.post("/", addCartItem);
router.delete("/", removeCartItem);

module.exports = router;
