const Cart = require("../models/cart");
const useAuth = require("../hooks/useAuth");

exports.getCartItems = async (req, res) => {
  const { error, claims } = useAuth(req.cookies?.jwt);

  if (error) return res.status(error.status).json({ error: error.message });

  try {
    const userCart = await Cart.findOne({ uid: claims._id });

    res.status(200).json(userCart.items);
  } catch (e) {
    return res.status(500).json({ error: "something went wrong", e });
  }
};

exports.addCartItem = async (req, res) => {
  if (!req.body.item) return res.status(400).json({ error: "bad request" });

  const { error, claims } = useAuth(req.cookies?.jwt);

  if (error) return res.status(error.status).json({ error: error.message });

  try {
    const userCart = await Cart.findOne({ uid: claims._id });

    const itemIndex = userCart.items.findIndex(
      (el) => el.productId === req.body.item.productId
    );

    itemIndex === -1
      ? userCart.items.push({ ...req.body.item, quantity: 1 })
      : userCart.items[itemIndex].quantity++;

    const addedCart = await userCart.save();

    const data = await addedCart.toJSON();

    res.status(201).json(data.items);
  } catch (e) {
    return res.status(500).json({ error: "something went wrong", e });
  }
};

exports.removeCartItem = async (req, res) => {
  if (!req.body.productId)
    return res.status(400).json({ error: "bad request" });

  const { error, claims } = useAuth(req.cookies?.jwt);

  if (error) return res.status(error.status).json({ error: error.message });

  try {
    const userCart = await Cart.findOne({ uid: claims._id });

    const targetIndex = userCart.items.findIndex(
      (item) => item.productId == req.body.productId
    );

    if (targetIndex === -1)
      return res.status(404).json({ error: "item not found" });

    userCart.items[targetIndex].quantity === 1
      ? userCart.items.splice(targetIndex, 1)
      : userCart.items[targetIndex].quantity--;

    const removedCart = await userCart.save();

    const data = await removedCart.toJSON();

    res.status(200).json(data.items);
  } catch (e) {
    return res.status(500).json({ error: "something went wrong", e });
  }
};
