"use client";

import { create } from "zustand";
import type { Choice } from "@/data/story";
import { scenes } from "@/data/story";
import { calculateMBTI, type MBTIResult } from "@/lib/calculate";

interface TestState {
  currentIndex: number;
  answers: Choice[];
  isTransitioning: boolean;
  showChapterIntro: boolean;
  result: MBTIResult | null;
  phase: "story" | "calibration" | "done";
  calibrationAnswers: Choice[];

  answer: (choice: Choice) => void;
  addCalibrationAnswer: (choice: Choice) => void;
  finishCalibration: () => void;
  skipCalibration: () => void;
  setTransitioning: (v: boolean) => void;
  setShowChapterIntro: (v: boolean) => void;
  setPhase: (p: "story" | "calibration" | "done") => void;
  reset: () => void;
}

function saveResult(r: MBTIResult) {
  try {
    localStorage.setItem("mbti-result", JSON.stringify(r));
  } catch {}
}

export function loadResult(): MBTIResult | null {
  try {
    const raw = localStorage.getItem("mbti-result");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export const useTestStore = create<TestState>((set, get) => ({
  currentIndex: 0,
  answers: [],
  isTransitioning: false,
  showChapterIntro: true,
  result: null,
  phase: "story",
  calibrationAnswers: [],

  answer: (choice) => {
    const { currentIndex, answers } = get();
    const newAnswers = [...answers, choice];
    const nextIndex = currentIndex + 1;

    if (nextIndex >= scenes.length) {
      const storyResult = calculateMBTI(newAnswers);
      set({
        answers: newAnswers,
        result: storyResult,
        phase: "calibration",
      });
      return;
    }

    const currentChapter = scenes[currentIndex].chapter;
    const nextChapter = scenes[nextIndex].chapter;
    const chapterChanged = currentChapter !== nextChapter;

    set({
      answers: newAnswers,
      currentIndex: nextIndex,
      isTransitioning: true,
      showChapterIntro: chapterChanged,
    });
  },

  addCalibrationAnswer: (choice) => {
    const { calibrationAnswers } = get();
    set({ calibrationAnswers: [...calibrationAnswers, choice] });
  },

  finishCalibration: () => {
    const { answers, calibrationAnswers } = get();
    const allAnswers = [...answers, ...calibrationAnswers];
    const finalResult = calculateMBTI(allAnswers);
    saveResult(finalResult);
    set({ result: finalResult, phase: "done" });
  },

  skipCalibration: () => {
    const { answers } = get();
    const finalResult = calculateMBTI(answers);
    saveResult(finalResult);
    set({ result: finalResult, phase: "done" });
  },

  setTransitioning: (v) => set({ isTransitioning: v }),
  setShowChapterIntro: (v) => set({ showChapterIntro: v }),
  setPhase: (p) => set({ phase: p }),

  reset: () =>
    set({
      currentIndex: 0,
      answers: [],
      isTransitioning: false,
      showChapterIntro: true,
      result: null,
      phase: "story",
      calibrationAnswers: [],
    }),
}));
