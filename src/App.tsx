import { useCallback, useState } from "react";
import Editor from "@monaco-editor/react";

import { patchAst } from "./ast/override-console";
import { useDebounceFunction } from "./utils/hooks";

function App() {
  const [logLines, setLogLines] = useState<string[]>([]);
  const { debounce } = useDebounceFunction(1000);

  (console as any).registerLog = useCallback((...args: any[]) => {
    const startingLine = +args.pop();

    setLogLines((prev) => {
      const lines = prev;

      lines[startingLine] = lines[startingLine]
        ? lines[startingLine] + JSON.stringify(args) + " "
        : JSON.stringify(args) + " ";
      return lines;
    });
  }, []);
  return (
    <div className="container flex h-screen">
      <Editor
        height="100%"
        defaultLanguage="javascript"
        defaultValue="// some comment"
        onChange={(code) => {
          setLogLines(["\n", "Executing code..."]);
          debounce(() => {
            setLogLines([]);
            const patchedCode = patchAst(code ?? "");
            eval(patchedCode ?? "");
          });
        }}
        options={{
          minimap: { enabled: false },
          wordWrap: "on",
        }}
      />
      <Editor
        height="100%"
        className="flex-grow"
        defaultLanguage="javascript"
        defaultValue="// some comment"
        options={{
          readOnly: true,
          minimap: { enabled: false },
          wordWrap: "on",
        }}
        value={logLines.slice(1).join("\n")}
      />
    </div>
  );
}

export default App;
