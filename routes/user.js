const router = require("express").Router();
const { getUser, register, login, logout } = require("../controllers/auth");

router.get("/get-user", getUser);
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

module.exports = router;
