const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;
const { Worker } = require("worker_threads");

app.get("/non-blocking", (req, res) => {
  res.status(200).send("api 1: ok");
});

app.get("/blocking", async (req, res) => {
  let worker = new Worker("./worker.js");
  worker.on("message", (data) => {
    res.status(200).send(`count :  ${data}`);
  });
  worker.on("error", (err) => {
    res.status(400).send(`error : ${err}`);
  });
});

app.listen(PORT, () => console.log("server on", PORT));
