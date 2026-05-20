// 
// modal.js — Game detail modal logica
// 
import { fetchGameDetail } from './api.js';
import { isInCollection, addToCollection, removeFromCollection } from './storage.js';
import { showToast } from './ui.js';
import { updateCollectionCounts } from './cards.js';

// DOM elementen
const modal       = document.getElementById('gameModal');
const modalBody   = document.getElementById('modalBody');
const modalClose  = document.getElementById('modalClose');
const modalOverlay = document.getElementById('modalOverlay');

// 
// Modal openen met game details
// 
export const openModal = async (gameId) => {
  // Modal tonen met loader
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';

  modalBody.innerHTML = `
    <div class="modal-loader">
      <div class="loader"></div>
      <p>Loading game details...</p>
    </div>
  `;

  try {
    // Game details ophalen van API
    const game = await fetchGameDetail(gameId);
    renderModalContent(game);
  } catch (error) {
    modalBody.innerHTML = `
      <div class="error-state">
        <p>⚠️ Kon game details niet laden.</p>
      </div>
    `;
    console.error(error);
  }
};

// 
// Modal sluiten
// 
export const closeModal = () => {
  modal.classList.remove('open');
  document.body.style.overflow = '';
};

//
// Modal inhoud renderen
// 
const renderModalContent = (game) => {
  // Afbeelding
  const image = game.background_image
    ? `<img class="modal-hero" src="${game.background_image}" alt="${game.name}" />`
    : `<div class="modal-hero-placeholder">🎮</div>`;

  // Rating
  const rating = game.rating ? `⭐ ${game.rating}/5` : 'N/A';

  // Metacritic score
  const metacritic = game.metacritic
    ? `🏆 Metacritic: ${game.metacritic}`
    : '';

  // Release datum
  const released = game.released
    ? `📅 ${game.released}`
    : '📅 N/A';

  // Speelduur
  const playtime = game.playtime
    ? `🕒 ~${game.playtime}u speeltijd`
    : '';

  // Platforms
  const platforms = game.platforms
    ? game.platforms.map(p => p.platform.name).join(', ')
    : 'N/A';

  // Genres als tags
  const genres = game.genres
    ? game.genres.map(g => `<span class="modal-tag">${g.name}</span>`).join('')
    : '';

  // Beschrijving (HTML tags verwijderen)
  const description = game.description_raw
    ? game.description_raw.slice(0, 500) + '...'
    : 'Geen beschrijving beschikbaar.';

  // Collectie status ophalen
  const isFav      = isInCollection('favorites', game.id);
  const isPlayed   = isInCollection('played', game.id);
  const isWishlist = isInCollection('wishlist', game.id);

  // Modal inhoud via template literal
  modalBody.innerHTML = `
    ${image}
    <h2 class="modal-title">${game.name}</h2>

    <div class="modal-meta">
      <span class="modal-meta-item">${rating}</span>
      <span class="modal-meta-item">${released}</span>
      ${metacritic ? `<span class="modal-meta-item">${metacritic}</span>` : ''}
      ${playtime ? `<span class="modal-meta-item">${playtime}</span>` : ''}
    </div>

    <p class="modal-description">${description}</p>

    <p class="modal-section-title">Genres</p>
    <div class="modal-tags">${genres}</div>

    <p class="modal-section-title">Platforms</p>
    <p style="font-size:0.85rem; color:var(--text-secondary); margin-bottom:1.5rem;">${platforms}</p>

    <div class="modal-actions">
      <button class="action-btn modal-btn-fav ${isFav ? 'active-fav' : ''}">
        ${isFav ? '❤️ Favoriet' : '🤍 Favoriet'}
      </button>
      <button class="action-btn modal-btn-played ${isPlayed ? 'active-played' : ''}">
        ${isPlayed ? '✅ Gespeeld' : '🎮 Gespeeld'}
      </button>
      <button class="action-btn modal-btn-wishlist ${isWishlist ? 'active-wishlist' : ''}">
        ${isWishlist ? '⭐ Wishlist' : '☆ Wishlist'}
      </button>
    </div>
  `;

  // Favoriet knop in modal
  modalBody.querySelector('.modal-btn-fav').addEventListener('click', () => {
    const btn = modalBody.querySelector('.modal-btn-fav');
    if (isInCollection('favorites', game.id)) {
      removeFromCollection('favorites', game.id);
      btn.classList.remove('active-fav');
      btn.textContent = '🤍 Favoriet';
      showToast(`${game.name} verwijderd uit Favorites`);
    } else {
      addToCollection('favorites', game);
      btn.classList.add('active-fav');
      btn.textContent = '❤️ Favoriet';
      showToast(`${game.name} toegevoegd aan Favorites!`);
    }
    updateCollectionCounts();
  });

  // Gespeeld knop in modal
  modalBody.querySelector('.modal-btn-played').addEventListener('click', () => {
    const btn = modalBody.querySelector('.modal-btn-played');
    if (isInCollection('played', game.id)) {
      removeFromCollection('played', game.id);
      btn.classList.remove('active-played');
      btn.textContent = '🎮 Gespeeld';
      showToast(`${game.name} verwijderd uit Played`);
    } else {
      addToCollection('played', game);
      btn.classList.add('active-played');
      btn.textContent = '✅ Gespeeld';
      showToast(`${game.name} toegevoegd aan Played!`);
    }
    updateCollectionCounts();
  });

  // Wishlist knop in modal
  modalBody.querySelector('.modal-btn-wishlist').addEventListener('click', () => {
    const btn = modalBody.querySelector('.modal-btn-wishlist');
    if (isInCollection('wishlist', game.id)) {
      removeFromCollection('wishlist', game.id);
      btn.classList.remove('active-wishlist');
      btn.textContent = '☆ Wishlist';
      showToast(`${game.name} verwijderd uit Wishlist`);
    } else {
      addToCollection('wishlist', game);
      btn.classList.add('active-wishlist');
      btn.textContent = '⭐ Wishlist';
      showToast(`${game.name} toegevoegd aan Wishlist!`);
    }
    updateCollectionCounts();
  });
};

// 
// Modal sluiten via knop en overlay
// 
modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);

// Modal sluiten via Escape toets
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});