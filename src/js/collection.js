// 
// collection.js — Collectie pagina logica
//

import { getCollection, removeFromCollection } from './storage.js';
import { showToast } from './ui.js';
import { updateCollectionCounts } from './cards.js';

// Huidige actieve tab bijhouden
let currentTab = 'favorites';

// 
// Render de collectie pagina
// 
export const renderCollection = () => {
  const container = document.getElementById('collectionContainer');
  const emptyState = document.getElementById('emptyCollection');

  // Haal de games op uit localStorage op basis van actieve tab
  const games = getCollection(currentTab);

  // Lege state tonen of verbergen
  if (games.length === 0) {
    container.innerHTML = '';
    emptyState.style.display = 'block';
    return;
  }

  emptyState.style.display = 'none';

  // Games weergeven als cards
  container.innerHTML = '';

  games.forEach(game => {
    const card = createCollectionCard(game);
    container.appendChild(card);
  });
};

// 
// Maak een collectie card aan
// 
const createCollectionCard = (game) => {
  const year = game.released ? game.released.slice(0, 4) : 'N/A';
  const rating = game.rating ? `⭐ ${game.rating}` : 'N/A';

  const image = game.background_image
    ? `<img class="card-img" src="${game.background_image}" alt="${game.name}" loading="lazy" />`
    : `<div class="card-img-placeholder">🎮</div>`;

  const genres = game.genres
    ? game.genres.slice(0, 2).map(g => `<span class="genre-tag">${g.name}</span>`).join('')
    : '';

  const card = document.createElement('div');
  card.className = 'game-card';
  card.dataset.id = game.id;

  card.innerHTML = `
    <div class="card-img-wrap">
      ${image}
      <span class="card-rating">${rating}</span>
    </div>
    <div class="card-body">
      <div class="card-title">${game.name}</div>
      <div class="card-meta">
        <span>${year}</span>
      </div>
      <div class="card-genres">${genres}</div>
      <div class="card-actions">
        <button class="action-btn btn-remove" data-id="${game.id}">
          🗑️ Verwijderen
        </button>
      </div>
    </div>
  `;

  
  // Verwijder knop
  card.querySelector('.btn-remove').addEventListener('click', (e) => {
    e.stopPropagation();
    removeFromCollection(currentTab, game.id);
    updateCollectionCounts();
    showToast(`${game.name} verwijderd uit je collectie`);
    renderCollection();

    // Update de card op de homepage als die zichtbaar is
    const homeCard = document.querySelector(`#gamesContainer .game-card[data-id="${game.id}"]`);
    if (homeCard) {
      const btn = homeCard.querySelector(`.btn-${currentTab === 'favorites' ? 'fav' : currentTab === 'played' ? 'played' : 'wishlist'}`);
      if (btn) {
        btn.classList.remove(`active-fav`, `active-played`, `active-wishlist`);
        if (currentTab === 'favorites') btn.textContent = '🤍 Favorite';
        if (currentTab === 'played')    btn.textContent = '🎮 Played';
        if (currentTab === 'wishlist')  btn.textContent = '☆ Wishlist';
      }
    }
  });

  return card;
};

// 
// Initialiseer de collectie pagina tabs
// 
export const initCollection = () => {
  const tabBtns = document.querySelectorAll('.tab-btn');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Actieve tab updaten
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Huidige tab opslaan en pagina herladen
      currentTab = btn.dataset.tab;
      renderCollection();
    });
  });
};