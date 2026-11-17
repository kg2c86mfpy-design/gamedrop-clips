import React from "react";
import { AbsoluteFill, Audio, interpolate, Loop, OffthreadVideo, staticFile, useVideoConfig } from "remotion";
import { FONT, clamp, Watermark } from "./common";

// "📍 Lieu, date" series: seamless AI clip looped, location tag, watermark, optional music.
export type LocationPinProps = {
  src: string; // clip in public/
  clipFrames: number; // usable length of the clip in frames
  place: string; // e.g. "Orgrimmar"
  date: string; // e.g. "4 novembre 2026, 23:59"
  music?: string; // file in public/music/, omit for the silent TikTok/IG export
  musicStart?: number;
  aiLabel?: boolean;
};

const Pin: React.FC = () => (
  <svg width="44" height="44" viewBox="0 0 24 24" style={{ marginRight: 10, flexShrink: 0 }}>
    <path d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7z" fill="#E53935" />
    <circle cx="12" cy="9" r="2.6" fill="#fff" />
  </svg>
);

export const LocationPin: React.FC<LocationPinProps> = ({ src, clipFrames, place, date, music, musicStart, aiLabel = true }) => {
  const { durationInFrames: D } = useVideoConfig();
  const tag: React.CSSProperties = {
    fontFamily: FONT, color: "#fff", background: "rgba(0,0,0,0.78)", padding: "6px 18px", borderRadius: 10,
  };
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      {/* src is pre-made seamless (ffmpeg crossfade of its end into its start), so a hard loop is invisible */}
      <Loop durationInFrames={clipFrames}>
        <OffthreadVideo src={staticFile(src)} muted style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </Loop>
      <AbsoluteFill style={{ justifyContent: "flex-start", alignItems: "center", paddingTop: 1180 }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
          <div style={{ ...tag, display: "flex", alignItems: "center", fontSize: 54 }}>
            <Pin />
            {place}
          </div>
          <div style={{ ...tag, fontSize: 44 }}>{date}</div>
        </div>
      </AbsoluteFill>
      {aiLabel ? (
        <div style={{ position: "absolute", left: 28, bottom: 40, fontFamily: FONT, fontSize: 24, color: "rgba(255,255,255,0.7)" }}>
          Contenu généré par IA
        </div>
      ) : null}
      <Watermark />
      {music ? (
        <Audio
          src={staticFile(`music/${music}`)}
          trimBefore={Math.round((musicStart ?? 0) * 30)}
          volume={(fr) => interpolate(fr, [0, 6, D - 20, D], [0, 0.45, 0.45, 0], clamp)}
        />
      ) : null}
    </AbsoluteFill>
  );
};
