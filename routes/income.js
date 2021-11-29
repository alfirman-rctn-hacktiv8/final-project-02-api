const router = require("express").Router();
const { checkout, getIncomeData, deleteIncomeData } = require("../controllers/income");
const adminOnly = require("../middleware/adminOnly")

router.get("/", adminOnly, getIncomeData);
router.delete("/", adminOnly, deleteIncomeData);
router.post("/checkout", checkout);

module.exports = router;
