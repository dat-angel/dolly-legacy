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
        "inline-flex min-h-11 items-center rounded-sm bg-gold px-3 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-burgundy-deep transition hover:bg-gold-light sm:px-4",
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
