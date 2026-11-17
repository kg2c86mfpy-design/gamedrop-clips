import React from "react";
import { AbsoluteFill, Audio, interpolate, Loop, OffthreadVideo, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { loadFont } from "@remotion/fonts";

loadFont({ family: "CinzelGD", url: staticFile("Cinzel.ttf"), weight: "400 900" });
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
  look?: "box" | "fantasy"; // fantasy = small gold engraved text in the sky, crowd left clear
  musicEnd?: number; // frame where the build track fades out (suspense gap)
  hitAt?: number; // frame of the reveal: 2nd track + boom
  hitMusic?: string;
  hitMusicStart?: number; // seconds into hitMusic that land on hitAt
  flashEnd?: boolean; // white flash on the last frames (cliffhanger before the loop)
  soundtrack?: string; // full pre-mixed audio in public/music/ (overrides music/hitMusic)
  question?: string; // engagement question shown near the end
  questionAt?: number;
};

const Pin: React.FC = () => (
  <svg width="44" height="44" viewBox="0 0 24 24" style={{ marginRight: 10, flexShrink: 0 }}>
    <path d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7z" fill="#E53935" />
    <circle cx="12" cy="9" r="2.6" fill="#fff" />
  </svg>
);

export const LocationPin: React.FC<LocationPinProps> = ({ src, clipFrames, place, date, music, musicStart, aiLabel = true, look = "box", musicEnd, hitAt, hitMusic, hitMusicStart, flashEnd, soundtrack, question, questionAt }) => {
  const { durationInFrames: D } = useVideoConfig();
  const f = useCurrentFrame();
  const gold: React.CSSProperties = {
    fontFamily: "CinzelGD", fontWeight: 800, letterSpacing: 3, textAlign: "center",
    background: "linear-gradient(180deg,#FFF3C4 0%,#F2C14E 45%,#B07A1E 100%)", WebkitBackgroundClip: "text", color: "transparent",
    filter: "drop-shadow(0 3px 2px rgba(0,0,0,0.95)) drop-shadow(0 0 14px rgba(0,0,0,0.8))",
  };
  const tag: React.CSSProperties = {
    fontFamily: FONT, color: "#fff", background: "rgba(0,0,0,0.78)", padding: "6px 18px", borderRadius: 10,
  };
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      {/* src is pre-made seamless (ffmpeg crossfade of its end into its start), so a hard loop is invisible */}
      <Loop durationInFrames={clipFrames}>
        <OffthreadVideo src={staticFile(src)} muted style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </Loop>
      {look === "fantasy" ? (
        <AbsoluteFill style={{ justifyContent: "flex-start", alignItems: "center", paddingTop: 215 }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Pin />
              <div style={{ ...gold, fontSize: 64 }}>{place}</div>
            </div>
            <div style={{ ...gold, fontSize: 34, fontWeight: 600, marginTop: 2 }}>{date}</div>
          </div>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill style={{ justifyContent: "flex-start", alignItems: "center", paddingTop: 1180 }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
            <div style={{ ...tag, display: "flex", alignItems: "center", fontSize: 54 }}>
              <Pin />
              {place}
            </div>
            <div style={{ ...tag, fontSize: 44 }}>{date}</div>
          </div>
        </AbsoluteFill>
      )}
      {question && questionAt !== undefined ? (
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", paddingTop: 260 }}>
          <div
            style={{
              ...gold, fontSize: 92, lineHeight: 1.05,
              opacity: interpolate(f, [questionAt, questionAt + 8], [0, 1], clamp),
              transform: `scale(${interpolate(f, [questionAt, questionAt + 10], [1.25, 1], clamp)})`,
            }}
          >
            {question}
          </div>
        </AbsoluteFill>
      ) : null}
      {soundtrack ? <Audio src={staticFile(`music/${soundtrack}`)} volume={1} /> : null}
      {flashEnd ? <AbsoluteFill style={{ background: "#FFF6DC", opacity: interpolate(f, [D - 9, D - 1], [0, 1], clamp) }} /> : null}
      {aiLabel ? (
        <div style={{ position: "absolute", left: 28, bottom: 40, fontFamily: FONT, fontSize: 24, color: "rgba(255,255,255,0.7)" }}>
          Contenu généré par IA
        </div>
      ) : null}
      <Watermark />
      {music && !soundtrack ? (
        <Audio
          src={staticFile(`music/${music}`)}
          trimBefore={Math.round((musicStart ?? 0) * 30)}
          volume={(fr) =>
            musicEnd
              ? interpolate(fr, [0, 4, musicEnd - 8, musicEnd], [0, 0.55, 0.55, 0.04], clamp)
              : interpolate(fr, [0, 6, D - 20, D], [0, 0.45, 0.45, 0], clamp)
          }
        />
      ) : null}
      {music && hitAt !== undefined && hitMusic ? (
        <Sequence from={hitAt}>
          <Audio src={staticFile(`music/${hitMusic}`)} trimBefore={Math.round((hitMusicStart ?? 0) * 30)} volume={0.6} />
        </Sequence>
      ) : null}
    </AbsoluteFill>
  );
};
