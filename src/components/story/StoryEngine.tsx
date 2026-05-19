"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { scenes } from "@/data/story";
import { useTestStore } from "@/store/useTestStore";
import ProgressBar from "./ProgressBar";
import StoryText from "./StoryText";
import SwipeCard from "./SwipeCard";
import ChapterTransition from "./ChapterTransition";
import CalibrationPhase from "./CalibrationPhase";
import type { Choice } from "@/data/story";

const bgGradients = [
  "from-[#0a0a2e] via-[#1a1040] to-[#050510]",
  "from-[#0a1a0a] via-[#0a2e1a] to-[#050510]",
  "from-[#1a1a0a] via-[#2e2a10] to-[#050510]",
  "from-[#1a0a0a] via-[#2e1020] to-[#050510]",
];

export default function StoryEngine() {
  const router = useRouter();
  const {
    currentIndex,
    answer,
    isTransitioning,
    setTransitioning,
    showChapterIntro,
    setShowChapterIntro,
    result,
    phase,
    reset,
  } = useTestStore();

  const [textDone, setTextDone] = useState(false);
  const [snippet, setSnippet] = useState<string | null>(null);
  const [snippetDone, setSnippetDone] = useState(false);
  const pendingChoiceRef = useRef<Choice | null>(null);
  const [tapSignal, setTapSignal] = useState(0);

  const scene = scenes[currentIndex];

  useEffect(() => {
    reset();
  }, [reset]);

  useEffect(() => {
    if (phase === "done" && result) {
      router.push(`/result/${result.type}`);
    }
  }, [phase, result, router]);

  const handleTextComplete = useCallback(() => {
    setTextDone(true);
  }, []);

  function handleChoose(choice: Choice) {
    setTextDone(false);
    pendingChoiceRef.current = choice;
    setSnippet(choice.nextStorySnippet);
    setSnippetDone(false);
  }

  const handleSnippetComplete = useCallback(() => {
    setSnippetDone(true);
  }, []);

  function handleSnippetContinue() {
    if (!snippetDone) return;
    const choice = pendingChoiceRef.current;
    if (!choice) return;
    pendingChoiceRef.current = null;
    setSnippet(null);
    setSnippetDone(false);
    answer(choice);
  }

  const [introExited, setIntroExited] = useState(true);

  const handleChapterIntroComplete = useCallback(() => {
    setShowChapterIntro(false);
    setTransitioning(false);
  }, [setShowChapterIntro, setTransitioning]);

  useEffect(() => {
    if (showChapterIntro) {
      setIntroExited(false);
      setTapSignal(0);
    }
  }, [showChapterIntro]);

  useEffect(() => {
    if (isTransitioning && !showChapterIntro) {
      setTransitioning(false);
    }
  }, [isTransitioning, showChapterIntro, setTransitioning]);

  if (phase === "calibration") {
    return <CalibrationPhase />;
  }

  if (!scene) return null;

  function handleScreenTap() {
    if (snippet && snippetDone) {
      handleSnippetContinue();
      return;
    }
    setTapSignal((n) => n + 1);
  }

  return (
    <div
      className={`relative flex min-h-screen cursor-pointer flex-col bg-gradient-to-b ${bgGradients[scene.chapter - 1]} transition-colors duration-1000`}
      onClick={handleScreenTap}
    >
      <AnimatePresence onExitComplete={() => { setIntroExited(true); setTapSignal(0); }}>
        {showChapterIntro && (
          <ChapterTransition
            chapterNumber={scene.chapter}
            onComplete={handleChapterIntroComplete}
          />
        )}
      </AnimatePresence>

      <ProgressBar currentIndex={currentIndex} />

      {introExited && (
        <div className="flex flex-1 flex-col items-center justify-center px-6 pb-8 pt-4 md:px-8">
          <div className="w-full max-w-2xl">
            <div className="mb-8 min-h-[120px] md:mb-12 md:min-h-[160px]">
              {snippet ? (
                <StoryText
                  key={`snippet-${scene.id}`}
                  sceneId={`snippet-${scene.id}`}
                  text={snippet}
                  onComplete={handleSnippetComplete}
                  italic
                  continueText="点击屏幕任意位置继续"
                  externalClick={tapSignal > 0 ? tapSignal : undefined}
                />
              ) : (
                <StoryText
                  key={scene.id}
                  sceneId={scene.id}
                  text={scene.storyText}
                  onComplete={handleTextComplete}
                  externalClick={tapSignal > 0 ? tapSignal : undefined}
                />
              )}
            </div>

            {!snippet && (
              <div
                className="flex justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                <SwipeCard
                  key={scene.id}
                  leftChoice={scene.leftChoice}
                  rightChoice={scene.rightChoice}
                  onChoose={handleChoose}
                  visible={textDone}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
