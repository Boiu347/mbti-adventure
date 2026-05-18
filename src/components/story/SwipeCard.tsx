"use client";

import { useState } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  type PanInfo,
} from "framer-motion";
import type { Choice } from "@/data/story";

interface Props {
  leftChoice: Choice;
  rightChoice: Choice;
  onChoose: (choice: Choice) => void;
  visible: boolean;
}

const SWIPE_THRESHOLD = 80;

export default function SwipeCard({
  leftChoice,
  rightChoice,
  onChoose,
  visible,
}: Props) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 0, 200], [-12, 0, 12]);
  const leftOpacity = useTransform(x, [-150, -30, 0], [1, 0.3, 0]);
  const rightOpacity = useTransform(x, [0, 30, 150], [0, 0.3, 1]);
  const [exiting, setExiting] = useState<"left" | "right" | null>(null);

  function handleDragEnd(_: unknown, info: PanInfo) {
    if (info.offset.x < -SWIPE_THRESHOLD) {
      setExiting("left");
      setTimeout(() => onChoose(leftChoice), 300);
    } else if (info.offset.x > SWIPE_THRESHOLD) {
      setExiting("right");
      setTimeout(() => onChoose(rightChoice), 300);
    }
  }

  function handleClick(side: "left" | "right") {
    setExiting(side);
    setTimeout(() => onChoose(side === "left" ? leftChoice : rightChoice), 300);
  }

  if (!visible) return null;

  return (
    <motion.div
      className="relative w-full max-w-sm md:max-w-md"
      initial={{ opacity: 0, y: 30 }}
      animate={
        exiting
          ? {
              x: exiting === "left" ? -300 : 300,
              opacity: 0,
              rotate: exiting === "left" ? -20 : 20,
            }
          : { opacity: 1, y: 0 }
      }
      transition={{ duration: exiting ? 0.3 : 0.5, ease: "easeOut" }}
    >
      <motion.div
        className="relative cursor-grab rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl active:cursor-grabbing md:p-8"
        style={{ x, rotate }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.8}
        onDragEnd={handleDragEnd}
      >
        {/* Direction hints */}
        <motion.div
          className="pointer-events-none absolute -left-2 top-1/2 -translate-y-1/2 rounded-full bg-chapter-1/80 px-3 py-1 text-xs font-bold text-white md:-left-4 md:text-sm"
          style={{ opacity: leftOpacity }}
        >
          ← {leftChoice.label}
        </motion.div>
        <motion.div
          className="pointer-events-none absolute -right-2 top-1/2 -translate-y-1/2 rounded-full bg-chapter-3/80 px-3 py-1 text-xs font-bold text-white md:-right-4 md:text-sm"
          style={{ opacity: rightOpacity }}
        >
          {rightChoice.label} →
        </motion.div>

        {/* Card content */}
        <p className="mb-6 text-center text-sm text-foreground/50 md:text-base">
          你会怎么做？
        </p>

        <div className="flex gap-3 md:gap-4">
          {/* Left option */}
          <button
            onClick={() => handleClick("left")}
            className="flex-1 rounded-xl border border-white/10 bg-white/5 p-4 text-left transition-all hover:border-chapter-1/50 hover:bg-chapter-1/10 md:p-5"
          >
            <span className="mb-1 block text-xs text-chapter-1 md:text-sm">
              ←
            </span>
            <span className="block text-sm font-semibold text-foreground/90 md:text-base">
              {leftChoice.label}
            </span>
            <span className="mt-1 block text-xs text-foreground/50 md:text-sm">
              {leftChoice.description}
            </span>
          </button>

          {/* Divider */}
          <div className="flex w-px items-center">
            <div className="h-2/3 w-px bg-white/10" />
          </div>

          {/* Right option */}
          <button
            onClick={() => handleClick("right")}
            className="flex-1 rounded-xl border border-white/10 bg-white/5 p-4 text-left transition-all hover:border-chapter-3/50 hover:bg-chapter-3/10 md:p-5"
          >
            <span className="mb-1 block text-right text-xs text-chapter-3 md:text-sm">
              →
            </span>
            <span className="block text-sm font-semibold text-foreground/90 md:text-base">
              {rightChoice.label}
            </span>
            <span className="mt-1 block text-xs text-foreground/50 md:text-sm">
              {rightChoice.description}
            </span>
          </button>
        </div>

        <p className="mt-4 text-center text-xs text-foreground/25 md:hidden">
          ← 滑动卡片选择 →
        </p>
        <p className="mt-4 hidden text-center text-xs text-foreground/25 md:block">
          拖拽卡片或点击选项
        </p>
      </motion.div>
    </motion.div>
  );
}
