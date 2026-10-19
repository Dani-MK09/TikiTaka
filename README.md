# TikiTaka 💘

**TikiTaka** es el nombre de trabajo de una plataforma social y de citas para adultos (18+) con dos experiencias: **Day** (conexiones auténticas) y **Night** (planes, grupos y juegos consentidos). **Jugador** y **Cupido** son los roles iniciales.

> Estado: scaffold técnico inicial. No hay autenticación, matching, chats, geolocalización ni funcionalidades de producción implementadas. El nombre comercial está pendiente de validación jurídica.

## Stack inicial
- `apps/web`: React + TypeScript + Vite
- `apps/api`: Java 21 + Spring Boot REST
- `infra/`: PostgreSQL para desarrollo local (Docker Compose)
- `docs/`: visión, roadmap, arquitectura y decisiones

## Requisitos
Node.js 22+, npm, Java 21, Maven 3.9+, Docker (opcional para PostgreSQL).

## Desarrollo
**Frontend**:
```bash
cd apps/web
npm install
npm run dev
```
**API** (segunda terminal):
```bash
cd apps/api
mvn spring-boot:run
```
**Base de datos local** (solo cuando se introduzca persistencia):
```bash
docker compose -f infra/compose.yml up -d
```
Frontend: http://localhost:5173 | API health: http://localhost:8080/api/v1/health

La API inicial no conecta con PostgreSQL: se añade cuando se diseñe el primer módulo de dominio.

## Colaboración
- `main`: estable, fusionar mediante PR.
- `develop`: integración (crear tras publicar el primer commit).
- `feat/*`, `fix/*`, `docs/*`: ramas de trabajo.
- Revisar [AGENTS.md](AGENTS.md), [docs/PRODUCT.md](docs/PRODUCT.md) y [docs/ROADMAP.md](docs/ROADMAP.md) antes de empezar.
- Nunca subir secretos ni datos personales reales.

## Publicar en GitHub
1. Crear repositorio **privado** `TikiTaka` en GitHub **sin** generar README ni .gitignore (ya están incluidos).
2. Desde la carpeta extraída:
```bash
git init -b main
git add .
git commit -m "chore: bootstrap TikiTaka monorepo"
git remote add origin https://github.com/TU_USUARIO/TikiTaka.git
git push -u origin main
git checkout -b develop
git push -u origin develop
```
3. En GitHub: Settings → Branches/Rulesets, proteger `main`, exigir PR y checks; invitar a tu socio con acceso Write.
4. Conectar GitHub en Codex y elegir `TikiTaka` como repositorio de trabajo.

> Sustituye `TU_USUARIO` por tu cuenta u organización. No pongas tokens en comandos, archivos ni mensajes.
