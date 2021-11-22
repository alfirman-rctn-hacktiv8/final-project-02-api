const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.register = async (req, res) => {
  if (!req.body.name || !req.body.password || !req.body.email)
    return res.status(400).json({ message: "bad request" });

  try {
    const userIsExist = await User.findOne({ email: req.body.email });

    if (userIsExist)
      return res.status(400).json({ message: "email already used" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    const result = await user.save();

    const { password, ...data } = await result.toJSON();

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

    res.cookie("jwt", token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }); // 1 day

    res.status(200).json({ message: "success" });
  } catch (error) {
    res.status(500).json({ message: "something went wrong", error });
  }
};

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

exports.logout = (req, res) => {
  res.cookie("jwt", "", { maxAge: 0 });

  res.status(200).json({ message: "success" });
};
