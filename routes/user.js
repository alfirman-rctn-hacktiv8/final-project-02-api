const router = require("express").Router();
const { register, login, logout } = require("../controllers/auth");
const { getUser, updateUser } = require("../controllers/user");

router.get("/", getUser);
router.post("/update", updateUser);
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

module.exports = router;
