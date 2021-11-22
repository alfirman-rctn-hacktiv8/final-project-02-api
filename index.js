const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const user = require("./routes/user");
const cors = require("cors");
const app = express();

const PORT = process.env.PORT || 5000;

dotenv.config();

app.use(cookieParser());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());

app.use("/user", user);

mongoose.connect(
  process.env.MONGODB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  () => app.listen(PORT, () => console.log(`server is running at port ${PORT}`))
);
