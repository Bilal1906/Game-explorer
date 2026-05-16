import { isInCollection, addToCollection, removeFromCollection } from './storage.js';
import { showToast } from './ui.js';
import { getCollection } from './storage.js';

// 
// Maak een game card aan 
// 
export const createGameCard = (game) => {

  // Haal de status op uit localStorage
  const isFav      = isInCollection('favorites', game.id);
  const isPlayed   = isInCollection('played', game.id);
  const isWishlist = isInCollection('wishlist', game.id);

  // Genres samenvoegen (max 2 tonen)
  const genres = game.genres
    ? game.genres.slice(0, 2).map(g => `<span class="genre-tag">${g.name}</span>`).join('')
    : '';

  // Rating tonen
  const rating = game.rating ? `⭐ ${game.rating}` : 'N/A';

  // Afbeelding of placeholder
  const image = game.background_image
    ? `<img class="card-img" src="${game.background_image}" alt="${game.name}" loading="lazy" />`
    : `<div class="card-img-placeholder">🎮</div>`;

  // Release jaar
  const year = game.released ? game.released.slice(0, 4) : 'N/A';

  // Platforms samenvoegen (max 3)
  const platforms = game.platforms
    ? game.platforms.slice(0, 3).map(p => p.platform.name).join(', ')
    : 'N/A';

  // Card HTML via template literal
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
        <span>${platforms}</span>
      </div>
      <div class="card-genres">${genres}</div>
      <div class="card-actions">
        <button class="action-btn btn-fav ${isFav ? 'active-fav' : ''}" data-id="${game.id}">
          ${isFav ? '❤️ Saved' : '🤍 Favorite'}
        </button>
        <button class="action-btn btn-played ${isPlayed ? 'active-played' : ''}" data-id="${game.id}">
          ${isPlayed ? '✅ Played' : '🎮 Played'}
        </button>
        <button class="action-btn btn-wishlist ${isWishlist ? 'active-wishlist' : ''}" data-id="${game.id}">
          ${isWishlist ? '⭐ Listed' : '☆ Wishlist'}
        </button>
      </div>
    </div>
  `;

  // Klik op de kaart zelf → open detail modal
  card.addEventListener('click', (e) => {
    // Niet openen als je op een actieknop klikt
    if (e.target.closest('.action-btn')) return;
    // Event sturen naar main.js
    card.dispatchEvent(new CustomEvent('openDetail', {
      bubbles: true,
      detail: { gameId: game.id }
    }));
  });

  // Favoriet knop
  card.querySelector('.btn-fav').addEventListener('click', (e) => {
    e.stopPropagation();
    const btn = e.currentTarget;
    if (isInCollection('favorites', game.id)) {
      removeFromCollection('favorites', game.id);
      btn.classList.remove('active-fav');
      btn.textContent = '🤍 Favorite';
      showToast(`${game.name} verwijderd uit Favorites`);
    } else {
      addToCollection('favorites', game);
      btn.classList.add('active-fav');
      btn.textContent = '❤️ Saved';
      showToast(`${game.name} toegevoegd aan Favorites!`);
    }
    updateCollectionCounts();
  });

  // Gespeeld knop
  card.querySelector('.btn-played').addEventListener('click', (e) => {
    e.stopPropagation();
    const btn = e.currentTarget;
    if (isInCollection('played', game.id)) {
      removeFromCollection('played', game.id);
      btn.classList.remove('active-played');
      btn.textContent = '🎮 Played';
      showToast(`${game.name} verwijderd uit Played`);
    } else {
      addToCollection('played', game);
      btn.classList.add('active-played');
      btn.textContent = '✅ Played';
      showToast(`${game.name} toegevoegd aan Played!`);
    }
    updateCollectionCounts();
  });

  // Wishlist knop
  card.querySelector('.btn-wishlist').addEventListener('click', (e) => {
    e.stopPropagation();
    const btn = e.currentTarget;
    if (isInCollection('wishlist', game.id)) {
      removeFromCollection('wishlist', game.id);
      btn.classList.remove('active-wishlist');
      btn.textContent = '☆ Wishlist';
      showToast(`${game.name} verwijderd uit Wishlist`);
    } else {
      addToCollection('wishlist', game);
      btn.classList.add('active-wishlist');
      btn.textContent = '⭐ Listed';
      showToast(`${game.name} toegevoegd aan Wishlist!`);
    }
    updateCollectionCounts();
  });

  return card;
};

// 
// Update de tellers in de collection tabs
// 
export const updateCollectionCounts = () => {
  const favCount      = document.getElementById('favCount');
  const playedCount   = document.getElementById('playedCount');
  const wishlistCount = document.getElementById('wishlistCount');

  if (favCount)      favCount.textContent      = getCollection('favorites').length;
  if (playedCount)   playedCount.textContent   = getCollection('played').length;
  if (wishlistCount) wishlistCount.textContent = getCollection('wishlist').length;
};