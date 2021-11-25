const Wishlist = require("../models/wishlist");
const useAuth = require("../lib/useAuth");

exports.getWishlistItems = async (req, res) => {
  const { error, claims } = useAuth(req.cookies?.jwt);

  if (error) return res.status(error.status).json({ message: error.message });

  try {
    const userWishlist = await Wishlist.findOne({ uid: claims._id });

    res.status(200).json(userWishlist.items);
  } catch (error) {
    return res.status(500).json({ message: "something went wrong", error });
  }
};

exports.toggleWishlistItem = async (req, res) => {
  if (!req.body?.item) return res.status(400).json({ message: "bad request" });

  const { error, claims } = useAuth(req.cookies?.jwt);

  if (error) return res.status(error.status).json({ message: error.message });

  try {
    const userWishlist = await Wishlist.findOne({ uid: claims._id });

    const itemIndex = userWishlist.items.findIndex(
      (el) => el.productId === req.body.item.productId
    );

    itemIndex === -1
      ? userWishlist.items.push(req.body.item)
      : userWishlist.items.splice(itemIndex, 1);

    const updatedWishlist = await userWishlist.save();
    const data = await updatedWishlist.toJSON();

    res.status(200).json(data.items);
  } catch (error) {
    return res.status(500).json({ message: "something went wrong", error });
  }
};
