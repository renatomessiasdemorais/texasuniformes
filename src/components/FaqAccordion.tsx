"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import type { FaqItem } from "@/types/content";

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openId, setOpenId] = useState<string | null>(items[0]?._id ?? null);

  if (items.length === 0) return null;

  return (
    <div className="divide-y divide-black/10 rounded-xl border border-black/10">
      {items.map((item) => {
        const isOpen = item._id === openId;
        return (
          <div key={item._id}>
            <button
              onClick={() => setOpenId(isOpen ? null : item._id)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              aria-expanded={isOpen}
            >
              <span className="font-semibold text-navy">{item.question}</span>
              <ChevronDown
                size={20}
                className={`shrink-0 text-teal transition-transform ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isOpen && (
              <div className="px-5 pb-4 text-sm text-text-dark/80">
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
