"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  getGreetingForEra,
  isEra,
  replyFromMoment,
  whatWouldDollySay,
  type ChatEra,
  type DollySayResult,
} from "@/lib/dolly-say";
import { getMomentById } from "@/lib/moments";

export type ChatMessage =
  | { id: string; role: "stage"; era: ChatEra; text: string }
  | { id: string; role: "user"; text: string }
  | { id: string; role: "dolly"; query: string; reply: DollySayResult };

interface DollyChatContextValue {
  era: ChatEra;
  messages: ChatMessage[];
  dockOpen: boolean;
  pending: boolean;
  setEra: (era: ChatEra) => void;
  ask: (text: string) => void;
  openDock: () => void;
  closeDock: () => void;
  toggleDock: () => void;
  hydrateFromShare: (options: {
    momentId: string;
    query?: string | null;
    era?: string | null;
  }) => void;
}

const DollyChatContext = createContext<DollyChatContextValue | null>(null);

const WELCOME: ChatMessage = {
  id: "welcome",
  role: "stage",
  era: "any",
  text: getGreetingForEra("any"),
};

function nextId(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}

export function DollyChatProvider({ children }: { children: ReactNode }) {
  const [era, setEraState] = useState<ChatEra>("any");
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME]);
  const [dockOpen, setDockOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const hydrated = useRef(false);
  const replyTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const eraRef = useRef<ChatEra>("any");
  const pendingRef = useRef(false);

  const setEra = useCallback((next: ChatEra) => {
    if (eraRef.current === next) return;
    eraRef.current = next;
    setEraState(next);
    setMessages((prev) => [
      ...prev,
      {
        id: nextId("stage"),
        role: "stage",
        era: next,
        text: getGreetingForEra(next),
      },
    ]);
  }, []);

  const ask = useCallback((raw: string) => {
    const text = raw.trim();
    if (!text || pendingRef.current) return;

    const askedEra = eraRef.current;
    if (replyTimer.current) clearTimeout(replyTimer.current);
    pendingRef.current = true;
    setMessages((prev) => [...prev, { id: nextId("user"), role: "user", text }]);
    setPending(true);
    replyTimer.current = setTimeout(() => {
      setMessages((prev) => {
        const excludeIds = prev
          .filter((message): message is Extract<ChatMessage, { role: "dolly" }> => message.role === "dolly")
          .map((message) => message.reply.moment.id);
        const reply = whatWouldDollySay(text, { era: askedEra, excludeIds });
        return [...prev, { id: nextId("dolly"), role: "dolly", query: text, reply }];
      });
      pendingRef.current = false;
      setPending(false);
    }, 420);
  }, []);

  useEffect(() => {
    return () => {
      if (replyTimer.current) clearTimeout(replyTimer.current);
    };
  }, []);

  const hydrateFromShare = useCallback(
    (options: { momentId: string; query?: string | null; era?: string | null }) => {
      if (hydrated.current) return;
      const moment = getMomentById(options.momentId);
      if (!moment) return;
      hydrated.current = true;

      const requested: ChatEra = isEra(options.era) ? options.era : "any";
      const query = options.query?.trim() || "What would Dolly say?";
      eraRef.current = requested;
      setEraState(requested);
      setMessages([
        {
          id: "welcome",
          role: "stage",
          era: requested,
          text: getGreetingForEra(requested),
        },
        { id: "shared-user", role: "user", text: query },
        {
          id: "shared-dolly",
          role: "dolly",
          query,
          reply: replyFromMoment(moment, requested, options.query ?? undefined, true),
        },
      ]);
    },
    [],
  );

  const openDock = useCallback(() => setDockOpen(true), []);
  const closeDock = useCallback(() => setDockOpen(false), []);
  const toggleDock = useCallback(() => setDockOpen((open) => !open), []);

  const value = useMemo(
    () => ({
      era,
      messages,
      dockOpen,
      pending,
      setEra,
      ask,
      openDock,
      closeDock,
      toggleDock,
      hydrateFromShare,
    }),
    [era, messages, dockOpen, pending, setEra, ask, openDock, closeDock, toggleDock, hydrateFromShare],
  );

  return (
    <DollyChatContext.Provider value={value}>{children}</DollyChatContext.Provider>
  );
}

export function useDollyChat() {
  const value = useContext(DollyChatContext);
  if (!value) {
    throw new Error("useDollyChat must be used within DollyChatProvider");
  }
  return value;
}
