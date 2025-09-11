// background.js
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url.includes('vk.com')) {
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            func: getVKMusic
        }, (results) => {
            if (results && results[0] && results[0].result) {
                const music = results[0].result;
                if (music.title && music.artist) {
                    // Отправляем на твой сервер
                    fetch('https://engitt.vercel.app/api/music', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(music)
                    }).catch(console.error);
                }
            }
        });
    }
});

function getVKMusic() {
    try {
        const titleEl = document.querySelector('.audio_page_player_title._audio_page_player_title');
        const artistEl = document.querySelector('.audio_page_player_artist._audio_page_player_artist');
        if (titleEl && artistEl) {
            return {
                title: titleEl.innerText.trim(),
                artist: artistEl.innerText.trim()
            };
        }
    } catch (e) {
        console.error('Ошибка при чтении музыки:', e);
    }
    return null;
}
