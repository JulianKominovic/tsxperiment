import { monacoThemes, setTheme } from "../monaco-themes/load-theme";
import { VscSymbolEvent } from "react-icons/vsc";
import { FaRegHandPointer } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { worker } from "../service-worker/main-thread";
import { MessageStruct } from "../service-worker/types";
import { Badge, SegmentedControl, Button, rem, Text } from "@mantine/core";

import {
  Spotlight,
  SpotlightActionData,
  SpotlightActionGroupData,
  spotlight,
} from "@mantine/spotlight";
import { notifications } from "@mantine/notifications";
export default function NavbarComponent() {
  const [settings, _setSettings] = useState<{
    theme: string;
    runMode: "AUTO_RUN" | "MANUAL_RUN";
    duration: number;
    showCompilationDetails: boolean;
  }>({
    runMode: "AUTO_RUN",
    theme: "vs-dark",
    duration: 0,
    showCompilationDetails: false,
  });
  function setSettings(newValue: Partial<typeof settings>) {
    _setSettings((prev) => ({ ...prev, ...newValue }));
  }
  useEffect(() => {
    worker.addEventListener("message", (event: MessageEvent<MessageStruct>) => {
      const { type } = event.data;

      if (type === "patch-ast-res") {
        const { duration } = event.data.data;
        setSettings({ duration });
      }
      if (type === "patch-ast-infinite-loop-res") {
        notifications.show({
          color: "red",
          title: "Infinite loop detected",
          message:
            "Your code is stuck in an infinite loop, please check your code or increase the timeout in the settings",
        });
      }
    });
  }, []);

  const actions: (SpotlightActionGroupData | SpotlightActionData)[] = [
    {
      group: "Run mode",
      id: "run-mode",
      actions: [
        {
          id: "run-mode",
          description: "Select run mode",
          onClick: () => {
            setSettings({
              runMode:
                settings.runMode === "AUTO_RUN" ? "MANUAL_RUN" : "AUTO_RUN",
            });
          },
          children: (
            <div className="flex items-center justify-between w-full">
              <Text>Select run mode</Text>

              <SegmentedControl
                value={settings.runMode}
                onChange={(runMode: any) => setSettings({ runMode })}
                data={[
                  { label: "Auto run", value: "AUTO_RUN" },
                  { label: "Manual run", value: "MANUAL_RUN" },
                ]}
              />
            </div>
          ),
        },
      ],
    },

    {
      group: "Themes",
      actions: Object.entries(monacoThemes).map(([key, value]) => ({
        id: key,
        label: value,
        description: "Use " + value + " theme",
        closeSpotlightOnTrigger: true,
        onClick: () => {
          setSettings({ theme: key });
          setTheme(key as any);
        },
      })),
    },
  ];

  return (
    <nav className="fixed flex items-end gap-4 bottom-2 right-2">
      {!settings.showCompilationDetails && (
        <div className="flex gap-2">
          <Badge color={settings.duration > 500 ? "red" : "green"}>
            {settings.duration} ms
          </Badge>
        </div>
      )}
      <Button onClick={spotlight.open}>Open spotlight</Button>
      <Spotlight
        closeOnActionTrigger={false}
        scrollable
        maxHeight={600}
        actions={actions}
        nothingFound="Nothing found..."
        highlightQuery
        searchProps={{
          placeholder: "Search...",
        }}
      />
    </nav>
  );
}
