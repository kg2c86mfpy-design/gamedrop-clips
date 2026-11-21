import React from "react";
import { AbsoluteFill, Easing, interpolate, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Audio } from "@remotion/media";
import { OffthreadVideo as Video } from "remotion";
import { clamp, Flash, FONT, popIn, useShake, Watermark } from "./common";

export type Tier = { label: string; color: string; items: string[] };
export type TierListProps = {
  title: string[];
  subtitle: string;
  tiers: Tier[]; // top to bottom: S, A, B, C
  cta: string;
  source: string;
  bg: string;
  reveal?: number[]; // frames for C, B, A, S
  music?: string; // file in public/music/ (default: bed.mp3)
};

// Reveal order: bottom row first, S (top row) last
const DEFAULT_REVEAL = [60, 105, 150, 225]; // frames for C, B, A, S
const ROW_H = 190;

export const TierList: React.FC<TierListProps> = ({ title, subtitle, tiers, cta, source, bg, reveal, music }) => {
  const f = useCurrentFrame();
  const { durationInFrames: D } = useVideoConfig();
  const REVEAL = reveal ?? DEFAULT_REVEAL;
  const sAt = REVEAL[3];
  const shake = useShake(sAt, 14, 22);

  return (
    <AbsoluteFill style={{ backgroundColor: "black", fontFamily: FONT }}>
      <AbsoluteFill style={{ translate: shake }}>
        <Video
          src={staticFile(bg)}
          muted
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "blur(10px) brightness(0.45)",
            scale: interpolate(f, [0, D], [1.15, 1.3], clamp),
          }}
        />

        {/* Title */}
        <div style={{ position: "absolute", top: 190, width: "100%", textAlign: "center" }}>
          {title.map((line, i) => (
            <div
              key={line}
              style={{
                fontSize: 84,
                lineHeight: 1.08,
                color: "white",
                textShadow: "0 6px 0 rgba(0,0,0,0.6)",
                scale: interpolate(popIn(f, i * 3 - 9), [0, 1], [1.4, 1], clamp),
              }}
            >
              {line}
            </div>
          ))}
          <div
            style={{
              marginTop: 14,
              fontSize: 46,
              color: "#FFC400",
              textShadow: "0 4px 0 rgba(0,0,0,0.6)",
              opacity: interpolate(f, [16, 24], [0, 1], clamp),
            }}
          >
            {subtitle}
          </div>
        </div>

        {/* Tier rows */}
        {tiers.map((t, i) => {
          const revealAt = REVEAL[tiers.length - 1 - i];
          const top = 520 + i * (ROW_H + 18);
          const isS = i === 0;
          const rowIn = interpolate(f, [24 + (tiers.length - i) * 5, 36 + (tiers.length - i) * 5], [-1100, 0], {
            ...clamp,
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          });
          return (
            <div
              key={t.label}
              style={{
                position: "absolute",
                left: 60,
                right: 60,
                top,
                height: ROW_H,
                display: "flex",
                translate: `${rowIn}px 0px`,
                backgroundColor: "rgba(0,0,0,0.55)",
                borderRadius: 18,
                overflow: "hidden",
                boxShadow:
                  isS && f >= sAt ? `0 0 ${interpolate(f, [sAt, sAt + 20], [80, 30], clamp)}px rgba(255,196,0,0.9)` : "none",
              }}
            >
              <div
                style={{
                  width: 170,
                  backgroundColor: t.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 110,
                  color: "#111",
                }}
              >
                {t.label}
              </div>
              <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 18, paddingLeft: 26, flexWrap: "wrap" }}>
                {f < revealAt && isS ? (
                  <div
                    style={{
                      fontSize: 72,
                      color: "#FFC400",
                      opacity: interpolate(f, [REVEAL[2] + 8, REVEAL[2] + 16], [0, 1], clamp),
                      scale: interpolate(Math.sin(f / 3), [-1, 1], [0.9, 1.1]),
                    }}
                  >
                    ???
                  </div>
                ) : null}
                {t.items.map((item, k) => {
                  const at = revealAt + k * 5;
                  const p = popIn(f, at);
                  return (
                    <div
                      key={item}
                      style={{
                        fontSize: 50,
                        color: "#111",
                        backgroundColor: isS ? "#FFE27A" : "white",
                        borderRadius: 16,
                        padding: "10px 24px",
                        opacity: interpolate(f, [at, at + 3], [0, 1], clamp),
                        scale: interpolate(p, [0, 1], [0.3, 1], clamp),
                        translate: `${interpolate(f, [at, at + 10], [300, 0], { ...clamp, easing: Easing.bezier(0.16, 1, 0.3, 1) })}px 0px`,
                      }}
                    >
                      {item}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* CTA */}
        <div
          style={{
            position: "absolute",
            top: 1365,
            width: "100%",
            textAlign: "center",
            fontSize: 52,
            color: "#FFC400",
            textShadow: "0 4px 0 rgba(0,0,0,0.7)",
            opacity: interpolate(f, [sAt + 25, sAt + 35], [0, 1], clamp),
            scale: interpolate(Math.sin((f - sAt) / 5), [-1, 1], [0.96, 1.04]),
          }}
        >
          {cta}
        </div>
        <div
          style={{
            position: "absolute",
            top: 1445,
            width: "100%",
            textAlign: "center",
            fontSize: 32,
            color: "rgba(255,255,255,0.75)",
            opacity: interpolate(f, [sAt + 30, sAt + 40], [0, 1], clamp),
          }}
        >
          {source}
        </div>
        <Watermark />
      </AbsoluteFill>

      <Flash at={sAt} color="#FFE27A" dur={10} />

      {/* Sound */}
      <Audio
        src={staticFile(music ? `music/${music}` : "bed.mp3")}
        trimBefore={music ? 0 : 60}
        volume={(fr) => interpolate(fr, [0, 4, D - 30, D], [0.35, 0.35, 0.35, 0], clamp)}
      />
      <Sequence from={0}>
        <Audio src={staticFile("sfx/whoosh.wav")} volume={0.6} />
      </Sequence>
      {REVEAL.slice(0, 3).map((at) => (
        <Sequence key={at} from={at}>
          <Audio src={staticFile("sfx/whip.wav")} volume={0.5} />
        </Sequence>
      ))}
      <Sequence from={sAt - 2}>
        <Audio src={staticFile("sfx/vine-boom.wav")} volume={0.8} />
      </Sequence>
      <Sequence from={sAt + 4}>
        <Audio src={staticFile("sfx/anime-wow.wav")} volume={0.6} />
      </Sequence>
    </AbsoluteFill>
  );
};
