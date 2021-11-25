const router = require("express").Router();
const { getWishlistItems, toggleWishlistItem } = require("../controllers/wishlist");

router.get("/", getWishlistItems);
router.put("/", toggleWishlistItem);

module.exports = router;
