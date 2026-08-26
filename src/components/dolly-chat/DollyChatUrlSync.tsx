"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useDollyChat } from "./DollyChatProvider";

export function DollyChatUrlSync() {
  const searchParams = useSearchParams();
  const { hydrateFromShare } = useDollyChat();

  useEffect(() => {
    const momentId = searchParams.get("dolly");
    if (!momentId) return;
    hydrateFromShare({
      momentId,
      query: searchParams.get("q"),
      era: searchParams.get("era"),
    });
  }, [searchParams, hydrateFromShare]);

  return null;
}
