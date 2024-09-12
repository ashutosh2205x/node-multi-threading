const {workerData, parentPort } = require('worker_threads')

let count = 0;
//heavy computation work
for (let i = 0; i <5000000000 / workerData.thread_count; i++) {
  count++;
}

parentPort.postMessage(count)