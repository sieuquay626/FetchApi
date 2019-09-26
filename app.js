const express = require("express");
const app = express();
const Datastore = require("nedb");
const fs = require("fs");
var path = require("path");
app.use(express.static("public"));
app.use(express.json({ limit: "1mb" }));

const database = new Datastore("database.db");
database.loadDatabase();
app.get("/", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "index.html"));
});

app.get("/poem", (req, res) => {
  console.log(path.join(__dirname + "./readpoem.html"));
  res.status(200).sendFile(path.join(__dirname + "/public/readpoem.html"));
});

app.get("/zonann", (req, res) => {
  res.status(200).sendFile(path.join(__dirname + "/public/readcsv.html"));
});

app.get("/blob", (req, res) => {
  res.status(200).sendFile(path.join(__dirname + "/public/blob.html"));
});

app.get("/arrayimage", (req, res) => {
  res.status(200).sendFile(path.join(__dirname + "/public/readfilearray.html"));
});

app.get("/js", (req, res) => {
  res.status(200).sendFile(path.join(__dirname + "/public/readjson.html"));
});

app.get("/api", (req, res) => {
  database.find({}, (err, data) => {
    if (err) {
      res.end();
      return;
    }
    //convertBase64;
    console.log(typeof data.img64);

    res.json(data);
  });
});
app.post("/api", (req, res) => {
  const data = req.body;
  const timestamp = Date.now();
  data.timestamp = timestamp;
  database.insert(data);
  res.json(data);
});
app.listen(4000, () => {
  console.log("Sever is running http://localhost:4000");
});
