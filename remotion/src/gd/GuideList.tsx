import React from "react";
import { AbsoluteFill, Easing, interpolate, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Audio } from "@remotion/media";
import { OffthreadVideo as Video } from "remotion";
import { clamp, FONT, popIn, Watermark } from "./common";

// "Guide GameDrop" save-bait checklist: title readable on frame 0, rows slide in one by one over
// moving footage (one clip per row), the final frame shows the full list (screenshot/save) + a save CTA.
export type GuideRow = { title: string; detail?: string; pill?: string };
export type GuideClip = { src: string; trim?: number; rate?: number; pos?: string };
export type GuideListProps = {
  series: string; // e.g. "GUIDE GAMEDROP #1"
  title: string[]; // last line is highlighted
  rows: GuideRow[];
  clips: GuideClip[]; // background per row (cycled)
  first: number; // frame of the first row
  step: number; // frames between rows
  cta: string;
  accent?: string;
  music?: string;
};

const ROW_H = 142;

export const GuideList: React.FC<GuideListProps> = (p) => {
  const f = useCurrentFrame();
  const accent = p.accent ?? "#FFC400";
  const n = p.rows.length;
  const at = (i: number) => p.first + i * p.step;
  const end = at(n - 1) + p.step;
  const active = Math.max(0, Math.min(n - 1, Math.floor((f - p.first) / p.step)));
  const titleTop = 150;
  const listTop = 600;
  return (
    <AbsoluteFill style={{ backgroundColor: "black", fontFamily: FONT }}>
      {/* background footage, one clip per row */}
      {p.rows.map((_, i) => {
        const c = p.clips[i % p.clips.length];
        const from = i === 0 ? 0 : at(i);
        const dur = i === n - 1 ? 100000 : at(i + 1) - from;
        return (
          <Sequence key={i} from={from} durationInFrames={dur}>
            <Video
              src={staticFile(c.src)}
              muted
              trimBefore={c.trim ?? 0}
              playbackRate={c.rate ?? 0.6}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: c.pos ?? "50% 50%",
                filter: "brightness(0.6) saturate(1.2)",
                scale: interpolate(f, [from, from + 8, from + 60], [1.25, 1.12, 1.16], { ...clamp, easing: Easing.bezier(0.16, 1, 0.3, 1) }),
              }}
            />
          </Sequence>
        );
      })}
      <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 40%, rgba(0,0,0,0.55) 100%)" }} />

      {/* header */}
      <div style={{ position: "absolute", top: titleTop, left: 60, right: 60 }}>
        <div
          style={{
            display: "inline-block",
            background: accent,
            color: "#111",
            fontSize: 30,
            letterSpacing: 2,
            padding: "6px 18px",
            borderRadius: 8,
            marginBottom: 18,
          }}
        >
          {p.series}
        </div>
        {p.title.map((l, i) => (
          <div
            key={i}
            style={{
              fontSize: i === p.title.length - 1 ? 92 : 80,
              lineHeight: 1.06,
              color: i === p.title.length - 1 ? accent : "white",
              textShadow: "0 5px 0 rgba(0,0,0,0.85)",
              letterSpacing: -1,
            }}
          >
            {l}
          </div>
        ))}
      </div>

      {/* rows */}
      <div style={{ position: "absolute", top: listTop, left: 44, right: 44 }}>
        {p.rows.map((r, i) => {
          const a = at(i);
          const t = interpolate(f, [a, a + 9], [0, 1], { ...clamp, easing: Easing.bezier(0.16, 1, 0.3, 1) });
          const isActive = f >= a && i === active && f < end;
          const pill = popIn(f, a + 5);
          return (
            <div
              key={i}
              style={{
                position: "relative",
                height: ROW_H - 16,
                marginBottom: 16,
                display: "flex",
                alignItems: "center",
                gap: 22,
                padding: "0 24px",
                borderRadius: 22,
                background: isActive ? "rgba(255,255,255,0.97)" : "rgba(15,15,18,0.82)",
                border: `4px solid ${isActive ? accent : "rgba(255,255,255,0.12)"}`,
                opacity: t,
                translate: `${interpolate(t, [0, 1], [700, 0])}px 0px`,
                scale: isActive ? interpolate(f, [a, a + 6, a + 14], [1, 1.04, 1.02], clamp) : 1,
                boxShadow: isActive ? "0 14px 40px rgba(0,0,0,0.55)" : "none",
              }}
            >
              <div
                style={{
                  flex: "0 0 74px",
                  height: 74,
                  borderRadius: 37,
                  background: accent,
                  color: "#111",
                  fontSize: 42,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {i + 1}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 44, lineHeight: 1.08, color: isActive ? "#111" : "white" }}>{r.title}</div>
                {r.detail ? (
                  <div style={{ fontSize: 29, lineHeight: 1.15, marginTop: 4, color: isActive ? "#444" : "rgba(255,255,255,0.7)" }}>{r.detail}</div>
                ) : null}
              </div>
              {r.pill ? (
                <div
                  style={{
                    flex: "0 0 auto",
                    maxWidth: 330,
                    background: isActive ? "#111" : accent,
                    color: isActive ? accent : "#111",
                    fontSize: 34,
                    lineHeight: 1.05,
                    textAlign: "center",
                    padding: "12px 18px",
                    borderRadius: 14,
                    scale: interpolate(pill, [0, 1], [0.4, 1], clamp),
                  }}
                >
                  {r.pill}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>

      {/* save CTA */}
      <div
        style={{
          position: "absolute",
          top: listTop + n * ROW_H + 18,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          scale: interpolate(popIn(f, end - 4), [0, 1], [0.3, 1], clamp),
          opacity: f >= end - 4 ? 1 : 0,
        }}
      >
        <div style={{ background: accent, color: "#111", fontSize: 40, padding: "14px 30px", borderRadius: 16, rotate: "-1.5deg", boxShadow: "0 10px 30px rgba(0,0,0,0.5)" }}>
          {p.cta}
        </div>
      </div>
      <Watermark />

      {p.music ? <Audio src={staticFile(`music/${p.music}`)} volume={0.28} /> : null}
      <Audio src={staticFile("sfx/whoosh.wav")} volume={0.4} />
      {p.rows.map((_, i) => (
        <Sequence key={i} from={at(i)}>
          <Audio src={staticFile(i % 2 ? "sfx/whip.wav" : "sfx/whoosh.wav")} volume={0.45} />
        </Sequence>
      ))}
      <Sequence from={end - 4}>
        <Audio src={staticFile("sfx/ding.wav")} volume={0.7} />
      </Sequence>
    </AbsoluteFill>
  );
};
