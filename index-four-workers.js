const express = require("express");
const app = express();
const PORT = process.env.PORT || 8001;
const threadCounts = 4;

const { Worker } = require("worker_threads");

app.get("/non-blocking", (req, res) => {
  res.status(200).send("api 1: ok");
});

function createWorkers() {
  return new Promise((resolve, reject) => {
    const worker = new Worker("./four-workers.js", {
      workerData: { thread_count: threadCounts },
    });
    worker.on("message", (data) => {
      resolve(data);
    });
    worker.on("error", (err) => {
      reject(err);
    });
  });
}

app.get("/blocking", async (req, res) => {
  const workerPromises = [];
  for (let i = 0; i < threadCounts; i++) {
    workerPromises.push(createWorkers());
  }

  const thread_results = await Promise.all(workerPromises);
  let total = 0;

  for (let j = 0; j < threadCounts; j++) {
    console.log('i:', thread_results[j])
    total = total + thread_results[j];
  }
  res.status(200).send(`count :  ${total}`);
});

app.listen(PORT, () => console.log("server on", PORT));
