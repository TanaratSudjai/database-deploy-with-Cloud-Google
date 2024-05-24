const express = require("express");
const mongoose = require("mongoose");
const routeNosql = require("./nosql");
const routesql = require("./sql");
const app = express();

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use(express.json());
app.use("/nosql", routeNosql);
app.use("/sql", routesql);

app.listen(3000, (e) => {
  console.log(e);
});
