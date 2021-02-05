/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const MONGO_DB_PORT = 27017;
const MONGO_DB_API = `mongodb://localhost:${MONGO_DB_PORT}`;

const app = express();

app.use(express.json());
app.use(cors());

app.post("/tasks", async (req, res) => {
  // eslint-disable-next-line no-use-before-define
  const client = await MongoClient.connect(MONGO_DB_API, {
    useUnifiedTopology: true,
  });
  const db = client.db("tasks");
  const postsCollection = db.collection("tasks_saved");
  await postsCollection.insertOne(req.body);

  client.close();

  // eslint-disable-next-line no-underscore-dangle
  // const id = mongoDBResult.ops[0]._id;

  res.send(JSON.stringify("Task added"));
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

app.delete("/tasks/:id", async (req, res) => {
  const { id } = req.params.id;
  const client = await MongoClient.connect(MONGO_DB_API, {
    useUnifiedTopology: true,
  });
  const db = client.db("tasks");
  const postsCollection = db.collection("tasks_saved");
  await postsCollection.deleteOne({ id });

  client.close();

  res.send(JSON.stringify("Task deleted"));
});

app.put("/tasks/:id", async (req, res) => {
  const { id } = req.params;

  const client = await MongoClient.connect(MONGO_DB_API, {
    useUnifiedTopology: true,
  });

  const db = client.db("tasks");
  const postsCollection = db.collection("tasks_saved");
  const reminder = req.params;
  await postsCollection.updateOne(
    { id },
    { $set: { reminder: !reminder } },
    { upsert: false }
  );

  client.close();

  res.send("Put successful");
});

const port = 8080;
app.listen(port);
