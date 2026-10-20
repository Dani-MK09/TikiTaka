# Day Night interactive mobile mockup 0.1

Open `index.html` directly in a browser. No installation, API, account or server is required. This is the exported mobile concept explored during the October 20, 2026 brainstorming session, separate from the React application in `apps/web`.

## Explore

- Switch between warm Day and plum/pink Night.
- Choose Jugador to browse illustrative profiles and simulate likes.
- Choose Cupido to propose up to five introductions per demonstration session.
- Open La previa for a sample group, plan and question games.
- Explore the friends ranking and claim a sample Cupido badge.
- Add local sample messages and change demonstration privacy preferences.
- Use Perfil to reset the demonstration.

All people, activity, messages, scores and plans are fictional. No message, introduction, report, reservation or payment is sent. Likes do not produce automatic matches. Ranking values are illustrative, not a live ranking engine. Discovery preferences are a visual exploration, not working filters. The selected Cupido recipient resets when that screen is redrawn. Conversation interference remains an inactive concept. No production security or moderation service is represented.

The design borrows the supplied references' plum/pink palette and Jugador/Cupido structure. Profiles use monograms rather than the reference photographs. The references and brainstorming outside this repository are not runtime dependencies.

## Files

- `index.html`: self-contained browser preview, including the sandbox wrapper and icon runtime.
- `source.html`: editable interface fragment used to generate the preview. Changes here must also be exported into `index.html`; the preview does not read this file at runtime.
- `screenshots/`: Day, Night and narrow Cupido views captured during browser checks.
- `smoke.cjs`: browser checks for quota enforcement, local messages, games, mode switching, reset and narrow layout.

The optional host state/design helpers are guarded. The ordinary prototype flows work outside Codex. In-session activity is temporary; it is not an account or durable data store.

## Validation

The smoke script requires Node.js, Playwright available to Node's module resolver, and Microsoft Edge. Run `node mockups/0.1/smoke.cjs` from the repository root. These are test prerequisites only; no production dependencies have been added. Screenshots can be refreshed by setting `MOCKUP_SCREENSHOTS=1` when running the script.

No React/API source, dependency or security configuration is changed by this standalone mockup. React and Java builds are not applicable to these static files.

## Review description

The initial scaffold does not let users explore the proposed product flows. This change adds a standalone, mobile-sized concept with Day/Night navigation, sample discovery, five Cupido proposals, social games and local chat examples. It is intended for design review before implementation, with fictional content identified throughout.

Validation: browser smoke checks and screenshots at mobile widths; no backend integration or production readiness claimed.
