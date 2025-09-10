// /js/telegramAvatar.js
async function updateAvatarFromTelegram() {
    try {
        const response = await fetch('/api/avatar'); // Локальный путь — работает!
        const data = await response.json();

        const avatarEl = document.querySelector('.avatar'); // главная аватарка
        if (avatarEl) {
            avatarEl.src = data.avatarUrl;
            console.log('✅ Аватарка обновлена из Telegram');
        }
    } catch (error) {
        console.error('❌ Ошибка при обновлении аватарки:', error);
    }
}

// Обновляем при загрузке страницы
document.addEventListener('DOMContentLoaded', updateAvatarFromTelegram);

// Обновляем каждые 5 минут (300000 мс)
setInterval(updateAvatarFromTelegram, 300000);
