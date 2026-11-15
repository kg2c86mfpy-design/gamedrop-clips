import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, staticFile, Easing } from "remotion";
import { loadFont } from "@remotion/fonts";

export const FONT = "PoppinsGD";
loadFont({ family: FONT, url: staticFile("Poppins-Bold.ttf"), weight: "700" });

export const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// Screen shake that starts at `at` and decays over `dur` frames
export const useShake = (at: number, dur = 10, amp = 18) => {
  const f = useCurrentFrame();
  const t = f - at;
  if (t < 0 || t > dur) return "0px 0px";
  const k = 1 - t / dur;
  return `${Math.sin(t * 2.7) * amp * k}px ${Math.cos(t * 3.3) * amp * k}px`;
};

export const Flash: React.FC<{ at: number; color?: string; dur?: number }> = ({ at, color = "white", dur = 8 }) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill
      style={{
        backgroundColor: color,
        opacity: interpolate(f, [at, at + 1, at + dur], [0, 0.85, 0], clamp),
        pointerEvents: "none",
      }}
    />
  );
};

export const Watermark: React.FC = () => (
  <div
    style={{
      position: "absolute",
      bottom: 300,
      width: "100%",
      textAlign: "center",
      fontFamily: FONT,
      fontSize: 34,
      color: "rgba(255,255,255,0.55)",
      textShadow: "0 2px 6px rgba(0,0,0,0.8)",
    }}
  >
    @gamedrop.hq23
  </div>
);

export const popIn = (f: number, at: number) =>
  interpolate(f, [at, at + 12], [0, 1], { ...clamp, easing: Easing.bezier(0.34, 1.56, 0.64, 1) });
