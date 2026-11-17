# GameDrop Remotion templates
- `npm i` then `npx remotion browser ensure`.
- Put assets in `public/`: footage MP4s (cut 1080p segments on the Mac VM from Documents/Clipping), `bed.mp3` (= Documents/Clipping/work/music_bed_fantasy_01.wav), `Poppins-Bold.ttf`, and SFX from https://remotion.media/<name>.wav into `public/sfx/` (whoosh, whip, vine-boom, anime-wow, bruh, record-scratch, ding).
- Compositions (src/Root.tsx): MemeTwoBeat (generic props-driven two-beat meme: setupSrc/setupLines/punchAt/punchSrc/punchLines, music on/off for the TikTok no-music export; e.g. MemeDmzDiscret + MemeDmzDiscretNoMusic), TierListSolo (props: title, subtitle, tiers S→C, cta, source, bg — reveal C→B→A→S), MemeLastQuest, MemeWarzoneDrop (two-beat meme: setup footage → punch cut with flash/shake/vine-boom).
- Use OffthreadVideo (not @remotion/media Video) so objectFit: cover fills 1080×1920.
- Render: `npx remotion render <Id> out/<Id>.mp4`.
