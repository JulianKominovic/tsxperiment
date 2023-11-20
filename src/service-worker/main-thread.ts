import { MessageStruct } from "./types";

const worker = new Worker(new URL("./index.ts", import.meta.url), {
  type: "module",
});

function sendWorkerMessage({ type, data }: MessageStruct) {
  return worker.postMessage({ type, data });
}

export { worker, sendWorkerMessage };
