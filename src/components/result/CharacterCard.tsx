"use client";

import { motion } from "framer-motion";
import type { Character } from "@/data/characters";
import type { MBTIResult } from "@/lib/calculate";
import { dimensions } from "@/data/dimensions";

interface Props {
  character: Character;
  result: MBTIResult;
}

const dimKeys = ["EI", "SN", "TF", "JP"] as const;

export default function CharacterCard({ character, result }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="relative mx-auto w-full max-w-[360px] overflow-hidden rounded-3xl border border-white/10 p-[1px]"
    >
      {/* Glowing border */}
      <div
        className="absolute inset-0 rounded-3xl opacity-60"
        style={{
          background: `linear-gradient(135deg, ${character.color}44, transparent 50%, ${character.color}22)`,
        }}
      />

      <div className="relative rounded-3xl bg-gradient-to-b from-[#0a0a2e] to-[#050510] p-6 md:p-8">
        {/* Emoji & Name */}
        <div className="mb-4 text-center">
          <motion.div
            className="mb-3 text-5xl md:text-6xl"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            {character.emoji}
          </motion.div>
          <h2
            className="text-2xl font-bold md:text-3xl"
            style={{ color: character.color }}
          >
            {character.name}
          </h2>
          <p className="mt-1 text-xs text-foreground/50 md:text-sm">
            {character.title}
          </p>
        </div>

        {/* MBTI Type */}
        <div className="mb-6 flex justify-center gap-2">
          {character.type.split("").map((letter, i) => (
            <motion.span
              key={i}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-lg font-bold md:h-12 md:w-12 md:text-xl"
              style={{ color: character.color }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + i * 0.1 }}
            >
              {letter}
            </motion.span>
          ))}
        </div>

        {/* Dimension bars */}
        <div className="space-y-3">
          {dimKeys.map((key, i) => {
            const dim = dimensions[i];
            const pct = result.percentages[key];
            return (
              <div key={key}>
                <div className="mb-1 flex justify-between text-xs text-foreground/50">
                  <span>
                    {dim.left.letter} {dim.left.name} {pct.left}%
                  </span>
                  <span>
                    {pct.right}% {dim.right.name} {dim.right.letter}
                  </span>
                </div>
                <div className="relative h-2 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    className="absolute left-0 top-0 h-full rounded-full"
                    style={{ backgroundColor: character.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${pct.left}%` }}
                    transition={{ duration: 0.8, delay: 0.8 + i * 0.15 }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Watermark */}
        <p className="mt-6 text-center text-[10px] text-foreground/20">
          灵魂冒险 · MBTI 人格测试
        </p>
      </div>
    </motion.div>
  );
}
