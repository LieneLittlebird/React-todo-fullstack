const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const MONGO_DB_PORT = 27017;
const MONGO_DB_API = `mongodb://localhost:${MONGO_DB_PORT}`;

const app = express();

app.use(express.json());
app.use(cors());

app.get("/tasks", (req, res) => {
  res.send("Connection successful!");
});

app.post("tasks", async (req, res) => {
  const client = await MongoClient.connect(MONGO_DB_API, {
    useUnifiedTopology: true,
  });
  const db = client.db("tasks");
  const postsCollection = db.collection("tasks_saved");
  await postsCollection.insertOne(req.body);

  client.close();

  res.send("Post added successfully");
});

const port = 8080;
app.listen(port);
