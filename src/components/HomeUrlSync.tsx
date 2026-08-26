"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export function HomeUrlSync() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const chapter = searchParams.get("chapter");
    const momentId = searchParams.get("moment");
    const era = searchParams.get("era");
    const hash = window.location.hash.replace("#", "");

    const shouldOpenLife =
      Boolean(chapter || momentId || era) && hash !== "what-would-dolly-say";

    if (shouldOpenLife || hash === "life") {
      window.setTimeout(() => {
        document.getElementById("life")?.scrollIntoView({ behavior: "smooth" });
      }, 120);
      return;
    }

    if (hash === "what-would-dolly-say") {
      window.setTimeout(() => {
        document.getElementById("what-would-dolly-say")?.scrollIntoView({
          behavior: "smooth",
        });
      }, 120);
    }
  }, [searchParams]);

  return null;
}
