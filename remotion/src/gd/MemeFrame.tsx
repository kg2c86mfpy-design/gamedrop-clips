import React from "react";
import { AbsoluteFill, interpolate, OffthreadVideo as Video, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Audio } from "@remotion/media";
import { clamp, FONT, popIn } from "./common";

// "Shot-first" meme (24 Nov): the 16:9 game shot is shown WHOLE in the middle (no 9:16 crop, real speed),
// so viewers can actually see what the caption says. Setup text stays on screen above the video the whole
// time; the punch line appears under the video when the shot cuts, then holds ~2.5 s so the joke lands.
export type Shot = { src: string; from: number; rate?: number }; // from = seconds into the source clip
export type MemeFrameProps = {
  setupLines: string[]; // top text, readable on frame 0
  setupShot: Shot;
  punchAt: number; // frame of the cut
  punchShot: Shot;
  punchLines: string[]; // under the video
  punchColor?: string;
  music?: string; // file in public/music/
  musicStart?: number;
  punchMusic?: string;
  punchMusicStart?: number;
  endSfx?: string;
};

const VIDEO_TOP = 560;
const VIDEO_H = 760; // ~4:3 window: shot stays readable, only the far edges are trimmed

const ShotLayer: React.FC<{ shot: Shot }> = ({ shot }) => {
  const src = staticFile(shot.src);
  const trim = Math.round(shot.from * 30);
  return (
    <>
      <Video src={src} muted trimBefore={trim} playbackRate={shot.rate ?? 1}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: "blur(38px) brightness(0.35)", scale: 1.2 }} />
      <Video src={src} muted trimBefore={trim} playbackRate={shot.rate ?? 1}
        style={{ position: "absolute", top: VIDEO_TOP, left: 0, width: 1080, height: VIDEO_H, objectFit: "cover", boxShadow: "0 20px 60px rgba(0,0,0,0.6)" }} />
    </>
  );
};

export const MemeFrame: React.FC<MemeFrameProps> = (p) => {
  const f = useCurrentFrame();
  const P = p.punchAt;
  const pp = popIn(f, P + 2);
  return (
    <AbsoluteFill style={{ backgroundColor: "black", fontFamily: FONT }}>
      <Sequence durationInFrames={P}><ShotLayer shot={p.setupShot} /></Sequence>
      <Sequence from={P}><ShotLayer shot={p.punchShot} /></Sequence>

      {/* setup: on screen from frame 0 to the end */}
      <div style={{ position: "absolute", top: 190, left: 50, right: 50, height: VIDEO_TOP - 190 - 30, display: "flex", flexDirection: "column", justifyContent: "flex-end",
        textAlign: "center", color: "white", fontSize: 68, lineHeight: 1.15, textShadow: "0 4px 14px rgba(0,0,0,0.9)" }}>
        {p.setupLines.map((l) => <div key={l}>{l}</div>)}
      </div>

      {/* punch: under the video after the cut */}
      {f >= P ? (
        <div style={{ position: "absolute", top: VIDEO_TOP + VIDEO_H + 40, left: 50, right: 50, textAlign: "center",
          color: p.punchColor ?? "#FFC400", fontSize: 72, lineHeight: 1.12, textShadow: "0 4px 14px rgba(0,0,0,0.9)",
          opacity: interpolate(pp, [0, 1], [0, 1], clamp), scale: interpolate(pp, [0, 1], [0.8, 1], clamp) }}>
          {p.punchLines.map((l) => <div key={l}>{l}</div>)}
        </div>
      ) : null}
      <div style={{ position: "absolute", top: 1800, width: "100%", textAlign: "center", fontSize: 30, color: "rgba(255,255,255,0.7)" }}>@gamedrop.hq23</div>

      {p.music ? (
        <Audio src={staticFile(`music/${p.music}`)} trimBefore={Math.round((p.musicStart ?? 0) * 30)}
          volume={(fr) => interpolate(fr, [0, P - 3, P], [0.3, 0.3, p.punchMusic ? 0 : 0.3], clamp)} />
      ) : null}
      {p.punchMusic ? (
        <Sequence from={P}>
          <Audio src={staticFile(`music/${p.punchMusic}`)} trimBefore={Math.round((p.punchMusicStart ?? 0) * 30)} volume={(fr) => interpolate(fr, [0, 4], [0, 0.38], clamp)} />
        </Sequence>
      ) : null}
      <Sequence from={P}><Audio src={staticFile("sfx/vine-boom.wav")} volume={0.8} /></Sequence>
      {p.endSfx ? <Sequence from={P + 45}><Audio src={staticFile(`sfx/${p.endSfx}.wav`)} volume={0.8} /></Sequence> : null}
    </AbsoluteFill>
  );
};
