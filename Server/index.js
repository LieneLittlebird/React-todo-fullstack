const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const MONGO_DB_PORT = 27017;
const MONGO_DB_API = `mongodb://localhost:${MONGO_DB_PORT}`;

const app = express();

app.use(express.json());
app.use(cors());

app.post("/tasks", async (req, res) => {
  const client = await MongoClient.connect(MONGO_DB_API, {
    useUnifiedTopology: true,
  });
  const db = client.db("tasks");
  const postsCollection = db.collection("tasks_saved");
  const mongoDBResult = await postsCollection.insertOne(req.body);

  client.close();

  // eslint-disable-next-line no-underscore-dangle
  const id = mongoDBResult.ops[0]._id;

  res.send("Task added", id);
});

app.get("/tasks", async (req, res) => {
  const client = await MongoClient.connect(MONGO_DB_API, {
    useUnifiedTopology: true,
  });
  const db = client.db("tasks");
  const postsCollection = db.collection("tasks_saved");
  postsCollection.find({}).toArray((err, docs) => {
    client.close();
    res.send(docs);
  });
});

app.delete("/tasks/:id", async (req, res, id) => {
  const client = await MongoClient.connect(MONGO_DB_API, {
    useUnifiedTopology: true,
  });
  const db = client.db("tasks");
  const postsCollection = db.collection("tasks_saved");
  await postsCollection.deleteOne({ id });

  client.close();

  res.send(req.body);
});

app.put("/tasks/:id", async (req, res, id) => {
  const client = await MongoClient.connect(MONGO_DB_API, {
    useUnifiedTopology: true,
  });
  const db = client.db("tasks");
  const postsCollection = db.collection("tasks_saved");
  await postsCollection.updateOne({ id });

  client.close();

  res.send();
});

const port = 8080;
app.listen(port);
