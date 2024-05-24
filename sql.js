const express = require("express");
const { Pool } = require("pg");

const route = express.Router();

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

route.post("/users", async (req, res) => {
  const { name, email } = req.body;
  try {
    const qurey = await pool.query(
      "INSERT INTO users(name, email) VALUES($1,$2) RETURNING *",
      [name, email]
    );
    res.send(qurey.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

route.get("/users", async (req, res) => {
  try {
    const qurey = await pool.query("SELECT * FROM users");
    res.send(qurey.rows);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = route;
