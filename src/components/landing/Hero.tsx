"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
      {/* Rune glow */}
      <motion.div
        className="mb-8 flex h-24 w-24 items-center justify-center rounded-full md:h-32 md:w-32"
        style={{
          background:
            "radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 70%)",
        }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg
          viewBox="0 0 100 100"
          className="h-16 w-16 md:h-20 md:w-20"
          fill="none"
          stroke="rgba(168,139,250,0.9)"
          strokeWidth="1.5"
        >
          <circle cx="50" cy="50" r="40" strokeDasharray="6 4" />
          <circle cx="50" cy="50" r="28" />
          <path d="M50 10 L50 90 M10 50 L90 50" strokeWidth="0.8" />
          <path d="M26 26 L74 74 M74 26 L26 74" strokeWidth="0.8" />
          <circle cx="50" cy="50" r="8" fill="rgba(168,139,250,0.4)" />
        </svg>
      </motion.div>

      {/* Title */}
      <motion.h1
        className="mb-4 text-3xl font-bold tracking-wide md:text-5xl lg:text-6xl"
        style={{
          background: "linear-gradient(135deg, #a78bfa 0%, #c084fc 50%, #818cf8 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        你的灵魂，属于哪个阵营？
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        className="mb-10 max-w-md text-sm text-foreground/60 md:max-w-lg md:text-base"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        一段奇幻冒险，12 个命运抉择，揭晓你的真实人格
      </motion.p>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.9, duration: 0.6 }}
      >
        <Link href="/test" className="group relative inline-flex items-center gap-3 px-10 py-4 md:px-12 md:py-5">
          {/* Outer glow */}
          <span className="absolute inset-0 rounded-full opacity-40 blur-xl transition-opacity group-hover:opacity-70" style={{ background: "radial-gradient(ellipse at center, rgba(139,92,246,0.6), transparent 70%)" }} />
          {/* Border */}
          <span className="absolute inset-0 rounded-full border border-violet-400/30 transition-colors group-hover:border-violet-400/60" />
          {/* Subtle fill */}
          <span className="absolute inset-0 rounded-full bg-violet-500/10 transition-colors group-hover:bg-violet-500/20" />
          {/* Text */}
          <span className="relative text-lg font-semibold tracking-wide text-violet-200 transition-colors group-hover:text-white md:text-xl">
            踏入冒险
          </span>
          <span className="relative text-lg text-violet-300 transition-all group-hover:translate-x-1 group-hover:text-white md:text-xl">
            →
          </span>
        </Link>
      </motion.div>

      {/* Footer note */}
      <motion.p
        className="mt-16 text-xs text-foreground/30 md:mt-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
      >
        基于 MBTI 人格理论 · 约 3 分钟
      </motion.p>
    </div>
  );
}
