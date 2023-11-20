import { Button, DropdownMenu, Select } from "@radix-ui/themes";
import { monacoThemes, setTheme } from "../monaco-themes/load-theme";
import { useState } from "react";
import * as Menubar from "@radix-ui/react-menubar";

function Trigger({ children }: { children: React.ReactNode }) {
  return (
    <Menubar.Trigger asChild>
      <Button variant="soft">{children}</Button>
    </Menubar.Trigger>
  );
}

function Content({ children }: { children: React.ReactNode }) {
  return <DropdownMenu.Content align="center">{children}</DropdownMenu.Content>;
}

export default function NavbarComponent() {
  return (
    <nav className="fixed flex -translate-x-1/2 bg-white rounded-md shadow-md bottom-2 left-1/2">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Button variant="soft">Options</Button>
        </DropdownMenu.Trigger>
        <Content>
          {Object.entries(monacoThemes).map(([key, value]) => (
            <DropdownMenu.Item
              onClick={() => {
                setTheme(key as any);
              }}
              key={key}
            >
              {value}
            </DropdownMenu.Item>
          ))}
        </Content>
      </DropdownMenu.Root>
    </nav>
  );
}
