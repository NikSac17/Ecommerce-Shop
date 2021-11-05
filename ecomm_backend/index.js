const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const port = process.env.PORT || 5000;

//mongo connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log("Database down...");
    console.log(err);
  });

app.use(express.json()); //to pass json object in req body

//routes
app.use("/api/user", require("./routes/user"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/products", require("./routes/product"));

app.listen(port, () => {
  console.log("Backend server running...");
});
