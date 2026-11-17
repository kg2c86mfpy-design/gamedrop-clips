import React from "react";
import { AbsoluteFill, Easing, interpolate, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Audio } from "@remotion/media";
import { OffthreadVideo as Video } from "remotion";
import { clamp, Flash, FONT, popIn, useShake, Watermark } from "./common";

const Caption: React.FC<{ lines: string[]; at: number; top?: number; size?: number; dark?: boolean }> = ({
  lines,
  at,
  top = 230,
  size = 66,
  dark = false,
}) => {
  const f = useCurrentFrame();
  const p = popIn(f, at);
  return (
    <div
      style={{
        position: "absolute",
        top,
        left: 70,
        right: 70,
        padding: "26px 30px",
        borderRadius: 22,
        backgroundColor: dark ? "rgba(0,0,0,0.78)" : "rgba(255,255,255,0.96)",
        color: dark ? "#FFC400" : "#111",
        fontFamily: FONT,
        fontSize: size,
        lineHeight: 1.18,
        textAlign: "center",
        opacity: interpolate(f, [at, at + 3], [0, 1], clamp),
        scale: interpolate(p, [0, 1], [0.6, 1], clamp),
        boxShadow: "0 10px 30px rgba(0,0,0,0.45)",
      }}
    >
      {lines.map((l) => (
        <div key={l}>{l}</div>
      ))}
    </div>
  );
};

// WoW: "juste une dernière quête"
export const MemeLastQuest: React.FC = () => {
  const f = useCurrentFrame();
  const PUNCH = 165;
  const shake = useShake(PUNCH, 12, 20);
  // clock 23:00 -> 04:00 during fast-forward 70..PUNCH
  const minutes = Math.round(interpolate(f, [70, PUNCH], [23 * 60, 28 * 60], clamp));
  const hh = String(Math.floor(minutes / 60) % 24).padStart(2, "0");
  const mm = String(minutes % 60).padStart(2, "0");
  const ff = f >= 70 && f < PUNCH;
  return (
    <AbsoluteFill style={{ backgroundColor: "black", fontFamily: FONT }}>
      <AbsoluteFill style={{ translate: shake }}>
        <Sequence durationInFrames={70}>
          <Video src={staticFile("wow_quest.mp4")} muted style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "30% 50%" }} />
        </Sequence>
        <Sequence from={70} durationInFrames={PUNCH - 70}>
          <Video
            src={staticFile("wow_quest.mp4")}
            muted
            trimBefore={60}
            playbackRate={3}
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "30% 50%", filter: "saturate(1.3) contrast(1.1)" }}
          />
        </Sequence>
        <Sequence from={PUNCH}>
          <Video
            src={staticFile("wow_quest.mp4")}
            muted
            trimBefore={250}
            playbackRate={0.4}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "30% 50%",
              filter: "grayscale(0.5) brightness(0.7)",
              scale: interpolate(f, [PUNCH, PUNCH + 8, PUNCH + 135], [1.0, 1.35, 1.45], clamp),
            }}
          />
        </Sequence>

        <Caption lines={["Moi à 23h :", "« juste une dernière", "quête et je dors »"]} at={-9} />

        {/* HUD: clock + level */}
        <div
          style={{
            position: "absolute",
            top: 640,
            right: 80,
            padding: "14px 26px",
            borderRadius: 16,
            backgroundColor: "rgba(0,0,0,0.7)",
            color: "white",
            fontSize: 58,
            opacity: interpolate(f, [20, 26], [0, 1], clamp),
          }}
        >
          {hh}:{mm}
        </div>
        <div
          style={{
            position: "absolute",
            top: 740,
            right: 80,
            padding: "10px 22px",
            borderRadius: 14,
            backgroundColor: f >= PUNCH ? "#E63946" : "rgba(0,0,0,0.7)",
            color: "white",
            fontSize: 44,
            opacity: interpolate(f, [26, 32], [0, 1], clamp),
          }}
        >
          Niveau 23
        </div>
        {ff ? (
          <div
            style={{
              position: "absolute",
              top: 640,
              left: 80,
              fontSize: 64,
              color: "white",
              textShadow: "0 4px 0 rgba(0,0,0,0.7)",
              opacity: Math.floor(f / 6) % 2 === 0 ? 1 : 0.4,
            }}
          >
            x3 &gt;&gt;
          </div>
        ) : null}

        <Sequence from={PUNCH}>
          <Caption lines={["4h du matin.", "Toujours niveau 23."]} at={2} top={1120} size={74} dark />
        </Sequence>
        <Watermark />
      </AbsoluteFill>
      <Flash at={PUNCH} dur={7} />

      <Audio src={staticFile("bed.mp3")} trimBefore={30} volume={(fr) => interpolate(fr, [0, 8, PUNCH - 3, PUNCH], [0, 0.3, 0.3, 0], clamp)} />
      <Sequence from={4}>
        <Audio src={staticFile("sfx/whoosh.wav")} volume={0.5} />
      </Sequence>
      <Sequence from={PUNCH - 4}>
        <Audio src={staticFile("sfx/record-scratch.wav")} volume={0.8} />
      </Sequence>
      <Sequence from={PUNCH + 30}>
        <Audio src={staticFile("sfx/bruh.wav")} volume={0.9} />
      </Sequence>
    </AbsoluteFill>
  );
};

// Warzone: "on atterrit tous ensemble"
export const MemeWarzoneDrop: React.FC = () => {
  const f = useCurrentFrame();
  const CUT = 78;
  const shake = useShake(CUT + 2, 16, 28);
  return (
    <AbsoluteFill style={{ backgroundColor: "black", fontFamily: FONT }}>
      <AbsoluteFill style={{ translate: shake }}>
        <Sequence durationInFrames={CUT}>
          <Video
            src={staticFile("wz_drop.mp4")}
            muted
            trimBefore={90}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "55% 50%",
              scale: interpolate(f, [0, CUT], [1.05, 1.18], clamp),
            }}
          />
          <Caption lines={["Le plan : on atterrit", "tous ensemble à Hajin"]} at={-9} />
          <div
            style={{
              position: "absolute",
              top: 560,
              width: "100%",
              textAlign: "center",
              fontSize: 54,
              color: "white",
              textShadow: "0 4px 0 rgba(0,0,0,0.8)",
              opacity: interpolate(f, [28, 34], [0, 1], clamp),
            }}
          >
            Le squad, confiant :
          </div>
        </Sequence>
        <Sequence from={CUT}>
          <Video
            src={staticFile("wz_boom.mp4")}
            muted
            playbackRate={0.5}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              scale: interpolate(f, [CUT, CUT + 6, CUT + 150], [1.6, 1.15, 1.25], { ...clamp, easing: Easing.bezier(0.16, 1, 0.3, 1) }),
            }}
          />
          <Caption lines={["Moi, 3 secondes", "après l'atterrissage"]} at={3} size={72} dark />
        </Sequence>
        <Watermark />
      </AbsoluteFill>
      <Flash at={CUT} color="#FF4D2E" dur={9} />

      <Sequence from={4}>
        <Audio src={staticFile("sfx/whoosh.wav")} volume={0.5} />
      </Sequence>
      <Sequence from={CUT - 6}>
        <Audio src={staticFile("sfx/whip.wav")} volume={0.6} />
      </Sequence>
      <Sequence from={CUT}>
        <Audio src={staticFile("sfx/vine-boom.wav")} volume={1} />
      </Sequence>
      <Sequence from={CUT + 40}>
        <Audio src={staticFile("sfx/bruh.wav")} volume={0.9} />
      </Sequence>
    </AbsoluteFill>
  );
};
