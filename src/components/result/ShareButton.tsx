"use client";

import { useState } from "react";

interface Props {
  type: string;
  characterName: string;
}

export default function ShareButton({ type, characterName }: Props) {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    const text = `我在「灵魂冒险」中获得了 ${type} - ${characterName} 的称号！来测测你是什么角色？`;
    const url = typeof window !== "undefined" ? window.location.href : "";

    if (navigator.share) {
      try {
        await navigator.share({ title: `我是${characterName}！`, text, url });
        return;
      } catch {
        // fall through to clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(`${text}\n${url}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // silent
    }
  }

  return (
    <button
      onClick={handleShare}
      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-foreground/80 transition-all hover:bg-white/10 md:text-base"
    >
      {copied ? (
        <>
          <span>✓</span>
          <span>已复制到剪贴板</span>
        </>
      ) : (
        <>
          <span>↗</span>
          <span>分享结果</span>
        </>
      )}
    </button>
  );
}
