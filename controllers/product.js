const Product = require("../models/product");

exports.addProduct = async (req, res) => {
  const { name, price, category, description, image } = req.body;

  if (!name || !price || !category)
    res.status(400).json({ message: "bad request" });

  const newProduct = new Product({
    name,
    price,
    category,
    image: image || "",
    description: description || "",
    rating: { rate: 0, count: 0 },
  });
  try {
    const result = await newProduct.save();

    res.status(201).json(result);
  } catch (error) {
    return res.status(500).json({ message: "something went wrong", error });
  }
};

// exports.updateUser = async (req, res) => {
//   const { name, address, number } = req.body;
//   if (!name || !address || !number)
//     return res.status(400).json({ message: "bad request" });

//   if (!address.district || !address.city || !address.province)
//     return res.status(400).json({ message: "bad request" });

//   try {
//     const { error, claims } = useAuth(req.cookies?.jwt);

//     if (error) return res.status(error.status).json({ message: error.message });

//     const user = await User.findOne({ _id: claims._id });

//     user.name = name;
//     user.number = number;
//     user.address = address;

//     const updatedUser = await user.save();

//     const { password, ...data } = await updatedUser.toJSON();

//     res.status(200).json(data);
//   } catch (e) {
//     return res.status(500).json({ message: "something went wrong", error });
//   }
// };
