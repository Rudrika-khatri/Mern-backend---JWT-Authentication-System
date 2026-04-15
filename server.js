const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Running");
});

app.listen(5000, () => console.log("Server started"));

const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/mern_practical")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.use("/api/auth", require("./routes/authRoutes"));

app.use("/api/products", require("./routes/productRoutes"));
app.use("/uploads", express.static("uploads"));

app.post("/api/payment", (req, res) => {
  const { amount } = req.body;

  if (amount > 0) {
    res.json({ status: "success", message: "Payment successful" });
  } else {
    res.status(400).json({ status: "failed", message: "Invalid amount" });
  }
});