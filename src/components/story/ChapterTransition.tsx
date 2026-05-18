"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { chapters } from "@/data/story";

interface Props {
  chapterNumber: 1 | 2 | 3 | 4;
  onComplete: () => void;
}

const bgColors = [
  "from-indigo-900/40 to-purple-900/20",
  "from-emerald-900/40 to-teal-900/20",
  "from-amber-900/40 to-orange-900/20",
  "from-red-900/40 to-rose-900/20",
];

export default function ChapterTransition({ chapterNumber, onComplete }: Props) {
  const chapter = chapters[chapterNumber - 1];
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    timerRef.current = setTimeout(onComplete, 3000);
    return () => clearTimeout(timerRef.current);
  }, [onComplete]);

  return (
    <motion.div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b ${bgColors[chapterNumber - 1]}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 1.05, opacity: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-center"
      >
        <p className="mb-2 text-sm tracking-widest text-foreground/40 md:text-base">
          第 {chapter.number} 章
        </p>
        <h2 className="mb-4 text-3xl font-bold text-foreground/90 md:text-5xl">
          {chapter.title}
        </h2>
        <motion.p
          className="text-sm text-foreground/50 md:text-base"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          {chapter.subtitle}
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
