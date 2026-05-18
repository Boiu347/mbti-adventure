"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  text: string;
  onComplete: () => void;
  sceneId: string;
  italic?: boolean;
  continueText?: string;
}

export default function StoryText({
  text,
  onComplete,
  sceneId,
  italic,
  continueText = "点击继续 →",
}: Props) {
  const [displayed, setDisplayed] = useState("");
  const [typingDone, setTypingDone] = useState(false);
  const [readyToProceed, setReadyToProceed] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setDisplayed("");
    setTypingDone(false);
    setReadyToProceed(false);

    let i = 0;
    intervalRef.current = setInterval(() => {
      i++;
      if (i >= text.length) {
        setDisplayed(text);
        setTypingDone(true);
        if (intervalRef.current) clearInterval(intervalRef.current);
      } else {
        setDisplayed(text.slice(0, i));
      }
    }, 60);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text, sceneId]);

  function handleClick() {
    if (!typingDone) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setDisplayed(text);
      setTypingDone(true);
      return;
    }

    if (!readyToProceed) {
      setReadyToProceed(true);
      onComplete();
    }
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={sceneId}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.4 }}
        className="cursor-pointer select-none"
        onClick={handleClick}
      >
        <p
          className={`font-serif text-base leading-relaxed md:text-lg md:leading-loose ${
            italic ? "italic text-primary-light/80" : "text-foreground/90"
          }`}
        >
          {displayed}
          {!typingDone && (
            <span className="inline-block animate-pulse text-primary-light">
              |
            </span>
          )}
        </p>
        {!typingDone && (
          <p className="mt-3 text-xs text-foreground/30 md:text-sm">
            点击显示全部
          </p>
        )}
        {typingDone && !readyToProceed && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-3 text-xs text-primary-light/50 md:text-sm"
          >
            {continueText}
          </motion.p>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
