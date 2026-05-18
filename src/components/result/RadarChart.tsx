"use client";

import { motion } from "framer-motion";
import type { MBTIResult } from "@/lib/calculate";

interface Props {
  percentages: MBTIResult["percentages"];
}

export default function RadarChart({ percentages }: Props) {
  const cx = 150,
    cy = 150,
    r = 110;

  const values = [
    percentages.EI.left / 100,
    percentages.SN.right / 100,
    percentages.TF.left / 100,
    percentages.JP.left / 100,
  ];

  const labels = [
    { text: "E 外向", x: cx, y: cy - r - 16 },
    { text: "N 直觉", x: cx + r + 16, y: cy },
    { text: "T 思考", x: cx, y: cy + r + 20 },
    { text: "J 判断", x: cx - r - 16, y: cy },
  ];

  const labelsAlt = [
    { text: "I 内向", x: cx, y: cy - r - 28 },
    { text: "S 实感", x: cx + r + 16, y: cy + 14 },
    { text: "F 情感", x: cx, y: cy + r + 34 },
    { text: "P 感知", x: cx - r - 16, y: cy + 14 },
  ];

  const angles = [
    -Math.PI / 2,
    0,
    Math.PI / 2,
    Math.PI,
  ];

  function polarToCart(angle: number, dist: number) {
    return {
      x: cx + Math.cos(angle) * dist,
      y: cy + Math.sin(angle) * dist,
    };
  }

  const gridLevels = [0.25, 0.5, 0.75, 1];

  const dataPoints = values.map((v, i) => polarToCart(angles[i], v * r));
  const dataPath = dataPoints.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ") + "Z";

  return (
    <svg viewBox="0 0 300 300" className="mx-auto h-56 w-56 md:h-72 md:w-72">
      {/* Grid */}
      {gridLevels.map((level) => {
        const pts = angles.map((a) => polarToCart(a, level * r));
        const path = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ") + "Z";
        return (
          <path
            key={level}
            d={path}
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="1"
          />
        );
      })}

      {/* Axes */}
      {angles.map((a, i) => {
        const end = polarToCart(a, r);
        return (
          <line
            key={i}
            x1={cx}
            y1={cy}
            x2={end.x}
            y2={end.y}
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="1"
          />
        );
      })}

      {/* Data area */}
      <motion.path
        d={dataPath}
        fill="rgba(139,92,246,0.2)"
        stroke="rgba(139,92,246,0.8)"
        strokeWidth="2"
        initial={{ opacity: 0, scale: 0.3 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
        style={{ transformOrigin: `${cx}px ${cy}px` }}
      />

      {/* Data points */}
      {dataPoints.map((p, i) => (
        <motion.circle
          key={i}
          cx={p.x}
          cy={p.y}
          r="4"
          fill="#8b5cf6"
          stroke="white"
          strokeWidth="1.5"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 + i * 0.1 }}
        />
      ))}

      {/* Labels - primary */}
      {labels.map((l, i) => (
        <text
          key={`p-${i}`}
          x={l.x}
          y={l.y}
          textAnchor="middle"
          className="fill-foreground/70 text-[10px] font-semibold"
        >
          {l.text}
        </text>
      ))}

      {/* Labels - alt (dimmer) */}
      {labelsAlt.map((l, i) => (
        <text
          key={`a-${i}`}
          x={l.x}
          y={l.y}
          textAnchor="middle"
          className="fill-foreground/30 text-[9px]"
        >
          {l.text}
        </text>
      ))}
    </svg>
  );
}
