import { MessageStruct } from "./types";

// Delete all registered workers
await navigator.serviceWorker.getRegistrations().then((registrations) => {
  for (const registration of registrations) {
    registration.unregister();
  }
});

const worker = new Worker(new URL("./index.ts", import.meta.url), {
  type: "module",
});

function sendWorkerMessage({ type, data }: MessageStruct) {
  return worker.postMessage({ type, data });
}

export { worker, sendWorkerMessage };
