const router = require("express").Router();
const {
  getCartItems,
  addCartItem,
  removeCartItem,
} = require("../controllers/cart");

router.get("/", getCartItems);
router.post("/add", addCartItem);
router.post("/remove", removeCartItem);

module.exports = router;
