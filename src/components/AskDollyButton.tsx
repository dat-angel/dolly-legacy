"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDollyChat } from "./dolly-chat/DollyChatProvider";
import { cn } from "@/lib/utils";

export function AskDollyButton({ className }: { className?: string }) {
  const pathname = usePathname();
  const { openDock } = useDollyChat();

  return (
    <Link
      href="/#what-would-dolly-say"
      className={cn(
        "inline-flex min-h-11 items-center rounded-sm bg-walnut px-3 text-sm font-semibold text-cream transition hover:bg-walnut/80",
        className,
      )}
      onClick={(event) => {
        if (pathname === "/") return;
        event.preventDefault();
        openDock();
      }}
    >
      Ask Dolly
    </Link>
  );
}
