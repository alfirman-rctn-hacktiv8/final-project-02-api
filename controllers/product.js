const Product = require("../models/product");
const Cart = require("../models/cart");

exports.addProduct = async (req, res) => {
  const { name, price, category, stock, description, image, sold } = req.body;

  if (!name || !price || !category || !stock)
    return res.status(400).json({ error: "bad request" });

  const newProduct = new Product({
    name,
    price,
    stock,
    category,
    sold,
    image: image || "",
    description: description || "",
    rating: { rate: 0, count: 0 },
  });

  try {
    const result = await newProduct.save();

    res.status(201).json(result);
  } catch (e) {
    return res.status(500).json({ error: "something went wrong", e });
  }
};

exports.getProducts = async (req, res) => {
  const filter = {};

  req.query.category && Object.assign(filter, { category: req.query.category });

  try {
    const result = await Product.find({ ...filter });

    res.status(200).json(result);
  } catch (e) {
    res.status(500).json({ error: "something went wrong", e });
  }
};

exports.getProduct = async (req, res) => {
  const { productId } = req.params;

  try {
    const product = await Product.findById(productId);

    if (!product) return res.status(404).json({ error: "product not found" });

    res.status(200).json(product);
  } catch (e) {
    res.status(500).json({ error: "something went wrong", e });
  }
};

exports.updateProduct = async (req, res) => {
  const { productId } = req.params;

  const { name, price, category, description, image, stock, sold } = req.body;

  try {
    const product = await Product.findById(productId);

    if (!product) return res.status(404).json({ error: "product not found" });

    product.name = name;
    product.price = price;
    product.category = category;
    product.description = description;
    product.image = image;
    product.stock = stock;
    product.sold = sold;

    const result = await product.save();

    const userCarts = await Cart.find();

    const targetId = [];

    userCarts.forEach((el) => {
      let found = el.items.find((e) => e.productId == result._id);
      if (found) targetId.push(el._id);
    });

    const targetCarts = await Promise.all(
      targetId.map((id) => Cart.findById(id))
    );

    targetCarts.forEach((el, idx) => {
      el.items.forEach((e, i) => {
        if (result._id == e.productId) {
          targetCarts[idx].items[i].name = result.name;
          targetCarts[idx].items[i].price = result.price;
          targetCarts[idx].items[i].image = result.image;
          targetCarts[idx].items[i].description = result.description;
          targetCarts[idx].items[i].category = result.category;
          targetCarts[idx].items[i].sold = result.sold;
          targetCarts[idx].items[i].stock = result.stock;
        }
      });
    });

    await Promise.all(targetCarts.map((el) => el.save()));

    res.status(200).json(result);
  } catch (e) {
    return res.status(500).json({ error: "something went wrong", e });
  }
};

exports.deleteProduct = async (req, res) => {
  const { productId } = req.params;

  try {
    const product = await Product.findById(productId);

    if (!product) return res.status(404).json({ error: "product not found" });

    const deleted = await Product.findOneAndDelete(productId);

    res.status(200).json({ message: "berhasil dihapus", data: deleted });
  } catch (e) {
    return res.status(500).json({ error: "something went wrong", e });
  }
};

exports.getIncomeData = async (req, res) => {
  try {
    const data = await Product.find();
    let filtered = data.filter((el) => el.sold);
    let total = 0;

    filtered.forEach((el) => {
      el._doc.total = 0;
      el._doc.total = el.price * el.sold;
      total += el.price * el.sold;
    });

    const result = { total, items: filtered };

    res.status(200).json(result);
  } catch (e) {
    res.status(500).json({ error: "something went wrong", e });
  }
};
