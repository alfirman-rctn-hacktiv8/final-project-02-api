const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Cart = require("../models/cart");
const Wishlist = require("../models/wishlist");
const validateEmail = require("../utils/validateEmail");

exports.register = async (req, res) => {
  if (!req.body.name || !req.body.password || !req.body.email)
    return res.status(400).json({ message: "bad request" });

  if (!validateEmail(req.body.email))
    return res.status(400).json({ message: "email not valid" });

  if (req.body.password.length < 6)
    return res.status(400).json({ message: "password too weak" });

  try {
    const userIsExist = await User.findOne({ email: req.body.email });

    if (userIsExist)
      return res.status(400).json({ message: "email already used" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    const result = await newUser.save();

    const { password, ...data } = await result.toJSON();

    const userCart = new Cart({ uid: result._id, items: [] }); // cart
    const userWihslist = new Wishlist({ uid: result._id, items: [] }); // wishlist

    await userCart.save();
    await userWihslist.save();

    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ message: "something went wrong", error });
  }
};

exports.login = async (req, res) => {
  if (!req.body.email || !req.body.password)
    return res.status(400).json({ message: "bad request" });

  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) return res.status(404).json({ message: "user not found" });

    if (!(await bcrypt.compare(req.body.password, user.password)))
      return res.status(400).json({ message: "invalid credentials" });

    const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY);

    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "none",
      secure: true,
    }); // 1 day

    res.status(200).json({ message: "success" });
  } catch (error) {
    res.status(500).json({ message: "something went wrong", error });
  }
};

exports.logout = (req, res) => {
  res.cookie("jwt", "", { maxAge: 0, sameSite: "none", secure: true });

  res.status(200).json({ message: "success" });
};
