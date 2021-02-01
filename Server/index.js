const express = require("express");

const app = express();

app.get("/tasks", (req, res) => {
  res.send("Connection successful!");
});

const port = 8080;
app.listen(port);
