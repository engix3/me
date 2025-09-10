// /js/discordStatus.js

async function updateDiscordStatus() {
    try {
        // ⚠️ ЗАМЕНИ ЭТОТ URL НА СВОЙ С RAILWAY
        const response = await fetch('https://879a741c-fc26-471b-98a8-fdf072aea6f4-00-1c3e2gc4b6loo.pike.replit.dev/api/status');
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
