"use client";

import { motion } from "framer-motion";
import { scenes, chapters } from "@/data/story";

interface Props {
  currentIndex: number;
}

const chapterColors = [
  "bg-chapter-1",
  "bg-chapter-2",
  "bg-chapter-3",
  "bg-chapter-4",
];

export default function ProgressBar({ currentIndex }: Props) {
  const current = scenes[currentIndex];
  const chapter = chapters[current.chapter - 1];

  return (
    <div className="w-full px-4 pt-4 md:px-8 md:pt-6">
      <div className="mx-auto max-w-2xl">
        <div className="mb-2 flex items-center justify-between text-xs md:text-sm">
          <span className="text-foreground/60">
            第{chapter.number}章 · {chapter.title}
          </span>
          <span className="text-foreground/40">
            {currentIndex + 1} / {scenes.length}
          </span>
        </div>
        <div className="flex gap-1">
          {scenes.map((_, i) => (
            <motion.div
              key={i}
              className={`h-1 flex-1 rounded-full md:h-1.5 ${
                i < currentIndex
                  ? chapterColors[scenes[i].chapter - 1]
                  : i === currentIndex
                    ? chapterColors[current.chapter - 1]
                    : "bg-white/10"
              }`}
              initial={false}
              animate={{
                opacity: i <= currentIndex ? 1 : 0.3,
                scale: i === currentIndex ? 1 : 1,
              }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
