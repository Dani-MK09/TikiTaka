# Day Night interactive mobile mockup 0.1

Open `index.html` directly in a browser. No installation, API, account or server is required. This is the exported mobile concept explored during the October 20, 2026 brainstorming session, separate from the React application in `apps/web`.

## Explore

- Switch between warm Day and plum/pink Night.
- Choose Jugador to browse illustrative profiles and simulate likes.
- Choose Cupido to propose up to five introductions per demonstration session. The large recipient card stays on the left while you swipe candidates on the right; the central heart proposes a connection. Recipient selection persists across redraws.
- Open Mis estadísticas to see proposals made in this session, remaining opportunities and pending introductions. Ranking offers fictional Cerca de mí, Madrid and Nacional views without accessing location.
- Open La previa for a sample group, plan and question games.
- Explore the friends ranking and claim a sample Cupido badge.
- Add local sample messages and change demonstration privacy preferences.
- Use Perfil to reset the demonstration.

All people, activity, messages, scores and plans are fictional. No message, introduction, report, reservation or payment is sent. Likes do not produce automatic matches. Ranking values are illustrative, not a live ranking engine. Discovery preferences are a visual exploration, not working filters. Conversation interference remains an inactive concept. No production security or moderation service is represented.

The design borrows the supplied references' plum/pink palette and Jugador/Cupido structure. The three new wireframes guide role choice, the two large Cupido cards, and statistics/ranking tabs. Portraits are AI-generated fictional adults. Prototype disclosure is consolidated in Perfil → Acerca de esta versión to keep the main screens clear. The references and brainstorming outside this repository are not runtime dependencies.

The October 21 Night refresh adds a cinematic rooftop hero, flame/winged-heart role artwork, selective pink/red glow, social shortcuts and fictional profile previews. Day retains its warm styling. Existing proposal, game, ranking and chat flows are preserved. The artwork is generated and embedded in the export; no external image service or real availability is implied.

## Files

- `index.html`: self-contained browser preview, including the sandbox wrapper and icon runtime.
- `source.html`: editable interface fragment, containing an image placeholder resolved during export.
- `preview-template.html`: existing sandbox and icon runtime with a fragment placeholder; security settings are unchanged.
- `build.py`: rebuilds `index.html` with the source and embedded portrait asset. Run `python mockups/0.1/build.py`; only the Python standard library is needed.
- `assets/fictional-adults.png`: original generated portrait sheet, framed with CSS without modifying the source image.
- `assets/PROMPT.md`: generation prompt and provenance.
- `screenshots/`: Day, Night and narrow Cupido views captured during browser checks.
- `smoke.cjs`: browser checks for recipient persistence, swipe, statistics, ranking scopes, image loading, quota enforcement, local messages, games, mode switching, reset and narrow layout.

The optional host state/design helpers are guarded. The ordinary prototype flows work outside Codex. In-session activity is temporary; it is not an account or durable data store.

## Validation

The smoke script requires Node.js, Playwright available to Node's module resolver, and Microsoft Edge. Run `node mockups/0.1/smoke.cjs` from the repository root. These are test prerequisites only; no production dependencies have been added. Screenshots can be refreshed by setting `MOCKUP_SCREENSHOTS=1` when running the script.

No React/API source, dependency or security configuration is changed by this standalone mockup. React and Java builds are not applicable to these static files.

## Review description

The initial scaffold does not let users explore the proposed product flows. This change adds a standalone, mobile-sized concept with Day/Night navigation, sample discovery, five Cupido proposals, social games and local chat examples. It is intended for design review before implementation, with fictional content explained in the profile information section.

Validation: browser smoke checks and screenshots at mobile widths; no backend integration or production readiness claimed.
