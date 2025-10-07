document.addEventListener('DOMContentLoaded', () => {
    const gridEl = document.getElementById('discoverGrid');
    const visitEl = document.getElementById('visitMessage');
    const dataUrl = 'data/discover.json';

    // visit message
    function updateVisitMessage() {
        const key = 'discover-last-visit';
        const now = Date.now();
        const last = localStorage.getItem(key);

        if (!last) {
            visitEl.textContent = 'Welcome! Let us know if you have any questions.';
        } else {
            const lastMs = Number(last);
            const diffMs = now - lastMs;
            const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

            if (diffDays < 1) {
                visitEl.textContent = 'Back so soon! Awesome!';
            } else if (diffDays === 1) {
                visitEl.textContent = 'You last visited 1 day ago.';
            } else {
                visitEl.textContent = `You last visited ${diffDays} days ago.`;
            }
        }

        localStorage.setItem(key, String(now));
    }

    updateVisitMessage();

    // grid
    async function loadDiscover() {
        try {
            const res = await fetch(dataUrl);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const items = await res.json();

            const places = Array.isArray(items) ? items : (items.places || items.items || []);

            const toRender = places.slice(0, 8);

            gridEl.innerHTML = '';

            toRender.forEach((place, index) => {
                const card = document.createElement('article');
                card.className = 'discover-card';
                const areaName = `card${index + 1}`;
                card.setAttribute('data-area', areaName);

                const fig = document.createElement('figure');
                const img = document.createElement('img');
                img.setAttribute('src', `images/${place.image}`);
                img.setAttribute('alt', place.title || place.name || `Place ${index + 1}`);
                img.setAttribute('loading', 'lazy');
                fig.appendChild(img);

                const h2 = document.createElement('h2');
                h2.textContent = place.title || place.name || `Place ${index + 1}`;

                const addr = document.createElement('address');
                addr.textContent = place.address || '';

                const p = document.createElement('p');
                p.textContent = place.description || '';

                const btn = document.createElement('button');
                btn.className = 'learn-btn';
                btn.type = 'button';
                btn.textContent = 'Learn more';
                if (place.url) {
                    btn.addEventListener('click', () => {
                        window.open(place.url, '_blank', 'noopener');
                    });
                } else {
                    btn.addEventListener('click', () => {
                        alert(place.title + '\n\n' + (place.description || ''));
                    });
                }

                // card
                card.appendChild(h2);
                card.appendChild(fig);
                card.appendChild(p);
                card.appendChild(addr);
                card.appendChild(btn);

                gridEl.appendChild(card);
            });

        } catch (err) {
            console.error('Error loading data:', err);
            gridEl.innerHTML = '<p>Unable to load content.</p>';
        }
    }

    loadDiscover();
});
