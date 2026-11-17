import React from "react";
import { AbsoluteFill, Easing, Img, interpolate, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Audio } from "@remotion/media";
import { OffthreadVideo as Video } from "remotion";
import { clamp, Flash, FONT, popIn, useShake, Watermark } from "./common";

// "Two waits" meme (format of the viral "13 years of waiting / 9 months of waiting" post).
// Stacked 16:9 panels: game footage on top (cycling clips), a still photo below (AI-generated,
// fictional person only). Both black-box captions readable on frame 0. Punch: flash, the photo
// zooms full-screen onto `focus` with shake + boom, big caption; ends ~1.5 s later.
export type Clip = { src: string; trim?: number; rate?: number; len: number; pos?: string };
export type TwoWaitsProps = {
  photo: string; // public/ path, 16:9
  focus: { x: number; y: number }; // punch zoom target in % of the photo
  topClips: Clip[];
  topLabel: string[];
  bottomLabel: string[];
  header?: string;
  punchAt: number;
  punchLines: string[];
  music?: string; // public/music file, cut at the punch
};

const PANEL_H = 608; // 1080 x 608 = 16:9
const TOP_Y = 330;
const BOT_Y = TOP_Y + PANEL_H + 150;

const Label: React.FC<{ text: string[]; size: number; rot: number; at: number; style?: React.CSSProperties }> = ({ text, size, rot, at, style }) => {
  const f = useCurrentFrame();
  const p = popIn(f, at);
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        rotate: `${rot}deg`,
        scale: interpolate(p, [0, 1], [0.6, 1], clamp),
        ...style,
      }}
    >
      {text.map((l, i) => (
        <div
          key={i}
          style={{
            background: "black",
            color: "white",
            fontFamily: FONT,
            fontSize: size,
            lineHeight: 1.08,
            letterSpacing: -1.5,
            padding: "4px 26px 12px",
            marginTop: i ? -4 : 0,
            whiteSpace: "nowrap",
            boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
          }}
        >
          {l}
        </div>
      ))}
    </div>
  );
};

export const TwoWaits: React.FC<TwoWaitsProps> = (p) => {
  const f = useCurrentFrame();
  const P = p.punchAt;
  const shake = useShake(P + 1, 18, 30);
  const out = interpolate(f, [P, P + 3], [1, 0], clamp);
  // the photo panel grows to full screen at the punch
  const g = interpolate(f, [P, P + 6], [0, 1], { ...clamp, easing: Easing.bezier(0.16, 1, 0.3, 1) });
  const panelTop = interpolate(g, [0, 1], [BOT_Y, 0]);
  const panelH = interpolate(g, [0, 1], [PANEL_H, 1920]);
  const photoZoom =
    f < P ? interpolate(f, [0, P], [1.0, 1.1], clamp) : interpolate(f, [P, P + 6, P + 60], [1.1, 1.22, 1.3], { ...clamp, easing: Easing.bezier(0.16, 1, 0.3, 1) });
  let acc = 0;
  return (
    <AbsoluteFill style={{ backgroundColor: "#0b0b0d", fontFamily: FONT }}>
      {/* soft blurred backdrop so the frame never looks empty */}
      <Img src={staticFile(p.photo)} style={{ position: "absolute", width: "100%", height: "100%", objectFit: "cover", filter: "blur(40px) brightness(0.35)", scale: 1.2 }} />
      <AbsoluteFill style={{ translate: shake }}>
        {/* top: game footage */}
        <div style={{ position: "absolute", top: TOP_Y, left: 0, width: 1080, height: PANEL_H, overflow: "hidden", opacity: out }}>
          {p.topClips.map((c, i) => {
            const from = acc;
            acc += c.len;
            return (
              <Sequence key={i} from={from} durationInFrames={c.len} layout="none">
                <Video
                  src={staticFile(c.src)}
                  muted
                  trimBefore={c.trim ?? 0}
                  playbackRate={c.rate ?? 1}
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: c.pos ?? "50% 50%",
                    scale: interpolate(f, [from, from + c.len], [1.12, 1.0], clamp),
                  }}
                />
              </Sequence>
            );
          })}
        </div>
        {/* bottom: photo (becomes full screen at the punch) */}
        <div style={{ position: "absolute", top: panelTop, left: 0, width: 1080, height: panelH, overflow: "hidden" }}>
          <Img
            src={staticFile(p.photo)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: `${p.focus.x}% ${p.focus.y}%`,
              scale: photoZoom,
              transformOrigin: `${p.focus.x}% ${p.focus.y}%`,
              filter: f >= P ? "contrast(1.1) saturate(1.1)" : undefined,
            }}
          />
        </div>
        <div style={{ opacity: out }}>
          {p.header ? (
            <div style={{ position: "absolute", top: 170, left: 40, right: 40, textAlign: "center", color: "white", fontSize: 58, textShadow: "0 4px 0 rgba(0,0,0,0.9)" }}>
              {p.header}
            </div>
          ) : null}
          <Label text={p.topLabel} size={88} rot={-2} at={-12} style={{ top: TOP_Y + PANEL_H - 70 - (p.topLabel.length - 1) * 100 }} />
          <Label text={p.bottomLabel} size={88} rot={2} at={-12} style={{ top: BOT_Y + PANEL_H - 70 - (p.bottomLabel.length - 1) * 100 }} />
        </div>
        <Sequence from={P}>
          <Label text={p.punchLines} size={96} rot={-1.5} at={2} style={{ top: 1360 }} />
        </Sequence>
        {f >= P ? <Watermark /> : null}
      </AbsoluteFill>
      <Flash at={P} color="white" dur={8} />

      {p.music ? <Audio src={staticFile(`music/${p.music}`)} volume={(fr) => interpolate(fr, [0, P - 6, P - 1], [0.4, 0.4, 0], clamp)} /> : null}
      <Audio src={staticFile("sfx/whoosh.wav")} volume={0.45} />
      <Sequence from={P - 8}>
        <Audio src={staticFile("sfx/record-scratch.wav")} volume={0.75} />
      </Sequence>
      <Sequence from={P}>
        <Audio src={staticFile("sfx/vine-boom.wav")} volume={1} />
      </Sequence>
    </AbsoluteFill>
  );
};
