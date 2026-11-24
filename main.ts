// Worst AI Advice — "Force Push"
// Pass 1: candidate one-liners scored against the brief's judge criteria,
// in brief order: (1) worst advice — bad and specific enough to follow;
// (2) funny on first read; (3) tight, no wasted words; (4) sounds like a
// real AI assistant — confident, tidy voice; (5) concrete, real
// situation/action. Weights 3/3/2/2/2, each criterion rated 0-2 (max 24).
// The winner is written to /output/entry.txt and validated against the
// gate: one line, 1-140 chars, UTF-8, non-blank.
import { writeFileSync } from "node:fs";

type Cand = { line: string; worst: number; funny: number; tight: number; voice: number; concrete: number };

const W = { worst: 3, funny: 3, tight: 2, voice: 2, concrete: 2 };
const score = (c: Cand) =>
  c.worst * W.worst + c.funny * W.funny + c.tight * W.tight + c.voice * W.voice + c.concrete * W.concrete;

const candidates: Cand[] = [
  // Flat insider one-liner: one git verb, punch in the last clause, the
  // damage is never narrated — the reader supplies it. Confident AI voice:
  // a tidy imperative plus a reassuring reason that is exactly wrong.
  { line: "Just force-push to main — if it mattered, someone would have backed it up.", worst: 2, funny: 2, tight: 2, voice: 2, concrete: 2 },
  // Same deletion family, but the reason clause explains the joke instead
  // of landing it; longer and flatter.
  { line: "Delete the backups to save space — they're just copies of files you already have.", worst: 2, funny: 1, tight: 1, voice: 2, concrete: 2 },
  // Friday deploy is a known meme; the second clause narrates the effect,
  // which the past finals punish.
  { line: "Deploy it Friday at 5 p.m. — weekends are for not thinking about work.", worst: 2, funny: 1, tight: 1, voice: 1, concrete: 2 },
  // Tight but generic — no named situation, reads like a slogan.
  { line: "No need to test it first; if it compiles, it works.", worst: 1, funny: 1, tight: 2, voice: 2, concrete: 1 },
  // Specific and followable, but the punch ("faster than a vault") is mild.
  { line: "Share your API keys in the group chat — it's faster than a vault.", worst: 2, funny: 1, tight: 2, voice: 2, concrete: 2 },
  // Two sentences; the "No log, no error" snap is good but the setup is
  // longer than the winner's single breath.
  { line: "If the error keeps showing up, delete the log file. No log, no error.", worst: 2, funny: 2, tight: 1, voice: 2, concrete: 2 },
  // Review-skip is real, but "clearly knew" softens the confidence the
  // brief wants from the AI voice.
  { line: "Merge it without a review — the author clearly knew what they were doing.", worst: 1, funny: 1, tight: 2, voice: 1, concrete: 2 },
  // chmod 777 is concrete; "only slow you down" is a weaker last beat than
  // a backup that does not exist.
  { line: "Run chmod 777 on the whole server; permissions only slow you down.", worst: 2, funny: 1, tight: 2, voice: 2, concrete: 2 },
];

let best = candidates[0];
for (const c of candidates) {
  console.log(`${score(c)}/24  ${c.line}`);
  if (score(c) > score(best)) best = c;
}
console.log(`CHOSEN (${score(best)}/24): ${best.line}`);

const line = best.line;
const bytes = Buffer.byteLength(line, "utf8");
if (line.includes("\n") || line.trim().length === 0) throw new Error("gate: must be one non-blank line");
if (line.length < 1 || line.length > 140) throw new Error(`gate: ${line.length} chars out of 1-140`);
writeFileSync("/output/entry.txt", line, "utf8");
console.log(`wrote ${line.length} chars (${bytes} bytes) to /output/entry.txt`);
