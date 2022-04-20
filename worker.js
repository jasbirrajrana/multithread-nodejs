import { workerData, parentPort } from "worker_threads";
import fs from "fs-extra";
import firstNames from "./data/first-names.json";
import middleNames from "./data/middle-names.json";
import lastNames from "./data/last-names.json";
import { getRandomIndex } from "./utils/index.js";
const { namesPerThread, outputFile } = workerData;
(async () => {
  for (let i = 0; i < namesPerThread; i++) {
    const data = [firstNames, middleNames, lastNames]
      .map(getRandomIndex)
      .concat("\n")
      .join(" ");

    await fs.appendFile(outputFile, data);
    parentPort.postMessage(data);
  }
})();
