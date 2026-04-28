# Pair Dash

## Educational Purpose

This project was created primarily for **educational and learning purposes**.  
While it is well-structured and could technically be used in production, it is **not intended for commercialization**.  
The main goal is to explore and demonstrate best practices, patterns, and technologies in software development.

## Getting Started

1. Clone the repository
2. Navigate to the project folder
3. Execute: `npm install`
4. Execute: `npm run dev`

The application will open automatically at `http://localhost:3000`

## Description

**Pair Dash** is a browser-based memory card game built with vanilla TypeScript and no external runtime dependencies. The board presents 12 face-down cards arranged in a grid — 6 unique food illustrations, each duplicated to form 6 pairs. The player's goal is to uncover all matching pairs by clicking cards one at a time.

When a card is clicked its image fades in, revealing its content. If the second card selected matches the first, both cards lock in place and are permanently disabled, confirming the pair. If the two cards do not match, both flip back face-down after a short 250 ms delay, giving the player a moment to memorise their positions before continuing.

A built-in timer starts on the very first card click and stops the moment the last pair is found. The final elapsed time in seconds is then displayed on screen, encouraging players to replay and beat their previous record.

The game runs entirely in the browser with no server, no login, and no external calls. It is a single-page application that loads instantly and works offline once the assets are cached.

## Technologies used

1. Typescript
2. CSS3
3. HTML5
4. Vite

## Libraries used

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

## Portfolio Link

[`https://www.diegolibonati.com.ar/#/project/pair-dash`](https://www.diegolibonati.com.ar/#/project/pair-dash)

## Testing

1. Navigate to the project folder
2. Execute: `npm test`

For coverage report:

```bash
npm run test:coverage
```

## Security

### npm audit

Check for vulnerabilities in dependencies:

```bash
npm audit
```

## Known Issues

None at the moment.
