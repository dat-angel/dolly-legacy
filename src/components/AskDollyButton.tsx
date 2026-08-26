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
        "inline-flex min-h-11 items-center rounded-full bg-gradient-to-r from-hot-pink/10 to-gold/10 px-3 text-burgundy transition hover:from-hot-pink/20 hover:to-gold/20 sm:px-4",
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
