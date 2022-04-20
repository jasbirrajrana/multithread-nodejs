import { Worker } from "worker_threads";
import logUpdate from "log-update";
const limit = 1000000;
const threads = 10;
import path from "path";
const namesPerThread = limit / threads;
const outputFile = `${path.resolve()}/output.txt`;
console.log(outputFile, "xxx");
function handleMessage(_, index) {
  names[index]++;
  logUpdate(names.map((status, i) => `Thread ${i}:${status}`).join("\n"));
}

let names = [...Array(threads)].fill(0);

for (let i = 0; i < threads; i++) {
  const port = new Worker("./worker.js", {
    workerData: { namesPerThread, outputFile },
  });

  port.on("message", (data) => handleMessage(data, i));
  port.on("error", (e) => console.log(e));
  port.on("exit", (code) => console.log(`Exit code:${code}`));
}
