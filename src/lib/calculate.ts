import type { Choice } from "@/data/story";

export interface MBTIResult {
  type: string;
  scores: {
    EI: { E: number; I: number };
    SN: { S: number; N: number };
    TF: { T: number; F: number };
    JP: { J: number; P: number };
  };
  percentages: {
    EI: { left: number; right: number };
    SN: { left: number; right: number };
    TF: { left: number; right: number };
    JP: { left: number; right: number };
  };
}

export function calculateMBTI(answers: Choice[]): MBTIResult {
  const scores = {
    EI: { E: 0, I: 0 },
    SN: { S: 0, N: 0 },
    TF: { T: 0, F: 0 },
    JP: { J: 0, P: 0 },
  };

  for (const answer of answers) {
    const v = answer.value;
    if (v === "E" || v === "I") scores.EI[v]++;
    else if (v === "S" || v === "N") scores.SN[v]++;
    else if (v === "T" || v === "F") scores.TF[v]++;
    else if (v === "J" || v === "P") scores.JP[v]++;
  }

  const pct = (a: number, b: number) =>
    a + b === 0 ? 50 : Math.round((a / (a + b)) * 100);

  const type = [
    scores.EI.E >= scores.EI.I ? "E" : "I",
    scores.SN.S >= scores.SN.N ? "S" : "N",
    scores.TF.T >= scores.TF.F ? "T" : "F",
    scores.JP.J >= scores.JP.P ? "J" : "P",
  ].join("");

  return {
    type,
    scores,
    percentages: {
      EI: { left: pct(scores.EI.E, scores.EI.I), right: pct(scores.EI.I, scores.EI.E) },
      SN: { left: pct(scores.SN.S, scores.SN.N), right: pct(scores.SN.N, scores.SN.S) },
      TF: { left: pct(scores.TF.T, scores.TF.F), right: pct(scores.TF.F, scores.TF.T) },
      JP: { left: pct(scores.JP.J, scores.JP.P), right: pct(scores.JP.P, scores.JP.J) },
    },
  };
}
