import React from "react";
import { AbsoluteFill, Easing, interpolate, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Audio } from "@remotion/media";
import { OffthreadVideo as Video } from "remotion";
import { clamp, Flash, FONT, popIn, useShake, Watermark } from "./common";

// "Time ladder" list: a title + timestamped steps that stack up, each over its own shot.
// Step 1 is readable on frame 0; the last step is the punchline (flash, shake, boom).
export type LadderStep = { time: string; text: string; src: string; trim?: number; rate?: number; pos?: string };
export type TimeLadderProps = {
  title: string[];
  steps: LadderStep[];
  at: number[]; // frame each step appears (at[0] should be 0)
  punchColor?: string;
  music?: boolean;
};

export const TimeLadder: React.FC<TimeLadderProps> = (p) => {
  const f = useCurrentFrame();
  const n = p.steps.length;
  const P = p.at[n - 1];
  const shake = useShake(P + 1, 16, 26);
  const cover = { width: "100%", height: "100%", objectFit: "cover" as const };
  return (
    <AbsoluteFill style={{ backgroundColor: "black", fontFamily: FONT }}>
      <AbsoluteFill style={{ translate: shake }}>
        {p.steps.map((s, i) => {
          const from = p.at[i];
          const to = i < n - 1 ? p.at[i + 1] : 100000;
          return (
            <Sequence key={i} from={from} durationInFrames={to - from}>
              <Video
                src={staticFile(s.src)}
                muted
                trimBefore={s.trim ?? 0}
                playbackRate={s.rate ?? 1}
                style={{
                  ...cover,
                  objectPosition: s.pos ?? "50% 50%",
                  filter: i === n - 1 ? "brightness(1.15) contrast(1.15) saturate(1.2)" : "brightness(0.85)",
                  scale: interpolate(f, [from, from + 6, from + 90], i === n - 1 ? [1.5, 1.15, 1.25] : [1.08, 1.0, 1.06], {
                    ...clamp,
                    easing: Easing.bezier(0.16, 1, 0.3, 1),
                  }),
                }}
              />
            </Sequence>
          );
        })}
        <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.35) 45%, rgba(0,0,0,0) 70%)" }} />
        <div style={{ position: "absolute", top: 190, left: 50, right: 50, textAlign: "center" }}>
          {p.title.map((l) => (
            <div key={l} style={{ fontSize: 84, lineHeight: 1.12, color: "white", textShadow: "0 5px 0 rgba(0,0,0,0.9)" }}>
              {l}
            </div>
          ))}
        </div>
        <div style={{ position: "absolute", top: 440, left: 50, right: 50, display: "flex", flexDirection: "column", gap: 22 }}>
          {p.steps.map((s, i) => {
            const pop = popIn(f, p.at[i] - (i === 0 ? 12 : 0));
            const last = i === n - 1;
            const active = f >= p.at[i] && (i === n - 1 || f < p.at[i + 1]);
            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 22,
                  padding: "16px 24px",
                  borderRadius: 20,
                  backgroundColor: last ? "rgba(0,0,0,0.85)" : active ? "rgba(255,255,255,0.97)" : "rgba(255,255,255,0.78)",
                  opacity: interpolate(pop, [0, 0.3], [0, 1], clamp),
                  scale: interpolate(pop, [0, 1], [0.7, 1], clamp),
                  boxShadow: "0 8px 24px rgba(0,0,0,0.45)",
                }}
              >
                <div
                  style={{
                    minWidth: 150,
                    flexShrink: 0,
                    whiteSpace: "nowrap",
                    fontSize: 48,
                    color: last ? "#111" : "white",
                    backgroundColor: last ? "#FFC400" : "#E8336D",
                    borderRadius: 12,
                    padding: "4px 10px",
                    textAlign: "center",
                  }}
                >
                  {s.time}
                </div>
                <div style={{ fontSize: last ? 64 : 50, lineHeight: 1.14, color: last ? "#FFC400" : "#111" }}>{s.text}</div>
              </div>
            );
          })}
        </div>
        <Watermark />
      </AbsoluteFill>
      <Flash at={P} color={p.punchColor ?? "#FF4D2E"} dur={9} />

      {p.music ? (
        <Audio src={staticFile("bed.mp3")} trimBefore={30} volume={(fr) => interpolate(fr, [0, 6, P - 3, P], [0.28, 0.28, 0.28, 0], clamp)} />
      ) : null}
      {p.at.slice(1, n - 1).map((a) => (
        <Sequence key={a} from={a}>
          <Audio src={staticFile("sfx/whip.wav")} volume={0.45} />
        </Sequence>
      ))}
      <Sequence from={P - 6}>
        <Audio src={staticFile("sfx/record-scratch.wav")} volume={0.7} />
      </Sequence>
      <Sequence from={P}>
        <Audio src={staticFile("sfx/vine-boom.wav")} volume={1} />
      </Sequence>
    </AbsoluteFill>
  );
};
