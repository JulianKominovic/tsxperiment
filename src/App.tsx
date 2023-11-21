import { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";

import NavbarComponent from "./components/Navbar";
import { defineMonacoThemes } from "./monaco-themes/load-theme";
import { sendWorkerMessage, worker } from "./service-worker/main-thread";
import { _unused } from "./ast-utils/runtime";
import { MessageStruct } from "./service-worker/types";

function App() {
  const [lines, setLines] = useState<string>("");

  useEffect(() => {
    worker.addEventListener("message", (event) => {
      console.log("SW MESSAGE", event);
      const { type } = event.data;
      switch (type) {
        case "patch-ast-res": {
          const { code, duration } = event.data.data;
          console.log("patch-ast-response", code, duration);
          setLines(code);
          break;
        }
      }
    });
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
            sendWorkerMessage({ type: "patch-ast-req", data: code ?? "" });
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
