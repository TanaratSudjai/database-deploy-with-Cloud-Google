const express = require("express");
const mongoose = require("mongoose");

const route = express.Router();

// สร้างโมเดล User ใน Mongoose
const User = mongoose.model("User", {
  name: String,
  email: String,
});

// Route เพื่อสร้างผู้ใช้ใหม่
route.post("/users", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.send(user);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// Route เพื่อดึงข้อมูลผู้ใช้ทั้งหมด
route.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = route;
