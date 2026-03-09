By: Brady & Gabby

# Project Overview

**Name:** Sonic Species Collection  
**Tagline:** The total _unofficial_ collection of traits of every species in the Sonic series

**To-Do:**

- Add traits to database
- Make call to database to display traits of species using the dropdown  
  [Trait list](https://github.com/Gabby-Moon/w26-sdev372-sonic-species-collection/blob/main/NOTES.md)

---

## Repo Layout

- `frontend/` Vite + React app
- `server/` Express + Sequelize API
- `server/.env` for database connection

## Local Dev

1. `cd server`
2. `npm install`
3. `npm run dev`
4. `cd ../frontend`
5. `npm install`
6. `npm run dev`

**Problem Statement:** What traits do each of the species in the Sonic series have? How can I make a fan-character look accurate to it's species if I can't find _official_ references among all the other fan-characters? Are there _official_ characters that are (Species Name)?  
**Users:** Sonic (2-D and 3-D) Fan-Artists.

## Features

**MVP:** A database of species and correlating traits. An API to read the database. A page with a dropdown list of species that then shows a list of common traits for that species.

**Extended:** Photos for traits. Showing all traits in groups. Showing official characters that have the traits or group of traits to their species.

## Data Model

- **Species** – `id`, `name`, `description`
- **Trait** – `id`, `name`, `description`
- **SpeciesTrait** – junction table linking species and traits (many-to-many)

## User Experience

Users pick a species to see its traits, or pick a trait to see which species have it.

```
                            Sonic Species Collection
The total *unofficial* collection of traits of every species in the Sonic series
---------------------------------------------------------------------------------

                                Search By Species

                            Species: ____________ ↓
                                    | Wolf         |
                                    | Hedgehog     |
                                    | Tenrec       |
                                    | Cat          |
                                    ----------------

                                [Species] Traits
        -----------     -------------     -------------     ------------
        |         |     |           |     |           |     |          |
        |         |     |           |     |           |     |          |
        |         |     |           |     |           |     |          |
        -----------     -------------     -------------     ------------
         Trait One        Trait Two        Trait Three       Trait Four

---------------------------------------------------------------------------------

                                   Search By Trait

                               Trait: ____________ ↓
                                     | Fluffy Tail  |
                                     | Big Ears     |
                                     | Pointed Nose |
                                     | Shell        |
                                     ----------------

                              Species with: [Trait]
        -----------     -------------     -------------     ------------
        |         |     |           |     |           |     |          |
        |         |     |           |     |           |     |          |
        |         |     |           |     |           |     |          |
        -----------     -------------     -------------     ------------
        Species One      Species Two      Species Three     Species Four
```

```
                                        App
                                         |
                                     Main Page
                                     /       \
                                Species    Traits
                                  Page       Page
                                   \          /
                                     Drop Down      ← Fetch requests
                                     /       \             |
                                      ReUsable      ←      |
                                       Cards
```

---

## Tests

### Unit

| Location               | Framework                | File                        | Tests |
| ---------------------- | ------------------------ | --------------------------- | ----- |
| `frontend/src/_test_/` | Vitest + Testing Library | `App.router.test.jsx`       | 1     |
| `frontend/src/_test_/` | Vitest + Testing Library | `Card.test.jsx`             | 3     |
| `frontend/src/_test_/` | Vitest + Testing Library | `CharacterStrip.test.jsx`   | 1     |
| `frontend/src/_test_/` | Vitest + Testing Library | `Dropdown.test.jsx`         | 3     |
| `frontend/src/_test_/` | Vitest + Testing Library | `SpeciesPage.unit.test.jsx` | 1     |
| `frontend/src/_test_/` | Vitest + Testing Library | `TraitsPage.unit.test.jsx`  | 1     |
| `server/tests/`        | Vitest + Supertest       | `router.test.js`            | 13    |

### Integration

| Location                     | Framework                  | File                               | Tests |
| ---------------------------- | -------------------------- | ---------------------------------- | ----- |
| `frontend/src/_test_/pages/` | Vitest + Testing Library   | `SpeciesPage.integration.test.jsx` | 1     |
| `frontend/src/_test_/pages/` | Vitest + Testing Library   | `TraitsPage.integration.test.jsx`  | 1     |
| `server/tests/`              | Vitest + Supertest + MySQL | `router.integration.test.js`       | 5     |

### E2E

| Location          | Framework  | File          | Tests |
| ----------------- | ---------- | ------------- | ----- |
| `playwright/e2e/` | Playwright | `app.spec.js` | 2     |

---

## Running Tests

### Locally

**Frontend tests:**

```bash
cd frontend
npm install
npm test
```

**Server tests:**

```bash
cd server
npm install
npm test
```

> Server integration tests require a running MySQL database configured in `server/.env`.

**Playwright E2E tests:**

```bash
cd playwright
npm install
npx playwright install
npx playwright test
```

> Requires frontend and server to be running. Update `baseURL` in `playwright/playwright.config.js` for local use (default is `http://frontend:5173` for Docker).

### With Docker

```bash
docker compose up --build
```

This runs all services and all tests. Results appear in the output.
