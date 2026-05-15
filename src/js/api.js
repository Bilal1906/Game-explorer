// API sleutel uit de .env file 
const API_KEY = import.meta.env.VITE_RAWG_API_KEY;
const BASE_URL = 'https://api.rawg.io/api';

// 
// Haal een lijst van games op met filters
// 
export const fetchGames = async ({ 
  page = 1, 
  search = '', 
  genre = '', 
  platform = '', 
  ordering = '-rating' 
} = {}) => {

  // Bouw de URL op met de juiste parameters
  const params = new URLSearchParams({
    key: API_KEY,
    page,
    page_size: 20,
    ordering,
  });

  // Voeg optionele filters toe als ze ingevuld zijn
  if (search)   params.append('search', search);
  if (genre)    params.append('genres', genre);
  if (platform) params.append('platforms', platform);

  // Fetch de data van de API (async/await)
  const response = await fetch(`${BASE_URL}/games?${params}`);

  // Controleer of de request gelukt is
  if (!response.ok) {
    throw new Error(`API fout: ${response.status}`);
  }

  // Zet de response om naar JSON en geef terug
  const data = await response.json();
  return data;
};

// 
// Haal de details van 1 specifieke game op
// 
export const fetchGameDetail = async (gameId) => {

  const response = await fetch(
    `${BASE_URL}/games/${gameId}?key=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error(`API fout: ${response.status}`);
  }

  const data = await response.json();
  return data;
};