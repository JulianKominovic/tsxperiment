import escodegen from "escodegen";
import estraverse from "estraverse";

import { parse } from "acorn";
import { recursive } from "acorn-walk";

function log(arg) {
  console.log(JSON.stringify(arg, null, 2));
}

const ast = parse(
  `  
  (function abc(){
    return 1
  })()
  const example={
    name:"example",
    age:12,
    address:{
      street:"example",
      city:"example",
      country:"example"
    }
  }
  const {name,age,address:{street,city,country}}=example;
  Object.entries(example).forEach(([key,value])=>{
    console.log(key,value)
  })
  const a = 123;
  
  a+12
  a
  
  
  
`,
  { ecmaVersion: "latest", ranges: true, locations: true }
);
// log(ast);
// recursive(
//   ast,
//   {},
//   {
//     CallExpression(node, state, c) {
//       log(node, state, c);
//     },
//   }
// );
log(ast);
console.log("----------------------------------------\n");
const result = estraverse.replace(ast, {
  enter: function (node, parent) {
    if (parent.type === "Program" && node.type === "ExpressionStatement") {
      return {
        type: "CallExpression",
        start: node.start,
        end: node.end,
        callee: {
          type: "Identifier",
          name: "logger",
        },
        arguments: [
          {
            ...node,
            value: node.value?.endsWith(";")
              ? node.value.slice(0, -1)
              : node.value,
          },
          {
            type: "Literal",
            value: JSON.stringify(node.loc),
          },
        ],
      };
    }
  },
  leave: function (node, parent) {
    if (node.callee?.name === "logger") {
      return node;
    }

    // Replace it with replaced.

    if (
      (node.type === "CallExpression" || node.type === "NewExpression") &&
      node.callee.name !== "logger" &&
      !node.transformed
    ) {
      return {
        type: "CallExpression",
        callee: {
          type: "Identifier",
          name: "logger",
        },
        loc: {
          start: {
            line: node.loc.start.line,
            column: node.loc.start.column,
          },
          end: {
            line: node.loc.end.line,
            column: node.loc.end.column,
          },
        },
        arguments: [
          {
            ...node,
            loc: {
              ...node.loc,
              start: { ...node.loc.start },
              end: { ...node.loc.end, line: node.loc.end.line + 1000 },
            },
          },
          {
            type: "Literal",
            value: JSON.stringify(node.loc),
          },
        ],
      };
    }
  },
});
log(result);
console.log("\n");
console.log("__________________________________________________");
console.log("\n");
console.log(
  escodegen.generate(result, {
    format: { semicolons: false, parentheses: false },
  })
);
