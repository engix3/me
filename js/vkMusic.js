// /js/vkMusic.js
async function updateVKMusic() {
    try {
        const response = await fetch('/api/music');
        const data = await response.json();

        const titleEl = document.querySelector('.current-song-title');
        const artistEl = document.querySelector('.current-song-artist');

        if (titleEl) titleEl.innerText = data.title;
        if (artistEl) artistEl.innerText = data.artist;

        console.log('🎵 Обновлён трек:', `${data.artist} — ${data.title}`);
    } catch (error) {
        console.error('❌ Ошибка при обновлении музыки:', error);
    }
}

// Обновляем при загрузке
document.addEventListener('DOMContentLoaded', updateVKMusic);

// Обновляем каждые 10 секунд
setInterval(updateVKMusic, 10000);
