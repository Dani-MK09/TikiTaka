# Architecture — starter proposal

Monorepo, two independently deployable services:

- `apps/web`: SPA, React + TypeScript + Vite; starter has no authentication or API client.
- `apps/api`: Spring Boot REST with a health endpoint only.
- `infra`: local PostgreSQL Docker Compose, not connected yet.

Future bounded contexts (not implemented): accounts and age assurance, profiles/privacy, discovery and matching, Cupido introductions, groups and plans, games and consent, messaging, safety/moderation, rewards.

Principles: versioned REST endpoints, migrations before persistence, server-side authorization, minimal PII, explicit consent and auditable moderation actions. Do not store secrets in the repo.
