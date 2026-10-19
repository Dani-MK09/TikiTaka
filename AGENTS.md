# Instructions for coding agents (Codex)

## Mission
Implement TikiTaka incrementally as a safe, inclusive adult (18+) dating and social app. Work from issues and product docs; do not invent unapproved features or copy proprietary competitor interfaces.

## Codebase
- UI: `apps/web`, React + TypeScript strict mode, accessible responsive components.
- API: `apps/api`, Java 21 / Spring Boot REST. Use `api/v1` endpoints.
- Database: `infra/compose.yml`; currently not wired to API.

## Rules
1. Start every task by reading `docs/PRODUCT.md`, `docs/ARCHITECTURE.md`, and relevant issue.
2. Keep changes scoped. Explain architecture decisions and add tests for nontrivial logic.
3. Never fake integrations, matches, people, availability, safety claims or production readiness.
4. Adult-only product; opt-in for Night and Cupid exposure; clear consent for games and introductions.
5. No dark patterns or engagement rewards that pressure people into unwanted interactions.
6. Privacy-by-design: minimal data, no credentials committed, no precise geolocation by default.
7. Day/Night is a user preference, not a guaranteed forced 21:00 switch. Plan optional local-time transition and opt-out.
8. Run applicable lint/build/tests before PR and report gaps honestly.
9. Never change security controls or dependencies without explaining why.
10. UI should be premium and restrained: Day = clean and warm; Night = dark plum with selective pink/red accents, not excessive neon.

## Definition of done
Updated docs if needed, tests/lint/build passing (or documented blockers), no secrets, accessibility basics, PR description, and screenshots for UI changes.
