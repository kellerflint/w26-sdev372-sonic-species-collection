##Unit tests (fast, isolated)

Dropdown: renders label/placeholder/options; calls onChange; supports empty options.
Card: renders name; renders image only when imageUrl exists; image alt equals name.
CharacterStrip: renders all expected character images and alt text.
SpeciesPage state logic: selecting a species sets selectedId/selectedName, clears prior traits/error.
TraitsPage state logic: selecting a trait sets selectedId/selectedName, clears prior species/error.
Router unit: App maps /, /species, /traits to correct pages.

##Integration tests (module boundaries + real interactions)

API GET /api/all returns species array (200) and handles DB failure (500).
API GET /api/name?name=Fox returns filtered species; missing/unknown name returns empty array.
API GET /api/species/:id/traits: valid id returns {id,name,traits[]}; invalid id returns 404.
API GET /api/traits returns trait list (200), DB failure returns 500.
API GET /api/traits/:id/species: valid id returns {id,name,species[]}; invalid id returns 404.
Sequelize association integration: Species ↔ Trait many-to-many works through species_traits.
Seed integration: running seed is idempotent (findOrCreate prevents duplicates across reruns).
Frontend page integration (mocked API): Species page loads dropdown, selection fetches and renders trait cards, network error shows message.
Frontend page integration (mocked API): Traits page loads dropdown, selection fetches and renders species cards, network error shows message.

##E2E tests (user journeys in browser + running API)

Home page loads, both nav cards route correctly to species/traits pages.
Species flow: choose species → traits appear; back link returns home.
Traits flow: choose trait → species appear; back link returns home.
Empty-result behavior: selected item with no related records shows “No traits found” / “No species found.”
API outage scenario: pages show user-facing error message, app does not crash.
Smoke across Docker compose: frontend reachable on 5173, API on 3001, critical routes respond.