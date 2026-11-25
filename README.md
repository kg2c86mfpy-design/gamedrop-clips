# GameDrop footage library (for cloud runs — no Mac needed)

Copy into `remotion/public/` before rendering:
- `footage/*.mp4` → `public/` (1080p, no audio, 30 fps). `footage/INDEX.jpg` = 1 frame per second of every clip with timestamps; use it to pick trims (each clip can contain several shots).
- `sfx/*.wav` → `public/sfx/`
- `music/bed.mp3` → `public/bed.mp3` (CC0/own music bed)
- `Poppins-Bold.ttf` → `public/`

Sources: official WoW Forever launch overview (lo_*), WoW Forever Durotar 9:16 animation (dur_*), CoD DMZ Season 1 intel briefing (dmz_*), Warzone Season 1 trailer (wz_*), GTA VI Launch Trailer from Rockstar Games YouTube rz1B4B2yBZY (gta_*: road, polish, lowrider, iguana, sunset, duo_car, swamp, cops, bike, night, beach, couple).
To add footage: cut short 1080p segments, commit them here, regenerate INDEX.jpg.

Photos (`photos/`): AI-generated fictional babies (ElevenLabs, 17 Nov) for the « Deux attentes » GTA 6 meme — baby_ai_skeptical.png (used), baby_ai_sideeye.png. Copy to remotion/public/.

Letterbox-free crops (1920×960, 60 px bars removed — use these, the originals show black bars in 9:16): gta_road_c, gta_bike_c (20 Nov), gta_polish_c (24 Nov).

## Full official trailers (24 Nov) — use these, not the 2-second scraps
`trailers/`: GTA VI Trailer 1 (QdBZY2fkU-0, 90 s), Trailer 2 (VQRLujxTm3c, 167 s), Launch trailer (rz1B4B2yBZY, 90 s), all 1080p from Rockstar's YouTube, plus 1-frame-per-second INDEX sheets with timestamps. Copy to `remotion/public/` as gta6_t1.mp4 / gta6_t2.mp4 / gta6_launch.mp4 and use the `MemeFrame` template (shot shown whole, `from` in seconds).
Useful shots: t2 34.5–37.7 calm highway driving POV · t2 38.3–42.5 beach bench press · t1 64.0–64.9 Weazel News crash + 64.5–66 news mugshot · t1 66–66.9 dirt-bike wheelies · t1 13.0–14.6 aerial Vice City beach · t1 22–24 beach crowd · t1 25–26 girl on car roof at night · t1 51–53 man in green pickup · launch 57.7–59.2 guy lounging on couch · launch 46–47 red supercar · t2 1:44 police office · t2 2:20–2:23 jet ski / gunner.
Rule: pick the shot first, then write a joke the shot literally shows.

## WoW Forever full official videos (25 Nov)
`trailers/wowf_adventure.mp4` = « Your Adventure Begins » trailer (YouTube qMe5TUjpCso, 347 s) · `trailers/wowf_overview.mp4` = Official Game Overview trailer (ErZ0ERmwewY, 286 s). 1080p, 30 fps, no audio; INDEX sheets `*_INDEX_1..3.jpg` (1 fps, 120 s each). Copy to `remotion/public/`. Logo end cards: adventure ≥331 s, overview ≥260 s.
Useful shots (adventure): 169.4–172.7 big wooden ship at the harbour · 174.2–178.9 character on ship deck staring at the sea, light turns to dusk · 162.6–164 two friends on a cliff at sunset · 301–303.5 raid group fighting a big armored boss · 304–313 boss fight, group around boss · 147–152 quest-text windows with NPCs · 130–131 two undead side by side · 90–93 players running on a foggy beach · 214–216 crowd of players on a dock · 61–62 purple corpse with loot beam · 26–28 tauren running in a field at sunset · 54–55 orc camp by a fire.
Useful shots (overview): 185–188 players lying by a campfire (resting) · 6–7 group around a campfire · 13–14 ogres in a tavern · 201–202 caster vs giant bear in snow · 205–207 dwarf hunter shooting · 197–199 group fight in forest · 167–170 character on a ship deck · 244–246 dungeon portal · 247–248 dungeon corridor.
