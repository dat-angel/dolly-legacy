"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { getMomentById } from "@/lib/moments";
import type { Chapter } from "@/lib/types";
import { CHAPTERS } from "@/lib/types";

export function HomeUrlSync() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const chapter = searchParams.get("chapter") as Chapter | null;
    const momentId = searchParams.get("moment");
    const hash = window.location.hash.replace("#", "");

    if (chapter && CHAPTERS.some((c) => c.id === chapter)) {
      window.setTimeout(() => {
        document.getElementById(chapter)?.scrollIntoView({ behavior: "smooth" });
      }, 120);
    } else if (momentId) {
      const moment = getMomentById(momentId);
      const target = moment?.chapter ?? hash;
      if (target) {
        window.setTimeout(() => {
          document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });
        }, 120);
      }
    } else if (hash === "what-would-dolly-say") {
      window.setTimeout(() => {
        document.getElementById("what-would-dolly-say")?.scrollIntoView({ behavior: "smooth" });
      }, 120);
    }
  }, [searchParams]);

  return null;
}
