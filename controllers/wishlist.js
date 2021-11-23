const Wishlist = require("../models/wishlist");
const useAuth = require("../lib/useAuth");

exports.getWishlistItems = async (req, res) => {
  try {
    const { error, claims } = useAuth(req.cookies?.jwt);

    if (error) return res.status(error.status).json({ message: error.message });

    const userWishlist = await Wishlist.findOne({ uid: claims._id });

    res.status(200).json(userWishlist.items);
  } catch (error) {
    return res.status(500).json({ message: "something went wrong", error });
  }
};

exports.addWishlistItem = async (req, res) => {
  if (!req.body?.item) return res.status(400).json({ message: "bad request" });

  try {
    const { error, claims } = useAuth(req.cookies?.jwt);

    if (error) return res.status(error.status).json({ message: error.message });

    const userWishlist = await Wishlist.findOne({ uid: claims._id });

    userWishlist.items.push(req.body.item);

    const addedWishlist = await userWishlist.save();

    const data = await addedWishlist.toJSON();

    res.status(200).json(data.items);
  } catch (error) {
    return res.status(500).json({ message: "something went wrong", error });
  }
};

exports.removeWishlistItem = async (req, res) => {
  if (!req.body?.item) return res.status(400).json({ message: "bad request" });

  try {
    const { error, claims } = useAuth(req.cookies?.jwt);

    if (error) return res.status(error.status).json({ message: error.message });

    const userWishlist = await Wishlist.findOne({ uid: claims._id });

    const targetIndex = userWishlist.items.findIndex(
      (item) => item === req.body.item
    );

    if (targetIndex === -1)
      return res.status(404).json({ message: "item not found" });

    userWishlist.items.splice(targetIndex, 1);

    const removedWishlist = await userWishlist.save();

    const data = await removedWishlist.toJSON();

    res.status(200).json(data.items);
  } catch (error) {
    return res.status(500).json({ message: "something went wrong", error });
  }
};
