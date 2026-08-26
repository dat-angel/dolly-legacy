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
        "inline-flex min-h-11 items-center rounded-sm bg-gold px-3 text-sm font-semibold text-burgundy-deep transition hover:bg-gold-light",
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
