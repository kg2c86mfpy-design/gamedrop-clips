import React from "react";
import { Composition } from "remotion";
import { TierList, TierListProps } from "./gd/TierList";
import { MemeLastQuest, MemeWarzoneDrop } from "./gd/Memes";

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
    </>
  );
};
