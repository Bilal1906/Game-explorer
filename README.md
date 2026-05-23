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

```
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
```

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

## Gebruikersvoorkeuren

| Sleutel | Wat wordt opgeslagen |
|---|---|
| `gameexplorer_theme` | `dark` of `light` |
| `gameexplorer_favorites` | array van favoriete games |
| `gameexplorer_played` | array van gespeelde games |
| `gameexplorer_wishlist` | array van wishlist games |

# Screenshots


<img width="1906" height="909" alt="Screenshot 2026-05-23 145813" src="https://github.com/user-attachments/assets/fa4016cd-82fc-477b-a56f-2ed468a4d919" />
<img width="1915" height="905" alt="Screenshot 2026-05-23 145827" src="https://github.com/user-attachments/assets/f6a398b4-5d85-4708-81fe-c695cb56ed9d" />
<img width="1904" height="913" alt="Screenshot 2026-05-23 145848" src="https://github.com/user-attachments/assets/0193681b-c5ec-45c6-af0c-733a974f5658" />



# Gebruikte bronnen

- RAWG API documentatie: https://rawg.io/apidocs
- MDN Fetch API: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
- MDN LocalStorage: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
- MDN IntersectionObserver: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
- MDN Array methodes: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
- Vite documentatie: https://vitejs.dev/
- Claude (Anthropic) gebruikt voor uitleg van concepten en debuggen

# AI-chatlog screenshots
<img width="1837" height="729" alt="Screenshot 2026-05-23 150320" src="https://github.com/user-attachments/assets/36b67f47-ea54-4dea-ad78-53a5af8abb64" />
<img width="1822" height="728" alt="Screenshot 2026-05-23 150825" src="https://github.com/user-attachments/assets/61aa9e32-cf06-4c63-ad21-9658ae3d9e37" />
<img width="1835" height="845" alt="Screenshot 2026-05-23 151040" src="https://github.com/user-attachments/assets/9eeb4fe4-dbd4-4c61-8a66-b3e54d80bbd3" />
<img width="1840" height="684" alt="Screenshot 2026-05-23 151248" src="https://github.com/user-attachments/assets/6ae2c66b-573c-4c63-a590-6c5d3ae9b8c8" />
<img width="1856" height="730" alt="Screenshot 2026-05-23 151654" src="https://github.com/user-attachments/assets/f9934fd9-8da6-44d0-b5ed-33ed94cf4731" />
<img width="1831" height="720" alt="Screenshot 2026-05-23 154119" src="https://github.com/user-attachments/assets/fd89a775-0576-4438-ad2a-b7be018e93d6" />




