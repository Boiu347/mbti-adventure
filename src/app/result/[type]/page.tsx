"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { characters } from "@/data/characters";
import { useTestStore, loadResult } from "@/store/useTestStore";
import type { MBTIResult } from "@/lib/calculate";
import CharacterCard from "@/components/result/CharacterCard";
import RadarChart from "@/components/result/RadarChart";
import DimensionAnalysis from "@/components/result/DimensionAnalysis";
import ShareButton from "@/components/result/ShareButton";

export default function ResultPage() {
  const params = useParams();
  const typeParam = (params.type as string)?.toUpperCase();
  const character = characters[typeParam];
  const storeResult = useTestStore((s) => s.result);

  const [resolvedResult, setResolvedResult] = useState<MBTIResult | null>(null);

  useEffect(() => {
    if (storeResult) {
      setResolvedResult(storeResult);
    } else {
      const saved = loadResult();
      if (saved && saved.type === typeParam) {
        setResolvedResult(saved);
      }
    }
  }, [storeResult, typeParam]);

  const fallbackResult: MBTIResult = resolvedResult ?? {
    type: typeParam,
    scores: {
      EI: { E: typeParam?.includes("E") ? 3 : 1, I: typeParam?.includes("I") ? 3 : 1 },
      SN: { S: typeParam?.includes("S") ? 3 : 1, N: typeParam?.includes("N") ? 3 : 1 },
      TF: { T: typeParam?.includes("T") ? 3 : 1, F: typeParam?.includes("F") ? 3 : 1 },
      JP: { J: typeParam?.includes("J") ? 3 : 1, P: typeParam?.includes("P") ? 3 : 1 },
    },
    percentages: {
      EI: { left: typeParam?.includes("E") ? 75 : 25, right: typeParam?.includes("I") ? 75 : 25 },
      SN: { left: typeParam?.includes("S") ? 75 : 25, right: typeParam?.includes("N") ? 75 : 25 },
      TF: { left: typeParam?.includes("T") ? 75 : 25, right: typeParam?.includes("F") ? 75 : 25 },
      JP: { left: typeParam?.includes("J") ? 75 : 25, right: typeParam?.includes("P") ? 75 : 25 },
    },
  };

  if (!character) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#050510]">
        <div className="text-center">
          <p className="mb-4 text-foreground/60">未找到该人格类型</p>
          <Link href="/" className="text-primary-light underline">
            返回首页
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#050510] via-[#0a0a2e] to-[#050510] pb-12">
      {/* Reveal animation */}
      <motion.div
        className="flex min-h-[30vh] items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.p
          className="text-sm tracking-widest text-foreground/40 md:text-base"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          你的灵魂角色是...
        </motion.p>
      </motion.div>

      {/* Main content: responsive layout */}
      <div className="mx-auto max-w-5xl px-4 md:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
          {/* Left column: character card */}
          <div className="lg:sticky lg:top-8 lg:self-start">
            <CharacterCard character={character} result={fallbackResult} />
          </div>

          {/* Right column: analysis */}
          <div className="flex-1 space-y-8">
            {/* Overview + Analysis */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8"
            >
              <h3 className="mb-4 text-lg font-semibold text-foreground/90 md:text-xl">
                人格分析
              </h3>
              <p className="mb-6 text-sm leading-relaxed text-foreground/70 md:text-base md:leading-loose">
                {character.overview}
              </p>

              <div className="space-y-6">
                {character.analysis.map((section, idx) => (
                  <div key={idx}>
                    <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground/80 md:text-base">
                      <span>{section.icon}</span>
                      <span>{section.title}</span>
                    </h4>
                    {section.items && section.items.length > 0 ? (
                      <ul className="space-y-2">
                        {section.items.map((item, i) => {
                          const colonIdx = item.indexOf("：");
                          const hasLabel = colonIdx > 0 && colonIdx < 8;
                          return (
                            <li
                              key={i}
                              className="flex items-start gap-2 text-sm leading-relaxed text-foreground/60 md:text-base"
                            >
                              <span className="mt-1 shrink-0 text-foreground/30">•</span>
                              {hasLabel ? (
                                <span>
                                  <span className="font-medium text-foreground/80">
                                    {item.slice(0, colonIdx)}：
                                  </span>
                                  {item.slice(colonIdx + 1)}
                                </span>
                              ) : (
                                <span>{item}</span>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    ) : (
                      <p className="text-sm leading-relaxed text-foreground/60 md:text-base md:leading-loose">
                        {section.content}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Story role */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8"
            >
              <h3 className="mb-3 text-lg font-semibold text-foreground/90 md:text-xl">
                你的冒险故事
              </h3>
              <p className="font-serif text-sm italic leading-relaxed text-foreground/60 md:text-base md:leading-loose">
                {character.storyRole}
              </p>
            </motion.div>

            {/* Radar chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8"
            >
              <h3 className="mb-4 text-center text-lg font-semibold text-foreground/90 md:text-xl">
                四维分析
              </h3>
              <RadarChart percentages={fallbackResult.percentages} />
            </motion.div>

            {/* Dimension details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <h3 className="mb-2 text-lg font-semibold text-foreground/90 md:text-xl">
                维度深度解读
              </h3>
              <p className="mb-4 text-xs text-foreground/30 md:text-sm">
                点击展开各维度的详细分析，包含职场、关系和成长建议
              </p>
              <DimensionAnalysis result={fallbackResult} />
            </motion.div>

          </div>
        </div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-12 flex flex-col items-center gap-4 md:flex-row md:justify-center"
        >
          <ShareButton
            type={character.type}
            characterName={character.name}
          />
          <Link
            href="/test"
            className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm text-foreground/50 transition-colors hover:text-foreground/80 md:text-base"
          >
            ↻ 重新冒险
          </Link>
          <Link
            href="/"
            className="text-sm text-foreground/30 transition-colors hover:text-foreground/60 md:text-base"
          >
            返回首页
          </Link>
        </motion.div>

        {/* Other personality types */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="mt-16"
        >
          <h3 className="mb-6 text-center text-lg font-semibold text-foreground/80 md:text-xl">
            探索其他灵魂角色
          </h3>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:gap-4">
            {Object.values(characters).map((c) => {
              const isCurrent = c.type === typeParam;
              return (
                <Link
                  key={c.type}
                  href={`/result/${c.type}`}
                  className={`group relative rounded-xl border p-4 transition-all ${
                    isCurrent
                      ? "border-primary/40 bg-primary/10"
                      : "border-white/5 bg-white/[0.02] hover:border-white/15 hover:bg-white/5"
                  }`}
                >
                  <div className="mb-2 text-2xl">{c.emoji}</div>
                  <p
                    className="text-sm font-semibold md:text-base"
                    style={{ color: c.color }}
                  >
                    {c.name}
                  </p>
                  <p className="text-xs text-foreground/40">{c.type}</p>
                  {isCurrent && (
                    <span className="absolute right-2 top-2 rounded-full bg-primary/20 px-2 py-0.5 text-[10px] text-primary-light">
                      你的类型
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
