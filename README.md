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
