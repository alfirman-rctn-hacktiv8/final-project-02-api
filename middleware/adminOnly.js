const jwt = require("jsonwebtoken");
const User = require("../models/user");

const adminOnly = async (req, res, next) => {
  const token = req.cookies?.jwt;

  if (!token) return res.status(401).json({ error: "unauthenticated" });

  const claims = jwt.verify(token, process.env.SECRET_KEY);

  if (!claims) return res.status(401).json({ error: "unauthenticated" });

  const admin = await User.findById(claims._id);

  if (!admin) return res.status(401).json({ error: "unauthenticated" });

  if (admin._id != process.env.ADMIN_ID)
    return res.status(403).json({ error: "forbidden" });

  next();
};

module.exports = adminOnly;
