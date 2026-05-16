// 
// Startpunt van de applicatie
// 

import { fetchGames } from './js/api.js';
import { createGameCard, updateCollectionCounts } from './js/cards.js';
import { showLoader, showError } from './js/ui.js';
import { getSavedTheme, saveTheme } from './js/storage.js';
import { showToast } from './js/ui.js';

//  DOM Elementen selecteren 
const gamesContainer = document.getElementById('gamesContainer');
const resultsCount   = document.getElementById('resultsCount');
const loadMoreBtn    = document.getElementById('loadMoreBtn');
const themeToggle    = document.getElementById('themeToggle');
const searchInput    = document.getElementById('searchInput');
const searchClear    = document.getElementById('searchClear');

// State bijhouden
let currentPage  = 1;
let totalGames   = 0;
let isLoading    = false;
let currentSearch = '';

// 
// Games laden en weergeven
// 
  const loadGames = async (reset = false) => {
  if (isLoading) return;
  isLoading = true;

  // Bij reset: pagina terug naar 1 en container leegmaken
  if (reset) {
    currentPage = 1;
    gamesContainer.innerHTML = '';
  }

  // Loader tonen enkel bij eerste pagina
  if (currentPage === 1) showLoader(gamesContainer);

  try {
    const data = await fetchGames({
      page: currentPage,
      search: currentSearch,
    });
    totalGames = data.count;

    // Loader verwijderen enkel bij eerste pagina
    if (currentPage === 1) gamesContainer.innerHTML = '';

    // Itereer over de games array en maak cards aan
    data.results.forEach(game => {
      const card = createGameCard(game);
      gamesContainer.appendChild(card);
    });
    //

    // Resultaten teller updaten
    resultsCount.textContent = `${totalGames.toLocaleString()} games gevonden`;

    // Load More knop tonen/verbergen
    const hasMore = data.next !== null;
    loadMoreBtn.style.display = hasMore ? 'block' : 'none';

  } catch (error) {
    showError(gamesContainer, 'Kon games niet laden. Probeer opnieuw.');
    console.error(error);
  }

  isLoading = false;
};

// 
// Load More knop
// 
loadMoreBtn.addEventListener('click', () => {
  currentPage++;
  loadGames();
});

// 
// Zoekfunctie met debounce
// 

// wacht 500ms na het typen voor de API call
const debounce = (func, delay) => {
  let timeout;
  // Callback functie die de timer reset bij elke toetsaanslag
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
};

// Zoeken uitvoeren
const handleSearch = debounce((value) => {
  // Formulier validatie: minimum 2 karakters of leeg
  if (value.length === 1) {
    showToast('Typ minstens 2 karakters om te zoeken');
    return;
  }

  currentSearch = value;
  currentPage = 1;
  loadGames(true);
}, 500);

// Event op de zoekbalk
searchInput.addEventListener('input', (e) => {
  const value = e.target.value.trim();

  // Toon/verberg het X icoontje
  if (searchClear) {
    searchClear.classList.toggle('visible', value.length > 0);
  }

  handleSearch(value);
});

// Zoekbalk leegmaken via X knop
if (searchClear) {
  searchClear.addEventListener('click', () => {
    searchInput.value = '';
    searchClear.classList.remove('visible');
    currentSearch = '';
    loadGames(true);
  });
}

// 
// Thema toggle (dark/light)
// 
const applyTheme = (theme) => {
  document.body.setAttribute('data-theme', theme);
  themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
  saveTheme(theme);
};

themeToggle.addEventListener('click', () => {
  const current = document.body.getAttribute('data-theme');
  applyTheme(current === 'dark' ? 'light' : 'dark');
});

// 
// Navigatie tussen pagina's
// 
document.querySelectorAll('[data-page]').forEach(btn => {
  btn.addEventListener('click', () => {
    const page = btn.dataset.page;

    // Alle paginas verbergen
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));

    // Juiste pagina tonen
    document.getElementById(`page-${page}`).classList.add('active');
    btn.classList.add('active');
  });
});

// 
// App opstarten
// 
const init = () => {
  // Opgeslagen thema toepassen
  applyTheme(getSavedTheme());

  // Collection tellers updaten
  updateCollectionCounts();

  // Games laden
  loadGames();
};

init();