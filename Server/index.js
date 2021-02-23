/* eslint-disable no-use-before-define */
/* eslint-disable prettier/prettier */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
const express = require("express");
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");
const { useDebugValue } = require("react");

const MONGO_DB_PORT = 27017;
const MONGO_DB_API = `mongodb://localhost:${MONGO_DB_PORT}`;

const app = express();

// const wr = async () => {
//   // hgfhgf
//   const client = await MongoClient.connect(MONGO_DB_API, {
//     useUnifiedTopology: true,
//   });

//   const db = client.db("tasks");
//   const postsCollection = db.collection("tasks_saved");

//   // const { id } = req.params.id;

//   // const reminder = req.params.value;

//   const id = "6034ce473a72f60384624034";
//   const reminder = true;

//   const update = {
//     $set: { reminder: reminder },
//   };

//   const options = { upsert: false };
//   const res = await postsCollection.updateOne(
//     { _id: ObjectId(id) },
//     update,
//     options
//   );
//   console.log(res);
//   client.close();
// };

// wr();

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

  /* .findAndModify ({
  sort: id,
  remove: true,
  update: {id},
  new: yes,
  upsert: false,

})*/

  client.close();

  res.send("Updated successfully");
});

const port = 8080;
app.listen(port);
