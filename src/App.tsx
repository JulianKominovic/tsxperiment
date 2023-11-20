import { useCallback, useState } from "react";
import Editor from "@monaco-editor/react";

import { patchAst } from "./ast/override-console";
import { useDebounceFunction } from "./utils/hooks";
import NavbarComponent from "./components/Navbar";
import { defineMonacoThemes } from "./monaco-themes/load-theme";

function App() {
  const [logLines, setLogLines] = useState<string[]>([]);
  const { debounce } = useDebounceFunction(1000);

  (console as any).registerLog = useCallback((...args: any[]) => {
    const startingLine = +args.pop();
    setLogLines((prev) => {
      const lines = [...prev];
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
      return lines;
    });
  }, []);
  const code = logLines.slice(1).join("\n");
  return (
    <div className="h-screen overflow-y-hidden">
      <div className="flex h-full">
        <Editor
          height="100%"
          defaultLanguage="javascript"
          defaultValue="// some comment"
          beforeMount={() => {
            console.log("RUN");
            defineMonacoThemes();
          }}
          onChange={(code) => {
            setLogLines(["\n", "Executing code..."]);
            debounce(() => {
              setLogLines([]);
              const patchedCode = patchAst(code ?? "");
              eval(
                `try{${patchedCode}}catch(err){console.registerLog(err, ${logLines.length})}`
              );
            });
          }}
          options={{
            formatOnPaste: true,
            lineHeight: 1.5,
            fontSize: 16,
            minimap: { enabled: false },
            wordWrap: "on",
            fontWeight: "500",
            bracketPairColorization: { enabled: true },
            fontLigatures: true,
            fontFamily: "JetBrains Mono",
          }}
        />
        <Editor
          height="100%"
          className="flex-grow"
          defaultValue="// some comment"
          defaultLanguage="javascript"
          options={{
            lineHeight: 1.5,
            fontWeight: "500",
            fontSize: 16,
            readOnly: true,
            minimap: { enabled: false },
            wordWrap: "on",
            maxTokenizationLineLength: 50000,
          }}
          value={code}
        />
      </div>
      <NavbarComponent />
    </div>
  );
}

export default App;
