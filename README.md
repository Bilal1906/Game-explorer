# Game Explorer

Een interactieve single-page applicatie voor het vak web advanced. Je kan hiermee games ontdekken, filteren, sorteren en opslaan
in je persoonlijke collectie.

# Projectbeschrijving

Game Explorer maakt gebruik van de RAWG API om meer dan 800.000 games op te halen. Gebruikers kunnen zoeken, filteren op genre/platform, sorteren en games opslaan als favoriet, gespeeld of wishlist.

## Wat doet de app?

- 20+ games laden via de RAWG API
- Kaartweergave met game afbeeldingen, rating en genres
- Zoeken op naam (met debounce)
- Filteren op genre en platform
- Sorteren op rating, naam, release datum en meer
- Favorieten, gespeeld en wishlist opslaan (blijft bewaard na sluiten browser)
- Dark/light thema (voorkeur wordt onthouden)
- Detail modal per game met beschrijving, platforms, metacritic score en speelduur
- Verwijderen van games uit je collectie

# Gebruikte API

- [RAWG Video Games Database API](https://rawg.io/apidocs)
- Gratis, API-sleutel nodig

# Installatie

1. Clone de repository:
   `git clone https://github.com/Bilal1906/Game-explorer.git`

2. Installeer dependencies:
   `npm install`

3. Maak een eigen `.env` bestand aan in de root van het project.
   Ga naar https://rawg.io/apidocs en maak een gratis account aan om een API key te krijgen.
   Zet dan dit in je `.env` bestand:
   `VITE_RAWG_API_KEY=jouw_api_key_hier`

4. Start de development server:
   `npm run dev`

5. Open http://localhost:5173 in je browser.

## Mappenstructuur

game-explorer/
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
├── .gitignore
├── .env
├── README.md
└── src/
    ├── main.js
    ├── counter.js
    ├── style.css
    ├── assets/
    └── js/
        ├── api.js
        ├── cards.js
        ├── collection.js
        ├── modal.js
        ├── storage.js
        └── ui.js

# Technische vereisten 

### DOM Manipulatie
| Concept | Bestand | Lijnnummer |
|---|---|---|
| Elementen selecteren | src/main.js | regel 14-21 (`document.getElementById`) |
| Elementen manipuleren | src/js/cards.js | regel 42 (`card.innerHTML`, `card.className`) |
| Events koppelen | src/main.js | regel 82 (`loadMoreBtn.addEventListener`) |

### Modern JavaScript
| Concept | Bestand | Lijnnummer |
|---|---|---|
| const | overal gebruikt | - |
| Template literals | src/js/cards.js | regel 43 (card HTML met backticks) |
| Array iteratie | src/main.js | regel 65 (`forEach` over games) |
| Array methodes | src/js/cards.js | regel 17 (`slice`, `map`), src/js/storage.js regel 37 (`some`), regel 43 (`filter`) |
| Arrow functions | overal gebruikt | - |
| Ternary operator | src/js/cards.js | regel 22 (`game.rating ? ... : 'N/A'`) |
| Callback functions | src/main.js | regel 82+ (bij alle `addEventListener`) |
| Promises | src/js/api.js | regel 30 (`fetch` geeft een Promise terug) |
| Async/Await | src/js/api.js | regel 7 (`fetchGames`), regel 40 (`fetchGameDetail`) |
| Observer API | src/js/cards.js | regel 27 (`loading="lazy"` via browser IntersectionObserver) |

### Data & API
| Concept | Bestand | Lijnnummer |
|---|---|---|
| Fetch | src/js/api.js | regel 30 (`fetchGames`), regel 44 (`fetchGameDetail`) |
| JSON | src/js/api.js | regel 37 (`response.json()`), src/js/storage.js regel 10 (`JSON.parse`), regel 17 (`JSON.stringify`) |

### Opslag & Validatie
| Concept | Bestand | Lijnnummer |
|---|---|---|
| Formuliervalidatie | src/main.js | regel 131 (zoekterm min. 2 tekens) |
| LocalStorage | src/js/storage.js | regel 9 (`getCollection`), regel 16 (`saveCollection`) |

### Styling & Layout
| Concept | Bestand | Lijnnummer |
|---|---|---|
| CSS Grid | src/style.css | regel 168 (`.games-grid`) |
| Flexbox | src/style.css | regel 62 (`.navbar`), regel 127 (`.controls-bar`) |
| Verwijderknoppen/iconen | src/js/collection.js | (`btn-remove`) |

### Tooling
| Concept | Bestand |
|---|---|
| Vite | `vite.config.js` en `package.json` |
| Folderstructuur | aparte html, css en js bestanden onder `src/` |

# Screenshots

**

# Gebruikte bronnen

- RAWG API documentatie: https://rawg.io/apidocs
- Vite documentatie: https://vitejs.dev
- AI chatlog: **