import React from "react";
import { Composition } from "remotion";
import { TierList, TierListProps } from "./gd/TierList";
import { MemeLastQuest, MemeWarzoneDrop } from "./gd/Memes";
import { MemeTwoBeat, MemeTwoBeatProps } from "./gd/MemeTwoBeat";

const dmzDiscret: MemeTwoBeatProps = {
  setupSrc: "dmz_sneak.mp4",
  setupTrim: 30,
  setupRate: 0.7,
  setupPos: "55% 50%",
  setupLines: ["Le squad en DMZ :", "« ce soir on joue discret,", "on extrait tranquille »"],
  setupLabel: "Le plan parfait 🤫",
  punchAt: 90,
  punchSrc: "dmz_fight.mp4",
  punchPos: "40% 50%",
  punchTrim: 3,
  punchRate: 0.35,
  punchLines: ["30 secondes", "plus tard :"],
  music: true,
};

const soloTiers: TierListProps = {
  title: ["Meilleure classe", "pour leveler en solo"],
  subtitle: "WoW Forever",
  tiers: [
    { label: "S", color: "#E63946", items: ["Chasseur", "Mage"] },
    { label: "A", color: "#F48C06", items: ["Démoniste", "Paladin"] },
    { label: "B", color: "#F0C828", items: ["Druide", "Chaman", "Voleur"] },
    { label: "C", color: "#50AA5A", items: ["Guerrier", "Prêtre"] },
  ],
  cta: "Ta classe est dans quel tier ?",
  source: "D'après les guides de la bêta (niv. 30)",
  bg: "wow_bg.mp4",
};

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition id="TierListSolo" component={TierList} durationInFrames={390} fps={30} width={1080} height={1920} defaultProps={soloTiers} />
      <Composition id="MemeLastQuest" component={MemeLastQuest} durationInFrames={300} fps={30} width={1080} height={1920} />
      <Composition id="MemeWarzoneDrop" component={MemeWarzoneDrop} durationInFrames={225} fps={30} width={1080} height={1920} />
      <Composition id="MemeDmzDiscret" component={MemeTwoBeat} durationInFrames={165} fps={30} width={1080} height={1920} defaultProps={dmzDiscret} />
      <Composition id="MemeDmzDiscretNoMusic" component={MemeTwoBeat} durationInFrames={165} fps={30} width={1080} height={1920} defaultProps={{ ...dmzDiscret, music: false }} />
    </>
  );
};
