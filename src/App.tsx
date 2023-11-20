import { useCallback, useEffect, useState } from "react";
import Editor from "@monaco-editor/react";

import { patchAst } from "./service-worker/ast/override-console";
import { useDebounceFunction } from "./utils/hooks";
import NavbarComponent from "./components/Navbar";
import { defineMonacoThemes } from "./monaco-themes/load-theme";
import { sendWorkerMessage, worker } from "./service-worker/main-thread";
import { _unused } from "./ast-utils/runtime";
import { MessageStruct } from "./service-worker/types";

function App() {
  const { debounce } = useDebounceFunction(1000);
  const [lines, setLines] = useState<string>("");

  useEffect(() => {
    worker.onmessage = (event: MessageEvent<MessageStruct>) => {
      console.log("SW MESSAGE", event);
      const { data, type } = event.data;
      switch (type) {
        case "patch-ast-res":
          console.log("patch-ast-response", data);
          setLines(data);
          break;
      }
    };
  }, []);

  return (
    <div className="h-screen overflow-y-hidden">
      <div className="flex h-full">
        <Editor
          height="100%"
          defaultLanguage="javascript"
          defaultValue="// some comment"
          beforeMount={() => {
            console.log("Monaco beforeMount");
            defineMonacoThemes();
          }}
          onChange={(code) => {
            // setLogLines(["\n", "Executing code..."]);
            sendWorkerMessage({ type: "patch-ast-req", data: code ?? "" });
            /*
            debounce(() => {
              setLogLines([]);
              const patchedCode = patchAst(code ?? "");
              eval(
                `try{${patchedCode}}catch(err){console.registerLog(err, ${logLines.length})}`
              );
            });
            */
          }}
          options={{
            formatOnPaste: true,
            lineHeight: 1.5,
            fontSize: 16,
            minimap: { enabled: false },
            wordWrap: "on",
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
            fontSize: 16,
            readOnly: true,
            minimap: { enabled: false },
            wordWrap: "on",
            maxTokenizationLineLength: 50000,
          }}
          value={lines}
        />
      </div>
      <NavbarComponent />
    </div>
  );
}

export default App;
