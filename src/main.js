import { fetchGames } from './js/api.js';

// 
// Test: haal games op en toon in de console
// 
const testAPI = async () => {
  try {
    console.log('Games ophalen...');
    const data = await fetchGames();
    console.log('Games ontvangen:', data);
    console.log('Aantal games:', data.results.length);
  } catch (error) {
    console.error('Er ging iets mis:', error);
  }
};

testAPI();