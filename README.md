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

# Technische vereisten (wordt aangevuld)

| Concept | Bestand | Lijnnummer |
|---|---|---|
| DOM manipulatie | wordt aangevuld | - |
| Fetch / Async Await | wordt aangevuld | - |
| LocalStorage | wordt aangevuld | - |

# Screenshots

**

# Gebruikte bronnen

- RAWG API documentatie: https://rawg.io/apidocs
- Vite documentatie: https://vitejs.dev
- AI chatlog: **