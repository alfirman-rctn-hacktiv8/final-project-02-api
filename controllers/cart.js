const Cart = require("../models/cart");
const useAuth = require("../lib/useAuth");

exports.getCartItems = async (req, res) => {
  try {
    const { error, claims } = useAuth(req.cookies?.jwt);

    if (error) return res.status(error.status).json({ message: error.message });

    const userCart = await Cart.findOne({ uid: claims._id });

    res.status(200).json(userCart.items);
  } catch (error) {
    return res.status(500).json({ message: "something went wrong", error });
  }
};

exports.addCartItem = async (req, res) => {
  if (!req.body?.item) return res.status(400).json({ message: "bad request" });

  try {
    const { error, claims } = useAuth(req.cookies?.jwt);

    if (error) return res.status(error.status).json({ message: error.message });

    const userCart = await Cart.findOne({ uid: claims._id });

    userCart.items.push(req.body.item);

    const addedCart = await userCart.save();

    const data = await addedCart.toJSON();

    res.status(200).json(data.items);
  } catch (error) {
    return res.status(500).json({ message: "something went wrong", error });
  }
};

exports.removeCartItem = async (req, res) => {
  if (!req.body?.item) return res.status(400).json({ message: "bad request" });

  try {
    const { error, claims } = useAuth(req.cookies?.jwt);

    if (error) return res.status(error.status).json({ message: error.message });

    const userCart = await Cart.findOne({ uid: claims._id });

    const targetIndex = userCart.items.findIndex(
      (item) => item === req.body.item
    );

    if (targetIndex === -1)
      return res.status(404).json({ message: "item not found" });

    userCart.items.splice(targetIndex, 1);

    const removedCart = await userCart.save();

    const data = await removedCart.toJSON();

    res.status(200).json(data.items);
  } catch (error) {
    return res.status(500).json({ message: "something went wrong", error });
  }
};
