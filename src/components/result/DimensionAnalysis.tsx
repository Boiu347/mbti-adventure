"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { dimensions } from "@/data/dimensions";
import type { MBTIResult } from "@/lib/calculate";

interface Props {
  result: MBTIResult;
}

const dimKeys = ["EI", "SN", "TF", "JP"] as const;

const sectionLabels = [
  { key: "description", icon: "📖", label: "总览" },
  { key: "inWorkplace", icon: "💼", label: "职场" },
  { key: "inRelationship", icon: "💕", label: "关系" },
  { key: "growth", icon: "🌱", label: "成长" },
] as const;

type SectionKey = (typeof sectionLabels)[number]["key"];

export default function DimensionAnalysis({ result }: Props) {
  const [expandedDim, setExpandedDim] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<Record<string, SectionKey>>({});

  function getSection(dimKey: string): SectionKey {
    return activeSection[dimKey] ?? "description";
  }

  return (
    <div className="space-y-3">
      {dimKeys.map((key, i) => {
        const dim = dimensions[i];
        const pct = result.percentages[key];
        const dominant = pct.left >= pct.right ? dim.left : dim.right;
        const isOpen = expandedDim === key;
        const currentSection = getSection(key);

        return (
          <motion.div
            key={key}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.1 }}
          >
            <button
              onClick={() => setExpandedDim(isOpen ? null : key)}
              className="w-full rounded-xl border border-white/10 bg-white/5 p-4 text-left transition-colors hover:bg-white/[0.08] md:p-5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20 text-sm font-bold text-primary-light">
                    {dominant.letter}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-foreground/90 md:text-base">
                      {dim.title}：{dominant.name}（{dominant.letter}）
                    </p>
                    <p className="text-xs text-foreground/40">
                      {dim.subtitle} ·{" "}
                      {pct.left >= pct.right
                        ? `${pct.left}% ${dim.left.name} / ${pct.right}% ${dim.right.name}`
                        : `${pct.right}% ${dim.right.name} / ${pct.left}% ${dim.left.name}`}
                    </p>
                  </div>
                </div>
                <motion.span
                  className="text-foreground/30"
                  animate={{ rotate: isOpen ? 180 : 0 }}
                >
                  ▾
                </motion.span>
              </div>

              {/* Mini progress bar */}
              <div className="mt-3 flex items-center gap-2">
                <span className="w-6 text-right text-[10px] text-foreground/30">
                  {dim.left.letter}
                </span>
                <div className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="absolute left-0 top-0 h-full rounded-full bg-primary/70 transition-all duration-700"
                    style={{ width: `${pct.left}%` }}
                  />
                </div>
                <span className="w-6 text-[10px] text-foreground/30">
                  {dim.right.letter}
                </span>
              </div>
            </button>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="overflow-hidden"
                >
                  <div className="rounded-b-xl border border-t-0 border-white/10 bg-white/[0.03] px-4 pb-5 pt-4 md:px-5">
                    {/* Section tabs */}
                    <div className="mb-4 flex gap-1 overflow-x-auto">
                      {sectionLabels.map((sec) => (
                        <button
                          key={sec.key}
                          onClick={() =>
                            setActiveSection((prev) => ({
                              ...prev,
                              [key]: sec.key,
                            }))
                          }
                          className={`flex shrink-0 items-center gap-1 rounded-lg px-3 py-1.5 text-xs transition-all md:text-sm ${
                            currentSection === sec.key
                              ? "bg-primary/20 text-primary-light"
                              : "text-foreground/40 hover:bg-white/5 hover:text-foreground/60"
                          }`}
                        >
                          <span>{sec.icon}</span>
                          <span>{sec.label}</span>
                        </button>
                      ))}
                    </div>

                    {/* Section content */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentSection}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                      >
                        <p className="text-sm leading-relaxed text-foreground/60 md:text-base md:leading-loose">
                          {dominant[currentSection]}
                        </p>
                      </motion.div>
                    </AnimatePresence>

                    {/* Quote */}
                    <div className="mt-4 border-l-2 border-primary/30 pl-3">
                      <p className="text-xs italic text-foreground/35 md:text-sm">
                        {dominant.famousQuote}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
