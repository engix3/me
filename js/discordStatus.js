// /js/discordStatus.js
async function updateDiscordStatus() {
    try {
        // Используем локальный путь на Vercel
        const response = await fetch('/api/status');
        const data = await response.json();
        const statusEl = document.getElementById('discordStatusIndicator');
        if (!statusEl) {
            console.warn('Элемент #discordStatusIndicator не найден');
            return;
        }

        const validStatuses = ['online', 'idle', 'dnd', 'offline'];
        const newStatus = validStatuses.includes(data.status) ? data.status : 'offline';

        // Если статус изменился — анимируем
        if (statusEl.dataset.currentStatus !== newStatus) {
            // Плавно скрываем
            statusEl.style.opacity = '0';
            setTimeout(() => {
                // Меняем класс
                statusEl.className = 'discordStatus status-' + newStatus;
                // Сохраняем текущий статус
                statusEl.dataset.currentStatus = newStatus;
                // Плавно показываем
                statusEl.style.opacity = '1';
            }, 150);
        }

        console.log('✅ Статус обновлён:', newStatus);
    } catch (error) {
        console.error('❌ Ошибка при обновлении статуса:', error);
        const fallbackEl = document.getElementById('discordStatusIndicator');
        if (fallbackEl) {
            fallbackEl.className = 'discordStatus status-offline';
            fallbackEl.dataset.currentStatus = 'offline';
        }
    }
}

// Обновляем статус сразу при загрузке
document.addEventListener('DOMContentLoaded', () => {
    updateDiscordStatus();
    // И затем каждые 5 секунд
    setInterval(updateDiscordStatus, 5000);
});
