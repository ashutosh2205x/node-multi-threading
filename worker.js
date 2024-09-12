const {parentPort } = require('worker_threads')

let count = 0;
//heavy computation work
for (let i = 0; i < 5000000000; i++) {
  count++;
}

parentPort.postMessage(count)