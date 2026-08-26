"use client";

import { DollyChatProvider } from "./DollyChatProvider";
import { DollyChatDock } from "./DollyChatDock";

export function DollyChatRoot({ children }: { children: React.ReactNode }) {
  return (
    <DollyChatProvider>
      {children}
      <DollyChatDock />
    </DollyChatProvider>
  );
}
