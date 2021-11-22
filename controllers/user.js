const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.getUser = async (req, res) => {
  try {
    if (!req.cookies["jwt"])
      return res.status(401).json({ message: "unauthenticated" });

    const cookie = req.cookies["jwt"];

    const claims = jwt.verify(cookie, process.env.SECRET_KEY);

    if (!claims) return res.status(401).json({ message: "unauthenticated" });

    const user = await User.findOne({ _id: claims._id });

    const { password, ...data } = await user.toJSON();

    res.status(200).json(data);
  } catch (e) {
    return res.status(500).json({ message: "something went wrong", error });
  }
};

exports.updateUser = async (req, res) => {
  const { name, address, number } = req.body;
  if (!name || !address || !number)
    return res.status(400).json({ message: "bad request" });

  if (!address.district || !address.city || !address.province)
    return res.status(400).json({ message: "bad request" });

  try {
    if (!req.cookies["jwt"])
      return res.status(401).json({ message: "unauthenticated" });

    const cookie = req.cookies["jwt"];

    const claims = jwt.verify(cookie, process.env.SECRET_KEY);

    if (!claims) return res.status(401).json({ message: "unauthenticated" });

    const user = await User.findOne({ _id: claims._id });

    user.name = name;
    user.number = number;
    user.address = address;

    const updatedUser = await user.save();

    const { password, ...data } = await updatedUser.toJSON();

    res.status(200).json(data);
  } catch (e) {
    return res.status(500).json({ message: "something went wrong", error });
  }
};
