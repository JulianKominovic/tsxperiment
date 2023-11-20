import escodegen from "escodegen";
import estraverse from "estraverse";

import { parse } from "acorn";
import { guard_loops } from "./infinite-loop-guard";

export function patchAst(code: string) {
  const ast = parse(code, { ecmaVersion: "latest", locations: true });
  const newAst = estraverse.replace(ast as any, {
    leave: function (node: any) {
      if (
        node.type === "CallExpression" &&
        node.callee.type === "MemberExpression" &&
        node.callee.object.type === "Identifier" &&
        node.callee.object.name === "console"
      ) {
        node.callee.property.name = "registerLog";
        node.arguments = [
          ...node.arguments,
          {
            type: "Literal",
            value: node.loc.start.line,
            // value: JSON.stringify(node.loc.start.line),
          },
        ];
        return node;
      }
    },
  });
  guard_loops(newAst);

  const parsedCode = escodegen.generate(newAst);
  return parsedCode;
}
