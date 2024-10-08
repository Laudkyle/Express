const express = require("express");
const { connectToDB, getDb } = require("./db");
const { ObjectId } = require("mongodb");
let db;

// init  app
const app = express();
app.use(express.json());
// db connection
connectToDB((err) => {
  if (!err) {
    app.listen(3000, () => {
      console.log("App is connected on port 3000");
    });
  }
  db = getDb();
});

app.get("/students", (req, res) => {
  students = [];
  const page = req.query.p || 0;
  const studentsPerPage = 12

  db.collection("students")
    .find()
    .sort({ firstName: 1 })
    .skip(page * studentsPerPage)
    .limit(studentsPerPage)
    .forEach((student) => students.push(student))
    .then(() => {
      res.status(200).json({ students });
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
});

app.get("/students/:id", (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    db.collection("students")
      .findOne((_id = new ObjectId(req.params.id)))
      .then((student) => {
        res.status(200).json({ student });
      })
      .catch((error) => {
        res.status(500).json({ error: error });
      });
  } else {
    res.status(500).json({ error: "Id is not valid" });
  }
});

app.post("/students", (req, res) => {
  const data = req.body;
  db.collection("students")
    .insertOne(data)
    .then((result) => {
      res.status(201).json({ result });
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
});

app.delete("/students/:id", (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    db.collection("students")
      .deleteOne({ _id: new ObjectId(req.params.id) })
      .then((result) => {
        res.status(200).json({ result });
      })
      .catch((error) => {
        res.status(501).json({ error: error });
      });
  } else {
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.patch("/students/:id", (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    const updates = req.body
    db.collection("students")
      .updateOne({ _id: new ObjectId(req.params.id) },{$set :updates})
      .then((result) => {
        res.status(200).json({ result });
      })
      .catch((error) => {
        res.status(501).json({ error: error });
      });
  } else {
    res.status(500).json({ error: "Something went wrong" });
  }
});
