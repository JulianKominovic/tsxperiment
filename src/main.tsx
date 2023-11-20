import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "@radix-ui/themes/styles.css";
import { HttpVerb } from "@tauri-apps/api/http";
import { Theme } from "@radix-ui/themes";

(window as any).fetch = async (
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<Response> => {
  const { fetch } = await import("@tauri-apps/api/http");

  const res = await fetch(input.toString(), {
    ...init,
    method: (init?.method as HttpVerb) || "GET",
    body: init?.body
      ? {
          type: "Text",
          payload: init.body,
        }
      : undefined,
  });

  return new Response(JSON.stringify(res.data) as BodyInit, res);
};
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Theme
    appearance="light"
    accentColor="purple"
    grayColor="auto"
    radius="large"
  >
    <App />
  </Theme>
);
