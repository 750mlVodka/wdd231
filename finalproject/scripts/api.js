const API_KEY = 'fa15ac885d114a8a891fcb203c0b9e9b';
const BASE = 'https://api.rawg.io/api';

async function safeFetch(url) {
    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return await res.json();
    } catch (err) {
        console.error('API fetch error:', err);
        throw err;
    }
}

export async function searchGames(query, page_size = 12) {
    const q = encodeURIComponent(query);
    const url = `${BASE}/games?key=${API_KEY}&search=${q}&page_size=${page_size}`;
    return await safeFetch(url);
}

export async function getGameDetails(id) {
    const url = `${BASE}/games/${id}?key=${API_KEY}`;
    return await safeFetch(url);
}

export async function getTrending(page_size = 12) {
    const url = `${BASE}/games/lists/popular?key=${API_KEY}&page_size=${page_size}`;
    return await safeFetch(url);
}

export async function fetchPlaceholder() {
    const res = await fetch('data/placeholder.json');
    return await res.json();
}
