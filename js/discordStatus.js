// /js/discordStatus.js

async function updateDiscordStatus() {
    try {
        const response = await fetch('/api/status'); // 👈 Локальный путь — работает!
        const data = await response.json();

        const statusEl = document.getElementById('discordStatusIndicator');
        if (!statusEl) {
            console.warn('Элемент #discordStatusIndicator не найден');
            return;
        }

        const validStatuses = ['online', 'idle', 'dnd', 'offline'];
        const status = validStatuses.includes(data.status) ? data.status : 'offline';

        // Устанавливаем нужный класс → подставляется нужная иконка
        statusEl.className = 'discordStatus status-' + status;

        console.log('✅ Статус обновлён:', status);

    } catch (error) {
        console.error('❌ Ошибка при обновлении статуса:', error);
        const fallbackEl = document.getElementById('discordStatusIndicator');
        if (fallbackEl) {
            fallbackEl.className = 'discordStatus status-offline';
        }
    }
}

// Обновляем статус сразу при загрузке
document.addEventListener('DOMContentLoaded', () => {
    updateDiscordStatus();
    // И затем каждые 30 секунд
    setInterval(updateDiscordStatus, 30000);
});
