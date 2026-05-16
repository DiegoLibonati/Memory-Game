# Pair Dash

## Educational Purpose

This project was created primarily for **educational and learning purposes**.  
While it is well-structured and could technically be used in production, it is **not intended for commercialization**.  
The main goal is to explore and demonstrate best practices, patterns, and technologies in software development.

## Description

**Pair Dash** is a browser-based memory card game built with vanilla TypeScript and no external runtime dependencies. The board presents 12 face-down cards arranged in a grid — 6 unique food illustrations, each duplicated to form 6 pairs. The player's goal is to uncover all matching pairs by clicking cards one at a time.

When a card is clicked its image fades in, revealing its content. If the second card selected matches the first, both cards lock in place and are permanently disabled, confirming the pair. If the two cards do not match, both flip back face-down after a short 250 ms delay, giving the player a moment to memorise their positions before continuing.

A built-in timer starts on the very first card click and stops the moment the last pair is found. The final elapsed time in seconds is then displayed on screen, encouraging players to replay and beat their previous record.

The game runs entirely in the browser with no server, no login, and no external calls. It is a single-page application that loads instantly and works offline once the assets are cached.

## Technologies used

1. TypeScript
2. CSS3
3. HTML5
4. Vite

## Libraries used

The runtime is intentionally dependency-free — every package below is a development tool used for type-checking, testing, linting, formatting, or bundling.

#### Dependencies

```
No production dependencies - Pure Vanilla TypeScript
```

#### devDependencies

```
"@eslint/js": "^9.39.2"
"@testing-library/dom": "^10.4.0"
"@testing-library/jest-dom": "^6.6.3"
"@testing-library/user-event": "^14.5.2"
"@types/jest": "^30.0.0"
"@types/node": "^22.0.0"
"eslint": "^9.39.2"
"eslint-config-prettier": "^10.1.8"
"eslint-plugin-prettier": "^5.5.5"
"globals": "^17.3.0"
"husky": "^9.1.7"
"jest": "^30.3.0"
"jest-environment-jsdom": "^30.3.0"
"lint-staged": "^16.2.7"
"prettier": "^3.8.1"
"ts-jest": "^29.4.6"
"typescript": "^5.2.2"
"typescript-eslint": "^8.54.0"
"vite": "^7.1.6"
```

## Getting Started

**Prerequisite:** Node.js 22 (use `.nvmrc` with `nvm use`).

With the toolchain above installed via `npm`, the project boots locally in four steps:

1. Clone the repository
2. Navigate to the project folder
3. Execute: `npm install`
4. Execute: `npm run dev`

The application will open automatically at `http://localhost:3000`.

## Testing

Once the app runs locally, the same dependency tree powers the test suite. Tests live under `__tests__/` and cover game logic, components, and helpers.

1. Navigate to the project folder
2. Execute: `npm test`

For coverage report:

```bash
npm run test:coverage
```

## Continuous Integration

The repository ships with a **GitHub Actions** pipeline defined in [`.github/workflows/ci.yml`](.github/workflows/ci.yml). It runs automatically on every `push` and `pull_request` targeting the `main` branch. All jobs run on `ubuntu-latest`, use the Node.js version pinned in [`.nvmrc`](.nvmrc), and reuse the npm cache between runs.

### Pipeline overview

```
                  ┌─── PR or push to main ───┐
                  ▼                          ▼
┌──────────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│   lint-and-audit     │─▶│     testing      │─▶│      build       │
│ eslint · type-check  │  │   jest (jsdom)   │  │  vite production │
└──────────────────────┘  └──────────────────┘  └──────────────────┘
```

The three jobs run sequentially: `testing` only starts if `lint-and-audit` succeeds, and `build` only starts if `testing` succeeds. A failure in any earlier job short-circuits the rest of the pipeline.

### Validation jobs (run on every PR and push)

1. **`lint-and-audit`** — installs dependencies with `npm ci`, then runs `npm run lint` (ESLint with the project's flat config, enforcing explicit return types and no `console` statements) and `npm run type-check` (`tsc --noEmit` against `tsconfig.app.json`).
2. **`testing`** — installs dependencies with `npm ci`, then runs `npm run test`, executing the full Jest suite under the `jsdom` environment via `ts-jest`. Tests live in `__tests__/` and cover components, helpers, pages and the assets/cards modules mocked in `jest.setup.ts`.
3. **`build`** — installs dependencies with `npm ci`, then runs `npm run build`, which performs a full TypeScript project build (`tsc -b`) followed by a production `vite build` into `dist/`. This smoke test guarantees that the bundle is generated cleanly on every change.

### Where the build outputs live

| Output                                           | Location                                                    |
| ------------------------------------------------ | ----------------------------------------------------------- |
| Validation logs (lint, type-check, tests, build) | **Actions** tab on GitHub                                   |
| Production bundle (`dist/`)                      | Ephemeral, inside the runner — not published as an artifact |

> **Note:** the current pipeline is **validation-only**. There is no release job, no tag/version bump, no GitHub Release, and no artifact upload. The bundle produced by `build` exists only to prove that `vite build` succeeds; it is discarded when the runner shuts down.

### Running the same checks locally

```bash
# lint-and-audit
npm run lint
npm run type-check

# testing
npm run test

# build
npm run build
```

## Security Audit

In addition to functional tests, dependencies should be checked for known vulnerabilities before each release.

```bash
npm audit
```

## Known Issues

None at the moment.

## Portfolio Link

[`https://www.diegolibonati.com.ar/#/project/pair-dash`](https://www.diegolibonati.com.ar/#/project/pair-dash)
