// ui.js - UI components and modal management
import { isInWishlist } from './wishlist.js';

// Create game card HTML using template literals
export function createGameCard(game) {
    const inWishlist = isInWishlist(game.id);
    const wishlistBtnClass = inWishlist ? 'btn btn--primary' : 'btn btn--ghost';
    const wishlistBtnText = inWishlist ? 'Added' : 'Add';

    return `
        <article class="card">
            <figure>
                <img src="${game.background_image || 'images/placeholder.jpg'}" 
                    alt="${game.name}" 
                    loading="lazy">
            </figure>
            <div class="meta">
                <h2>${game.name}</h2>
                <p><strong>Released:</strong> ${game.released || 'N/A'}</p>
                <p><strong>Rating:</strong> ${game.rating || 'N/A'} / 5</p>
                <p><strong>Genres:</strong> ${game.genres?.map(g => g.name).join(', ') || 'N/A'}</p>
                <div class="actions">
                    <button class="btn btn--ghost" data-game-id="${game.id}">View Details</button>
                    <button class="${wishlistBtnClass}" data-wishlist-id="${game.id}">${wishlistBtnText}</button>
                </div>
            </div>
        </article>
    `;
}

// Open modal
export function openModal() {
    const modal = document.getElementById('modal');
    if (modal) {
        modal.setAttribute('aria-hidden', 'false');
        modal.querySelector('.modal-content')?.focus();
    }
}

// Close modal
export function closeModal() {
    const modal = document.getElementById('modal');
    if (modal) {
        modal.setAttribute('aria-hidden', 'true');
    }
}