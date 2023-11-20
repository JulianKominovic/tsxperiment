import { patchAst } from "./ast/override-console";
import { MessageStruct } from "./types";

// The install handler takes care of precaching the resources we always need.
self.addEventListener("install", (event) => {
  console.log("Installed sw.js");
});

// The activate handler takes care of cleaning up old caches.
self.addEventListener("activate", (event) => {
  console.log("Activated sw.js");
});

function sendWorkerMessage({ type, data }: MessageStruct) {
  return self.postMessage({ type, data });
}

let lines: string[] = [];

(console as any).registerLog = (...args: any[]) => {
  const startingLine = +args.pop();
  lines[startingLine] = lines[startingLine]
    ? args
        .map((arg) => {
          if (arg instanceof Error) {
            return lines[startingLine] + arg.message;
          }
          if (typeof arg === "object") {
            return lines[startingLine] + JSON.stringify(arg);
          }
          return lines[startingLine] + arg;
        })
        .join(" ") + "\n"
    : args
        .map((arg) => {
          if (arg instanceof Error) {
            return arg.message;
          }
          if (typeof arg === "object") {
            return JSON.stringify(arg);
          }
          return arg;
        })
        .join(" ") + "\n";
};

self.addEventListener("message", (event: MessageEvent<MessageStruct>) => {
  const { type } = event.data;
  if (type === "patch-ast-req") {
    const { data } = event.data;
    lines = [];
    const code = patchAst(data);
    eval(`try{${code}}catch(err){console.registerLog(err, ${lines.length})}`);
    return sendWorkerMessage({ type: "patch-ast-res", data: lines.join("\n") });
  }
});
