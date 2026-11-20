"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUp, Sparkles } from "lucide-react";
import { agentFeed } from "@/lib/mock-data";

type Msg = { from: "agent" | "user"; text: string };

const suggestions = ["Find founders on X", "Write a reply", "Schedule daily hunt"];

export function AgentPanel() {
  const [messages, setMessages] = useState<Msg[]>(agentFeed);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [messages, thinking]);

  const send = (text: string) => {
    if (!text.trim()) return;
    setMessages((m) => [...m, { from: "user", text }]);
    setInput("");
    setThinking(true);
    setTimeout(() => {
      setThinking(false);
      setMessages((m) => [...m, { from: "agent", text: "On it! I'll report back with fresh leads shortly 🚀" }]);
    }, 1200);
  };

  return (
    <aside className="sticky top-0 hidden h-screen w-80 shrink-0 flex-col border-l bg-sidebar xl:flex">
      <div className="flex items-center gap-3 border-b p-4">
        <div className="relative grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground">
          <Sparkles className="size-4" />
          <span className="absolute -right-0.5 -bottom-0.5 size-2.5 rounded-full border-2 border-sidebar bg-emerald-400" />
        </div>
        <div>
          <p className="text-sm font-semibold">Scout Agent</p>
          <p className="text-xs text-muted-foreground">{thinking ? "Thinking…" : "Online · ready"}</p>
        </div>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto p-4">
        {messages.map((m, i) =>
          m.from === "user" ? (
            <div key={i} className="ml-auto w-fit max-w-[85%] animate-rise rounded-2xl rounded-br-sm bg-primary px-3.5 py-2 text-sm text-primary-foreground">
              {m.text}
            </div>
          ) : (
            <div key={i} className="w-fit max-w-[90%] animate-rise rounded-2xl rounded-tl-sm border bg-card px-3.5 py-2 text-sm">
              {m.text}
            </div>
          )
        )}
        {thinking && (
          <div className="flex w-fit gap-1 rounded-2xl rounded-tl-sm border bg-card px-3.5 py-3">
            {[0, 150, 300].map((d) => (
              <span key={d} className="size-1.5 animate-bounce rounded-full bg-muted-foreground" style={{ animationDelay: `${d}ms` }} />
            ))}
          </div>
        )}
        <div ref={endRef} />
      </div>

      <div className="space-y-2 border-t p-3">
        <div className="flex flex-wrap gap-1.5">
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => send(s)}
              className="rounded-full border px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
            >
              {s}
            </button>
          ))}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="flex items-center gap-2 rounded-xl border bg-background p-1.5 pl-3 focus-within:border-primary/50"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Scout anything…"
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          <button type="submit" className="grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground" aria-label="Send">
            <ArrowUp className="size-4" />
          </button>
        </form>
      </div>
    </aside>
  );
}
