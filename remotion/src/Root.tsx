import React from "react";
import { Composition } from "remotion";
import { TierList, TierListProps } from "./gd/TierList";
import { MemeLastQuest, MemeWarzoneDrop } from "./gd/Memes";
import { TwoWaits, TwoWaitsProps } from "./gd/TwoWaits";
import { LocationPin } from "./gd/LocationPin";
import { MemeTwoBeat, MemeTwoBeatProps } from "./gd/MemeTwoBeat";
import { TimeLadder, TimeLadderProps } from "./gd/TimeLadder";

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


const wowAlliance: MemeTwoBeatProps = {
  setupSrc: "dur_orgri.mp4",
  setupTrim: 42,
  setupRate: 0.75,
  setupPos: "50% 50%",
  setupLines: ["Ton pote :", "« je reroll Alliance,", "c'est plus chill »"],
  setupLabel: "La guilde Horde :",
  punchAt: 100,
  punchSrc: "lo_orcs.mp4",
  punchTrim: 114,
  punchRate: 0.55,
  punchPos: "38% 50%",
  punchLines: ["« on va juste", "discuter »"],
  punchColor: "#C8102E",
  music: true,
};

const wowTankPull: MemeTwoBeatProps = {
  setupSrc: "lo_dungeon.mp4",
  setupTrim: 9,
  setupRate: 0.8,
  setupPos: "45% 50%",
  setupLines: ["Le tank :", "« t'inquiète, je pull", "tout, ça passe »"],
  setupLabel: "Le heal : …",
  punchAt: 100,
  punchSrc: "lo_boss.mp4",
  punchTrim: 92,
  punchRate: 0.5,
  punchPos: "58% 50%",
  punchLines: ["Ça passe pas."],
  music: true,
};

const gta6Soiree: TimeLadderProps = {
  title: ["Ma 1re soirée", "sur GTA 6 :"],
  steps: [
    { time: "21h00", text: "« juste 1h ce soir »", src: "gta_road.mp4", rate: 1 },
    { time: "21h30", text: "je regarde le coucher de soleil", src: "gta_sunset.mp4", rate: 0.45 },
    { time: "22h45", text: "toujours pas fait la 1re mission", src: "gta_iguana.mp4", rate: 0.5, pos: "60% 50%" },
    { time: "01h10", text: "voiture « empruntée », la police débarque", src: "gta_cops.mp4", rate: 0.6, pos: "62% 50%" },
    { time: "04h00", text: "« allez, une dernière »", src: "gta_night.mp4", rate: 0.8, pos: "62% 50%" },
  ],
  at: [0, 45, 90, 135, 185],
  music: true,
};

const wowRaccourci: MemeTwoBeatProps = {
  setupSrc: "lo_t243.mp4", setupTrim: 0, setupRate: 0.8, setupPos: "50% 50%",
  setupLines: ["Moi niveau 12 :", "« je coupe par là,", "ça ira plus vite »"],
  punchAt: 95, punchSrc: "lo_t583.mp4", punchTrim: 0, punchRate: 0.6, punchPos: "35% 50%",
  punchLines: ["Le raccourci :"], punchColor: "#7B2CBF",
  music: "comedy_spring_chicken.mp3", punchMusic: "epic_night_attack.mp3",
};
const wowCoucher: MemeTwoBeatProps = {
  setupSrc: "lo_t143.mp4", setupTrim: 0, setupRate: 0.8, setupPos: "50% 50%",
  setupLines: ["Ma copine :", "« tu viens te coucher ? »"],
  punchAt: 90, punchSrc: "lo_t43.mp4", punchTrim: 92, punchRate: 0.5, punchPos: "50% 50%",
  punchLines: ["Moi : « j'arrive,", "encore 1 donjon »"], punchColor: "#5A189A",
  music: "comedy_lurking_sloth.mp3", punchMusic: "epic_heroic_adventure.mp3",
};


// 18 Nov 12:30 — "13 ans d'attente / 9 mois d'attente" (baby = AI-generated, fictional; GTA = official launch trailer)
const deuxAttentes: TwoWaitsProps = {
  photo: "baby.png",
  focus: { x: 49, y: 36 },
  topClips: [
    { src: "gta_lowrider.mp4", rate: 0.9, len: 36 },
    { src: "gta_beach.mp4", rate: 0.9, len: 30 },
    { src: "gta_sunset.mp4", rate: 0.85, len: 24 },
  ],
  header: "Ce mois-ci :",
  topLabel: ["GTA 6 :", "13 ans d'attente…"],
  bottomLabel: ["Bébé :", "9 mois d'attente…"],
  punchAt: 90,
  punchLines: ["Des choix vont", "devoir être faits."],
  music: "urban_backbeat.mp3",
};

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition id="TierListSolo" component={TierList} durationInFrames={390} fps={30} width={1080} height={1920} defaultProps={soloTiers} />
      <Composition id="MemeLastQuest" component={MemeLastQuest} durationInFrames={300} fps={30} width={1080} height={1920} />
      <Composition id="MemeWarzoneDrop" component={MemeWarzoneDrop} durationInFrames={225} fps={30} width={1080} height={1920} />
      <Composition id="MemeDmzDiscret" component={MemeTwoBeat} durationInFrames={165} fps={30} width={1080} height={1920} defaultProps={dmzDiscret} />
      <Composition id="MemeDmzDiscretNoMusic" component={MemeTwoBeat} durationInFrames={165} fps={30} width={1080} height={1920} defaultProps={{ ...dmzDiscret, music: false }} />
      <Composition id="MemeWowAlliance" component={MemeTwoBeat} durationInFrames={160} fps={30} width={1080} height={1920} defaultProps={wowAlliance} />
      <Composition id="MemeWowTankPull" component={MemeTwoBeat} durationInFrames={160} fps={30} width={1080} height={1920} defaultProps={wowTankPull} />
      <Composition id="DemoBeatSwitch" component={MemeTwoBeat} durationInFrames={160} fps={30} width={1080} height={1920} defaultProps={{ ...wowAlliance, music: "comedy_mischief_loop.mp3", punchMusic: "epic_boss_battle.mp3" }} />
      <Composition id="MemeWowRaccourci" component={MemeTwoBeat} durationInFrames={150} fps={30} width={1080} height={1920} defaultProps={wowRaccourci} />
      <Composition id="MemeWowCoucher" component={MemeTwoBeat} durationInFrames={145} fps={30} width={1080} height={1920} defaultProps={wowCoucher} />
      <Composition id="PinOrgrimmarSilent" component={LocationPin} durationInFrames={139} fps={30} width={1080} height={1920} defaultProps={{ src: "ai_orgrimmar_launch.mp4", clipFrames: 139, place: "Orgrimmar", date: "4 novembre 2026, 23:59" }} />
      <Composition id="PinOrgrimmarMusic" component={LocationPin} durationInFrames={139} fps={30} width={1080} height={1920} defaultProps={{ src: "ai_orgrimmar_launch.mp4", clipFrames: 139, place: "Orgrimmar", date: "4 novembre 2026, 23:59", music: "epic_honor_bound.mp3" }} />
      <Composition id="PinOrgrimmarV2Silent" component={LocationPin} durationInFrames={177} fps={30} width={1080} height={1920} defaultProps={{ src: "ai_orgrimmar_build.mp4", clipFrames: 177, place: "Orgrimmar", date: "4 novembre 2026 · 23:59", look: "fantasy", flashEnd: true }} />
      <Composition id="PinOrgrimmarV2Music" component={LocationPin} durationInFrames={177} fps={30} width={1080} height={1920} defaultProps={{ src: "ai_orgrimmar_build.mp4", clipFrames: 177, place: "Orgrimmar", date: "4 novembre 2026 · 23:59", look: "fantasy", flashEnd: true, music: "epic_kings_trailer.mp3", musicStart: 153.1, musicEnd: 99, hitAt: 105, hitMusic: "epic_blockbuster_2.mp3", hitMusicStart: 66.7 }} />
      <Composition id="TierListSoloV2" component={TierList} durationInFrames={225} fps={30} width={1080} height={1920} defaultProps={{ ...soloTiers, reveal: [30, 60, 90, 150] }} />
      <Composition id="MemeWarzoneDropV2" component={MemeWarzoneDrop} durationInFrames={145} fps={30} width={1080} height={1920} />
    <Composition id="ListGta6Soiree" component={TimeLadder} durationInFrames={230} fps={30} width={1080} height={1920} defaultProps={gta6Soiree} />
      <Composition id="MemeDeuxAttentes" component={TwoWaits} durationInFrames={140} fps={30} width={1080} height={1920} defaultProps={deuxAttentes} />
      <Composition id="MemeDeuxAttentesNoMusic" component={TwoWaits} durationInFrames={140} fps={30} width={1080} height={1920} defaultProps={{ ...deuxAttentes, music: undefined }} />
    </>
  );
};
