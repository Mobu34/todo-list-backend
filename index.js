const express = require("express");
const formidable = require("express-formidable");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(formidable());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const taskRoutes = require("./routes/task");
app.use(taskRoutes);

app.all("*", (req, res) => {
  res.status(404).json("Page Not Found");
});

app.listen(process.env.PORT, () => {
  console.log("Server has started ...");
});
