const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const user = require("./routes/user");
const cart = require("./routes/cart");
const wishlist = require("./routes/wishlist");
const product = require("./routes/product");
const income = require("./routes/income");

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();

app.use(cookieParser());
app.use(cors({ credentials: true, origin: ["http://localhost:3000","https://codepen.io"] }));
app.use(express.json());

app.use("/user", user);
app.use("/cart", cart);
app.use("/income", income);
app.use("/product", product);
app.use("/wishlist", wishlist);

mongoose.connect( process.env.MONGODB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, () => app.listen(PORT, () => console.log(`server is running at port ${PORT}`)));
