import React from "react";
import { Composition } from "remotion";
import { TierList, TierListProps } from "./gd/TierList";
import { MemeLastQuest, MemeWarzoneDrop } from "./gd/Memes";
import { GuideList, GuideListProps } from "./gd/GuideList";
import { TwoWaits, TwoWaitsProps } from "./gd/TwoWaits";
import { LocationPin } from "./gd/LocationPin";
import { MemeFrame, MemeFrameProps } from "./gd/MemeFrame";
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


// 23 Nov — "J'invite mon daron en donjon" (life-of-a-player: dad dungeon group)
const wowDaron: MemeTwoBeatProps = {
  setupSrc: "lo_t23.mp4", setupTrim: 132, setupRate: 0.6, setupPos: "50% 50%",
  setupLines: ["J'invite mon daron", "en donjon :", "« t'inquiète papa,", "je t'explique »"],
  setupLabel: "Mon daron :",
  punchAt: 95, punchSrc: "lo_t463.mp4", punchTrim: 15, punchRate: 0.6, punchPos: "38% 50%",
  punchLines: ["« J'ai clean ce", "donjon en 2005. »"], punchColor: "#F0A500",
  music: "comedy_busybody.mp3", punchMusic: "epic_heroic_adventure.mp3",
};


// 24 Nov — list "Ton groupe de donjon WoW Forever" (life-of-a-player list, punch = "Toi")
const wowGroupe: TimeLadderProps = {
  title: ["Chaque groupe de", "donjon WoW Forever :"],
  steps: [
    { time: "Chasseur", text: "need sur tout, même la robe en tissu", src: "lo_t883.mp4", rate: 0.8 },
    { time: "Mage", text: "« 2 min, je mange »… 20 min", src: "lo_t263.mp4", rate: 0.8 },
    { time: "Voleur", text: "part juste après SON boss", src: "lo_t423.mp4", trim: 30, rate: 0.7 },
    { time: "Toi", text: "tu fais les trois.", src: "lo_t83.mp4", trim: 120, rate: 0.6 },
  ],
  at: [0, 50, 100, 150],
  music: true,
};


// 25 Nov — GTA 6 "je joue réglo" (life-of-a-player; official GTA VI launch trailer footage)
const gtaReglo: MemeTwoBeatProps = {
  setupSrc: "gta_road_c.mp4", setupTrim: 0, setupRate: 0.65, setupPos: "50% 50%",
  setupLines: ["Moi sur GTA 6 :", "« ce soir je joue", "réglo, je respecte", "les feux rouges »"],
  punchAt: 95, punchSrc: "gta_bike_c.mp4", punchTrim: 6, punchRate: 0.6, punchPos: "50% 50%",
  punchLines: ["30 secondes après :", "5 étoiles"], punchColor: "#FF2E88",
  music: "comedy_spring_chicken.mp3", punchMusic: "action_city_run.mp3",
};

// 26 Nov — Tier list #2 « C'est la faute de qui si le groupe wipe ? » (life-of-a-player; S = Le heal, revealed last)
const wipeTiers: TierListProps = {
  title: ["C'est la faute de qui", "si le groupe wipe ?"],
  subtitle: "WoW Forever",
  tiers: [
    { label: "S", color: "#E63946", items: ["Le heal"] },
    { label: "A", color: "#F48C06", items: ["Le tank", "Le mage AFK"] },
    { label: "B", color: "#F0C828", items: ["Le chasseur", "Son familier"] },
    { label: "C", color: "#50AA5A", items: ["Le boss", "Le lag"] },
  ],
  cta: "Le heal a toujours tort ?",
  source: "Source : le chat de groupe après le wipe",
  bg: "lo_dungeon.mp4",
  reveal: [24, 50, 76, 120],
  music: "comedy_mischief_loop.mp3",
};

// 27 Nov — "Mes potes : Warzone ce soir ?" / Moi depuis le 19 nov : Vice City (friend-group; CoD DMZ + official GTA VI trailer footage)
const gtaViceCity: MemeTwoBeatProps = {
  setupSrc: "dmz_sneak.mp4", setupTrim: 0, setupRate: 0.7, setupPos: "50% 50%",
  setupLines: ["Mes potes :", "« ce soir, Warzone", "comme d'hab ? »"],
  setupLabel: "Moi depuis le 19 nov :",
  punchAt: 90, punchSrc: "gta_beach.mp4", punchTrim: 0, punchRate: 0.5, punchPos: "50% 50%",
  punchLines: ["« Désolé, j'habite", "à Vice City", "maintenant. »"], punchColor: "#FF2E88",
  music: "action_behind_enemy_lines.mp3", punchMusic: "urban_3am_west_end.mp3",
};

// 28 Nov — "Mon pote : installe WoW Forever, on monte ensemble !" (life-of-a-player: friend who quits)
const wowPote: MemeTwoBeatProps = {
  setupSrc: "lo_orcs.mp4", setupTrim: 36, setupRate: 0.6, setupPos: "50% 50%",
  setupLines: ["Mon pote :", "« installe WoW Forever,", "on monte ensemble ! »"],
  setupLabel: "Une semaine plus tard :",
  punchAt: 95, punchSrc: "lo_boss.mp4", punchTrim: 100, punchRate: 0.6, punchPos: "50% 50%",
  punchLines: ["Lui : niveau 9.", "Moi : niveau 52."], punchColor: "#F0A500",
  music: "comedy_silly_boy.mp3", punchMusic: "epic_boss_battle.mp3",
};

// 29 Nov — GTA 6 « Ma voiture IRL vs ma voiture sur GTA 6 » (life-of-a-player: garage obsession)
const gtaLustre: MemeTwoBeatProps = {
  setupSrc: "gta_road_c.mp4", setupTrim: 0, setupRate: 0.65, setupPos: "50% 50%",
  setupLines: ["Ma voiture dans", "la vraie vie :", "pas lavée", "depuis 2024"],
  punchAt: 95, punchSrc: "gta_polish_c.mp4", punchTrim: 0, punchRate: 0.55, punchPos: "44% 50%",
  punchLines: ["Ma voiture sur GTA 6 :", "lustrée avant", "CHAQUE mission"], punchColor: "#FF2E88",
  music: "comedy_spring_chicken.mp3", punchMusic: "urban_patron_saint_of_heists.mp3",
};

// Value / save content (24 Nov). Facts: each row confirmed by >=2 sites (see formats doc Log).
const gtaReglages: GuideListProps = {
  series: "GUIDE GAMEDROP #1",
  title: ["GTA 6 :", "6 réglages à changer", "AVANT de jouer"],
  rows: [
    { title: "Flou de mouvement", detail: "Affichage", pill: "0 ou 1" },
    { title: "Tremblement caméra", detail: "Caméra", pill: "Désactivé" },
    { title: "Caméras ciné (crash, kill)", detail: "Caméra", pill: "0 ou 1" },
    { title: "Vitesse de déplacement", detail: "Jeu : courir sans appuyer", pill: "Trot" },
    { title: "Sous-titres", detail: "Interface", pill: "Tous les dialogues" },
    { title: "Réduction des acouphènes", detail: "Audio : stop au sifflement", pill: "Activée" },
  ],
  clips: [
    { src: "gta_road.mp4" },
    { src: "gta_cops.mp4" },
    { src: "gta_beach.mp4" },
    { src: "gta_night.mp4" },
    { src: "gta_swamp.mp4" },
    { src: "gta_polish.mp4" },
  ],
  first: 12,
  step: 45,
  cta: "ENREGISTRE-LA POUR TA PROCHAINE SESSION",
  music: "urban_3am_west_end.mp3",
};

const gtaAstuces: GuideListProps = {
  series: "GUIDE GAMEDROP #2",
  title: ["GTA 6 :", "6 trucs que le jeu", "ne t'explique PAS"],
  rows: [
    { title: "Mode Focus", detail: "Clique les 2 sticks en même temps", pill: "L3 + R3" },
    { title: "Planque ton cash", detail: "Plancher de la chambre de Jason", pill: "Avant BuckMe" },
    { title: "Mort = cash perdu", detail: "Mets-le à l'abri avant un coup", pill: "Attention" },
    { title: "Recherché ?", detail: "Change de tenue et de chapeau", pill: "Nouveau look" },
    { title: "App Waink", detail: "Scanne une voiture avant de la voler", pill: "Téléphone" },
    { title: "Pas de « rejouer »", detail: "Sauvegarde avant chaque chapitre", pill: "Sauvegarde" },
  ],
  clips: [
    { src: "gta_lowrider.mp4" },
    { src: "gta_duo_car.mp4" },
    { src: "gta_couple.mp4" },
    { src: "gta_cops.mp4" },
    { src: "gta_bike.mp4" },
    { src: "gta_polish.mp4" },
  ],
  first: 12,
  step: 48,
  cta: "ENREGISTRE-LA, TU ME REMERCIERAS",
  music: "urban_backbeat.mp3",
};

// 24 Nov redo — shot-first MemeFrame versions (whole 16:9 shot visible, setup text stays, punch holds ~2.7 s)
const fReglo: MemeFrameProps = {
  setupLines: ["Moi sur GTA 6 :", "« ce soir je joue réglo,", "je respecte le code »"],
  setupShot: { src: "gta6_t2.mp4", from: 34.5 },
  punchAt: 100, punchShot: { src: "gta6_t1.mp4", from: 64.05, rate: 0.6 },
  punchLines: ["30 min plus tard :", "je passe aux infos"],
  music: "comedy_spring_chicken.mp3", punchMusic: "action_city_run.mp3",
};
const fViceCity: MemeFrameProps = {
  setupLines: ["Mes potes :", "« ce soir, Warzone", "comme d'hab ? »"],
  setupShot: { src: "dmz_sneak.mp4", from: 0, rate: 0.8 },
  punchAt: 100, punchShot: { src: "gta6_t1.mp4", from: 13.0, rate: 0.6 },
  punchLines: ["Moi depuis le 19 nov :", "« Désolé, j'habite", "à Vice City »"], punchColor: "#FF4FA3",
  music: "action_behind_enemy_lines.mp3", punchMusic: "urban_3am_west_end.mp3",
};
const fMuscu: MemeFrameProps = {
  setupLines: ["Moi dans la vraie vie :", "zéro séance de sport", "depuis 2023"],
  setupShot: { src: "gta6_launch.mp4", from: 57.75, rate: 0.5 },
  punchAt: 95, punchShot: { src: "gta6_t2.mp4", from: 38.4, rate: 0.8 },
  punchLines: ["Mon perso sur GTA 6 :", "muscu à la plage", "tous les jours"],
  music: "comedy_lurking_sloth.mp3", punchMusic: "urban_funky_energy_loop.mp3",
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
      <Composition id="PinOrgrimmarV3" component={LocationPin} durationInFrames={305} fps={30} width={1080} height={1920} defaultProps={{ src: "ai_orgrimmar_long.mp4", clipFrames: 305, place: "Orgrimmar", date: "4 novembre 2026 · 23:59", look: "fantasy", flashEnd: true, soundtrack: "orgrimmar_soundtrack.mp3", question: "Tu y étais ?", questionAt: 215 }} />
      <Composition id="PinOrgrimmarV3Silent" component={LocationPin} durationInFrames={305} fps={30} width={1080} height={1920} defaultProps={{ src: "ai_orgrimmar_long.mp4", clipFrames: 305, place: "Orgrimmar", date: "4 novembre 2026 · 23:59", look: "fantasy", flashEnd: true, question: "Tu y étais ?", questionAt: 215 }} />
      <Composition id="PinFossoyeuse" component={LocationPin} durationInFrames={332} fps={30} width={1080} height={1920} defaultProps={{ src: "ai_fossoyeuse_after.mp4", clipFrames: 332, place: "Fossoyeuse", date: "5 novembre 2026 · 4h du matin", look: "fantasy", soundtrack: "fossoyeuse_soundtrack.mp3", question: "Tu y étais ?", questionAt: 200, questionTop: 1360 }} />
      <Composition id="TierListSoloV2" component={TierList} durationInFrames={225} fps={30} width={1080} height={1920} defaultProps={{ ...soloTiers, reveal: [30, 60, 90, 150] }} />
      <Composition id="MemeWarzoneDropV2" component={MemeWarzoneDrop} durationInFrames={145} fps={30} width={1080} height={1920} />
    <Composition id="ListGta6Soiree" component={TimeLadder} durationInFrames={230} fps={30} width={1080} height={1920} defaultProps={gta6Soiree} />
      <Composition id="MemeDeuxAttentes" component={TwoWaits} durationInFrames={140} fps={30} width={1080} height={1920} defaultProps={deuxAttentes} />
      <Composition id="MemeDeuxAttentesNoMusic" component={TwoWaits} durationInFrames={140} fps={30} width={1080} height={1920} defaultProps={{ ...deuxAttentes, music: undefined }} />
      <Composition id="MemeWowDaron" component={MemeTwoBeat} durationInFrames={145} fps={30} width={1080} height={1920} defaultProps={wowDaron} />
      <Composition id="MemeGtaReglo" component={MemeTwoBeat} durationInFrames={150} fps={30} width={1080} height={1920} defaultProps={gtaReglo} />
      <Composition id="TierListWipe" component={TierList} durationInFrames={175} fps={30} width={1080} height={1920} defaultProps={wipeTiers} />
      <Composition id="ListWowGroupe" component={TimeLadder} durationInFrames={192} fps={30} width={1080} height={1920} defaultProps={wowGroupe} />
      <Composition id="MemeGtaViceCity" component={MemeTwoBeat} durationInFrames={150} fps={30} width={1080} height={1920} defaultProps={gtaViceCity} />
      <Composition id="MemeWowPote" component={MemeTwoBeat} durationInFrames={145} fps={30} width={1080} height={1920} defaultProps={wowPote} />
      <Composition id="MemeGtaLustre" component={MemeTwoBeat} durationInFrames={145} fps={30} width={1080} height={1920} defaultProps={gtaLustre} />
      <Composition id="GuideGtaReglages" component={GuideList} durationInFrames={330} fps={30} width={1080} height={1920} defaultProps={gtaReglages} />
      <Composition id="GuideGtaAstuces" component={GuideList} durationInFrames={350} fps={30} width={1080} height={1920} defaultProps={gtaAstuces} />
      <Composition id="FrameGtaReglo" component={MemeFrame} durationInFrames={180} fps={30} width={1080} height={1920} defaultProps={fReglo} />
      <Composition id="FrameGtaViceCity" component={MemeFrame} durationInFrames={180} fps={30} width={1080} height={1920} defaultProps={fViceCity} />
      <Composition id="FrameGtaMuscu" component={MemeFrame} durationInFrames={175} fps={30} width={1080} height={1920} defaultProps={fMuscu} />
    </>
  );
};
