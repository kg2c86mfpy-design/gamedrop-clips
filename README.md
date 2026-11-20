# GameDrop footage library (for cloud runs — no Mac needed)

Copy into `remotion/public/` before rendering:
- `footage/*.mp4` → `public/` (1080p, no audio, 30 fps). `footage/INDEX.jpg` = 1 frame per second of every clip with timestamps; use it to pick trims (each clip can contain several shots).
- `sfx/*.wav` → `public/sfx/`
- `music/bed.mp3` → `public/bed.mp3` (CC0/own music bed)
- `Poppins-Bold.ttf` → `public/`

Sources: official WoW Forever launch overview (lo_*), WoW Forever Durotar 9:16 animation (dur_*), CoD DMZ Season 1 intel briefing (dmz_*), Warzone Season 1 trailer (wz_*), GTA VI Launch Trailer from Rockstar Games YouTube rz1B4B2yBZY (gta_*: road, polish, lowrider, iguana, sunset, duo_car, swamp, cops, bike, night, beach, couple).
To add footage: cut short 1080p segments, commit them here, regenerate INDEX.jpg.

Photos (`photos/`): AI-generated fictional babies (ElevenLabs, 17 Nov) for the « Deux attentes » GTA 6 meme — baby_ai_skeptical.png (used), baby_ai_sideeye.png. Copy to remotion/public/.

Letterbox-free crops (1920×960, 60 px bars removed — use these, the originals show black bars in 9:16): gta_road_c, gta_bike_c (20 Nov).
