const express = require("express");
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");

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
  await postsCollection.insertOne(req.body);

  client.close();

  res.send(JSON.stringify("Task added"));
});

app.get("/tasks", async (req, res) => {
  console.log("Tried to get stuff");
  const client = await MongoClient.connect(MONGO_DB_API, {
    useUnifiedTopology: true,
  });
  const db = client.db("tasks");
  // console.log(db);
  const postsCollection = db.collection("tasks_saved");
  // console.log(postsCollection);
  const queryResult = postsCollection.find();
  console.log(queryResult);

  queryResult.toArray((docs) => {
    console.log(docs);
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
  // console.log(id);
  const client = await MongoClient.connect(MONGO_DB_API, {
    useUnifiedTopology: true,
  });

  const db = client.db("tasks");
  const postsCollection = db.collection("tasks_saved");

  const id = req.body._id;
  const reminder = req.body.reminder;

  const update = {
    $set: { reminder },
  };

  const options = { upsert: false };
  await postsCollection.updateOne({ _id: ObjectId(id) }, update, options);

  client.close();

  res.send("Updated successfully");
});

const port = 8080;
app.listen(port);
