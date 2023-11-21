import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
// core styles are required for all packages
import "@mantine/core/styles.css";
import "@mantine/spotlight/styles.css";
import "@mantine/notifications/styles.css";
import { HttpVerb } from "@tauri-apps/api/http";
import { MantineProvider, createTheme } from "@mantine/core";
import { Notifications } from "@mantine/notifications";

const theme = createTheme({
  primaryColor: "gray",
  defaultRadius: "md",
});

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
  <MantineProvider theme={theme}>
    <Notifications position="bottom-left" />
    <App />
  </MantineProvider>
);
