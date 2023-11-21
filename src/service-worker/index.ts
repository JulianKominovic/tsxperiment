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
let compileAstTimeoutId: number;

// RUNTIME GUARD INFINITE LOOP INIT
var window = {
  koduj: {},
};
// runtime code
const loops = {};
// loop guard code inspired by Codepen
var koduj = {
  _get_time() {
    return +new Date();
  },
  _config: {
    loop_threshold: 500,
    loop_timeout: 200,
  },
  should_break_loop(id) {
    if (!loops[id]) {
      loops[id] = {
        start: this._get_time(),
        count: 1,
      };
      return false;
    } else {
      const now = this._get_time();
      const { start } = loops[id];
      const count = ++loops[id].count;
      if (count > this._config.loop_threshold) {
        const stop = now - start > this._config.loop_timeout;
        if (stop) {
          sendWorkerMessage({ type: "patch-ast-infinite-loop-res" });
        }
        return stop;
      }
      return false;
    }
  },
  exit_loop(id) {
    delete loops[id];
  },
};

// transform code
let loop_count = 0;
function with_loop_guard() {
  var guard_var = make_identifier("loop_guard");
  var cond = {
    type: "UnaryExpression",
    operator: "!",
    argument: {
      type: "UpdateExpression",
      operator: "--",
      argument: guard_var,
      prefix: true,
    },
    prefix: true,
  };
  return function (body) {
    let result;
    if (body.type === "BlockStatement") {
      result = body.body;
    } else {
      result = [body];
    }
    result = [
      make_if(koduj_call("should_break_loop", literal(++loop_count)), [
        jump("break"),
      ]),
      ...result,
    ];
    return make_block(result);
  };
}
function jump(name) {
  const mapping = {
    break: "BreakStatement",
    continue: "ContinueStatement",
  };
  return {
    type: mapping[name],
    label: null,
  };
}
function make_block(body) {
  return {
    type: "BlockStatement",
    body: body,
  };
}
function literal(value) {
  return { type: "Literal", value };
}
function make_if(test, body, alternative) {
  return {
    type: "IfStatement",
    test: test,
    consequent: make_block(body),
    alternate: alternative,
  };
}
function make_identifier(name) {
  return {
    type: "Identifier",
    name: name,
  };
}
function expression_statement(expression) {
  return {
    type: "ExpressionStatement",
    expression: expression,
  };
}
function koduj_prop(method) {
  return property2(make_identifier("koduj"), make_identifier(method), false);
}
function koduj_call(method, ...args) {
  return call(koduj_prop(method), ...args);
}
function property2(object, property, computed) {
  return {
    type: "MemberExpression",
    computed,
    object,
    property,
  };
}
function call(callee, ...args) {
  return {
    type: "CallExpression",
    callee: callee,
    arguments: args,
  };
}
// RUNTIME GUARD INFINITE LOOP END

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
    clearTimeout(compileAstTimeoutId);
    compileAstTimeoutId = setTimeout(() => {
      const initTime = Date.now();
      const code = patchAst(data);

      eval(`try{${code}}catch(err){console.registerLog(err, ${lines.length})}`);
      const diffInMilliseconds = Date.now() - initTime;
      sendWorkerMessage({
        type: "patch-ast-res",
        data: {
          code: lines.join("\n"),
          duration: diffInMilliseconds,
        },
      });
    }, 1000);
    return;
  }
});
