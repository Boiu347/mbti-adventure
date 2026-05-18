"use client";

import { useState } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, type PanInfo } from "framer-motion";
import { calibrationQuestions } from "@/data/calibration";
import { useTestStore } from "@/store/useTestStore";
import type { Choice } from "@/data/story";

const SWIPE_THRESHOLD = 60;

export default function CalibrationPhase() {
  const { addCalibrationAnswer, finishCalibration, skipCalibration, calibrationAnswers } =
    useTestStore();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [exiting, setExiting] = useState<"left" | "right" | null>(null);

  const total = calibrationQuestions.length;
  const isDone = currentIdx >= total;
  const q = !isDone ? calibrationQuestions[currentIdx] : null;

  function handleChoose(choice: Choice) {
    addCalibrationAnswer(choice);
    setExiting(null);
    if (currentIdx + 1 >= total) {
      setTimeout(() => finishCalibration(), 400);
    } else {
      setTimeout(() => setCurrentIdx(currentIdx + 1), 300);
    }
  }

  if (isDone) return null;

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-[#050510] via-[#10102e] to-[#050510]">
      {/* Header */}
      <div className="px-4 pt-6 md:px-8 md:pt-8">
        <div className="mx-auto max-w-lg text-center">
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-1 text-xs tracking-widest text-primary-light/60 md:text-sm"
          >
            深度校准
          </motion.p>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-2 text-lg font-semibold text-foreground/80 md:text-xl"
          >
            快速二选一
          </motion.h2>
          <p className="mb-4 text-xs text-foreground/30 md:text-sm">
            不用多想，凭第一反应选择更像你的那个
          </p>

          {/* Progress */}
          <div className="mb-2 flex justify-center gap-1.5">
            {calibrationQuestions.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 w-6 rounded-full transition-all duration-300 md:w-8 ${
                  i < currentIdx
                    ? "bg-primary"
                    : i === currentIdx
                      ? "bg-primary-light"
                      : "bg-white/10"
                }`}
              />
            ))}
          </div>
          <p className="text-xs text-foreground/20">
            {currentIdx + 1} / {total}
          </p>
        </div>
      </div>

      {/* Card area */}
      <div className="flex flex-1 items-center justify-center px-6 pb-8">
        <AnimatePresence mode="wait">
          {q && (
            <CalibrationCard
              key={q.id}
              question={q}
              onChoose={handleChoose}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Skip button */}
      <div className="pb-8 text-center">
        <button
          onClick={skipCalibration}
          className="text-xs text-foreground/25 transition-colors hover:text-foreground/50 md:text-sm"
        >
          跳过校准，直接查看结果 →
        </button>
      </div>
    </div>
  );
}

function CalibrationCard({
  question,
  onChoose,
}: {
  question: (typeof calibrationQuestions)[0];
  onChoose: (c: Choice) => void;
}) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 0, 200], [-15, 0, 15]);
  const bgLeft = useTransform(x, [-120, 0], [0.15, 0]);
  const bgRight = useTransform(x, [0, 120], [0, 0.15]);
  const [exiting, setExiting] = useState<"left" | "right" | null>(null);

  function handleDragEnd(_: unknown, info: PanInfo) {
    if (info.offset.x < -SWIPE_THRESHOLD) {
      setExiting("left");
      setTimeout(() => onChoose(question.leftChoice), 250);
    } else if (info.offset.x > SWIPE_THRESHOLD) {
      setExiting("right");
      setTimeout(() => onChoose(question.rightChoice), 250);
    }
  }

  function handleClick(side: "left" | "right") {
    setExiting(side);
    setTimeout(
      () => onChoose(side === "left" ? question.leftChoice : question.rightChoice),
      250
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={
        exiting
          ? {
              x: exiting === "left" ? -350 : 350,
              opacity: 0,
              rotate: exiting === "left" ? -25 : 25,
            }
          : { opacity: 1, scale: 1, y: 0 }
      }
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: exiting ? 0.25 : 0.35 }}
      className="w-full max-w-sm md:max-w-md"
    >
      <motion.div
        style={{ x, rotate }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.7}
        onDragEnd={handleDragEnd}
        className="cursor-grab rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl active:cursor-grabbing"
      >
        <div className="p-6 md:p-8">
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            <button
              onClick={() => handleClick("left")}
              className="group flex flex-col items-center rounded-xl border border-white/10 bg-white/5 p-5 text-center transition-all hover:border-indigo-500/30 hover:bg-indigo-500/10 md:p-6"
            >
              <span className="mb-2 text-2xl">←</span>
              <span className="mb-1 text-sm font-semibold text-foreground/90 md:text-base">
                {question.leftChoice.label}
              </span>
              <span className="text-xs text-foreground/40 md:text-sm">
                {question.leftChoice.description}
              </span>
            </button>

            <button
              onClick={() => handleClick("right")}
              className="group flex flex-col items-center rounded-xl border border-white/10 bg-white/5 p-5 text-center transition-all hover:border-amber-500/30 hover:bg-amber-500/10 md:p-6"
            >
              <span className="mb-2 text-2xl">→</span>
              <span className="mb-1 text-sm font-semibold text-foreground/90 md:text-base">
                {question.rightChoice.label}
              </span>
              <span className="text-xs text-foreground/40 md:text-sm">
                {question.rightChoice.description}
              </span>
            </button>
          </div>

          <p className="mt-4 text-center text-xs text-foreground/20 md:hidden">
            ← 滑动或点击选择 →
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
