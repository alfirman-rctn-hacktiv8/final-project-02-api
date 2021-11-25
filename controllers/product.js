const Product = require("../models/product");

exports.addProduct = async (req, res) => {
  const { name, price, category, description, image } = req.body;

  if (!name || !price || !category)
    return res.status(400).json({ message: "bad request" });

  const newProduct = new Product({
    name,
    price,
    category,
    image: image || "",
    description: description || "",
    rating: { rate: 0, count: 0 },
    stock: 0,
  });

  try {
    const result = await newProduct.save();

    res.status(201).json(result);
  } catch (error) {
    return res.status(500).json({ message: "something went wrong", error });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const result = await Product.find();

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "something went wrong", error });
  }
};

exports.getProduct = async (req, res) => {
  const { productId } = req.params;

  try {
    const product = await Product.findById(productId);

    if (!product) return res.status(404).json({ message: "product not found" });

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "something went wrong", error });
  }
};

exports.updateProduct = async (req, res) => {
  const { productId } = req.params;

  const { name, price, category, description, image, stock } = req.body;

  try {
    const product = await Product.findById(productId);

    if (!product) return res.status(404).json({ message: "product not found" });

    product.name = name;
    product.price = price;
    product.category = category;
    product.description = description;
    product.image = image;
    product.stock = stock;

    const result = await product.save();

    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: "something went wrong", error });
  }
};

exports.deleteProduct = async (req, res) => {
  const { productId } = req.params;

  try {
    const product = await Product.findById(productId);

    if (!product) return res.status(404).json({ message: "product not found" });

    const deleted = await Product.findOneAndDelete(productId);

    res.status(200).json({ message: "berhasil dihapus", data: deleted });
  } catch (e) {
    return res.status(500).json({ message: "something went wrong", error });
  }
};
