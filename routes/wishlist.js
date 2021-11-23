const router = require("express").Router();
const {
  getWishlistItems,
  addWishlistItem,
  removeWishlistItem,
} = require("../controllers/wishlist");

router.get("/", getWishlistItems);
router.post("/add", addWishlistItem);
router.post("/remove", removeWishlistItem);

module.exports = router;
