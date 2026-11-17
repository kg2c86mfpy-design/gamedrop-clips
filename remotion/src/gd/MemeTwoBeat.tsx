import React from "react";
import { AbsoluteFill, Easing, interpolate, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Audio } from "@remotion/media";
import { OffthreadVideo as Video } from "remotion";
import { clamp, Flash, FONT, popIn, useShake, Watermark } from "./common";

// Generic props-driven two-beat meme: setup footage + caption -> punch cut (flash, zoom, shake, SFX).
// Hook rule: setup caption is already readable on frame 0. End ~1.5-2 s after the punch.
export type MemeTwoBeatProps = {
  setupSrc: string;
  setupTrim?: number; // frames
  setupRate?: number;
  setupPos?: string; // objectPosition
  setupLines: string[];
  setupLabel?: string; // small line under the caption
  punchAt: number; // frame of the cut
  punchSrc: string;
  punchTrim?: number;
  punchPos?: string;
  punchRate?: number;
  punchLines: string[];
  punchColor?: string;
  music?: boolean | string; // false = SFX only; true = bed.mp3; string = file in public/music/ (e.g. "comedy_lurking_sloth.mp3")
  musicStart?: number; // seconds into the track
  punchMusic?: string; // optional beat switch: a 2nd track (public/music/) that kicks in on the punch
  punchMusicStart?: number;
  endSfx?: string; // e.g. "bruh"
};

const Bubble: React.FC<{ lines: string[]; at: number; top: number; size: number; dark?: boolean }> = ({ lines, at, top, size, dark }) => {
  const f = useCurrentFrame();
  const p = popIn(f, at);
  return (
    <div
      style={{
        position: "absolute",
        top,
        left: 60,
        right: 60,
        padding: "26px 30px",
        borderRadius: 22,
        backgroundColor: dark ? "rgba(0,0,0,0.8)" : "rgba(255,255,255,0.96)",
        color: dark ? "#FFC400" : "#111",
        fontFamily: FONT,
        fontSize: size,
        lineHeight: 1.16,
        textAlign: "center",
        scale: interpolate(p, [0, 1], [0.75, 1], clamp),
        boxShadow: "0 10px 30px rgba(0,0,0,0.45)",
      }}
    >
      {lines.map((l) => (
        <div key={l}>{l}</div>
      ))}
    </div>
  );
};

export const MemeTwoBeat: React.FC<MemeTwoBeatProps> = (p) => {
  const f = useCurrentFrame();
  const P = p.punchAt;
  const shake = useShake(P + 1, 16, 30);
  const cover = { width: "100%", height: "100%", objectFit: "cover" as const };
  return (
    <AbsoluteFill style={{ backgroundColor: "black", fontFamily: FONT }}>
      <AbsoluteFill style={{ translate: shake }}>
        <Sequence durationInFrames={P}>
          <Video
            src={staticFile(p.setupSrc)}
            muted
            trimBefore={p.setupTrim ?? 0}
            playbackRate={p.setupRate ?? 1}
            style={{ ...cover, objectPosition: p.setupPos ?? "50% 50%", scale: interpolate(f, [0, P], [1.0, 1.15], clamp) }}
          />
          <Bubble lines={p.setupLines} at={-9} top={230} size={64} />
          {p.setupLabel ? (
            <div
              style={{
                position: "absolute",
                top: 640,
                width: "100%",
                textAlign: "center",
                fontSize: 56,
                color: "white",
                textShadow: "0 4px 0 rgba(0,0,0,0.85)",
                opacity: interpolate(f, [30, 36], [0, 1], clamp),
              }}
            >
              {p.setupLabel}
            </div>
          ) : null}
        </Sequence>
        <Sequence from={P}>
          <Video
            src={staticFile(p.punchSrc)}
            muted
            trimBefore={p.punchTrim ?? 0}
            playbackRate={p.punchRate ?? 0.6}
            style={{
              ...cover,
              objectPosition: p.punchPos ?? "50% 50%",
              filter: "brightness(1.3) contrast(1.15) saturate(1.2)",
              scale: interpolate(f, [P, P + 6, P + 120], [1.7, 1.2, 1.32], { ...clamp, easing: Easing.bezier(0.16, 1, 0.3, 1) }),
            }}
          />
          <Bubble lines={p.punchLines} at={2} top={1100} size={76} dark />
        </Sequence>
        <Watermark />
      </AbsoluteFill>
      <Flash at={P} color={p.punchColor ?? "#FF4D2E"} dur={9} />

      {p.music ? (
        <Audio
          src={staticFile(typeof p.music === "string" ? `music/${p.music}` : "bed.mp3")}
          trimBefore={Math.round((p.musicStart ?? (typeof p.music === "string" ? 0 : 1)) * 30)}
          volume={(fr) => interpolate(fr, [0, P - 3, P], [0.32, 0.32, 0], clamp)}
        />
      ) : null}
      {p.music && p.punchMusic ? (
        <Sequence from={P}>
          <Audio
            src={staticFile(`music/${p.punchMusic}`)}
            trimBefore={Math.round((p.punchMusicStart ?? 0) * 30)}
            volume={(fr) => interpolate(fr, [0, 4], [0, 0.4], clamp)}
          />
        </Sequence>
      ) : null}
      <Audio src={staticFile("sfx/whoosh.wav")} volume={0.5} />
      <Sequence from={P - 6}>
        <Audio src={staticFile("sfx/record-scratch.wav")} volume={0.7} />
      </Sequence>
      <Sequence from={P}>
        <Audio src={staticFile("sfx/vine-boom.wav")} volume={1} />
      </Sequence>
      <Sequence from={P + 38}>
        <Audio src={staticFile(`sfx/${p.endSfx ?? "bruh"}.wav`)} volume={0.9} />
      </Sequence>
    </AbsoluteFill>
  );
};
