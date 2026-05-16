// De 3 collecties die we bijhouden
const KEYS = {
  favorites: 'gameexplorer_favorites',
  played:    'gameexplorer_played',
  wishlist:  'gameexplorer_wishlist',
  theme:     'gameexplorer_theme',
};

// 
// Haal een collectie op uit localStorage
// 
export const getCollection = (type) => {
  const data = localStorage.getItem(KEYS[type]);
  return data ? JSON.parse(data) : [];
};

// 
// Sla een collectie op in localStorage
// 
export const saveCollection = (type, collection) => {
  localStorage.setItem(KEYS[type], JSON.stringify(collection));
};

// 
// Voeg een game toe aan een collectie
// 
export const addToCollection = (type, game) => {
  const collection = getCollection(type);
  // Controleer of game al in de collectie zit
  const exists = collection.some(g => g.id === game.id);
  if (!exists) {
    collection.push(game);
    saveCollection(type, collection);
  }
};

// 
// Verwijder een game uit een collectie
// 
export const removeFromCollection = (type, gameId) => {
  const collection = getCollection(type);
  const updated = collection.filter(g => g.id !== gameId);
  saveCollection(type, updated);
};

// 
// Controleer of een game in een collectie zit
// 
export const isInCollection = (type, gameId) => {
  const collection = getCollection(type);
  return collection.some(g => g.id === gameId);
};

// 
// Thema opslaan en ophalen
// 
export const saveTheme = (theme) => {
  localStorage.setItem(KEYS.theme, theme);
};

export const getSavedTheme = () => {
  return localStorage.getItem(KEYS.theme) || 'dark';
};