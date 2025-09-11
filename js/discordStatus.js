// /js/discordStatus.js
async function updateDiscordStatus() {
    try {
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
            statusEl.style.opacity = '0';
            setTimeout(() => {
                statusEl.className = 'discordStatus status-' + newStatus;
                statusEl.dataset.currentStatus = newStatus;
                statusEl.style.opacity = '1';
            }, 150);
        }

        // Отображаем активность
        const activityEl = document.querySelector('.discordActivityText');
        if (activityEl && data.activity) {
            let activityText = '';
            switch (data.activity.type) {
                case 0: // Играет в...
                    activityText = `🎮 Играет в ${data.activity.name}`;
                    break;
                case 1: // Стримит
                    activityText = `🔴 Стримит ${data.activity.name}`;
                    break;
                case 2: // Слушает
                    activityText = `🎧 Слушает ${data.activity.name}`;
                    break;
                case 3: // Смотрит
                    activityText = `📺 Смотрит ${data.activity.name}`;
                    break;
                default:
                    activityText = data.activity.name;
            }
            activityEl.innerText = activityText;
        } else if (activityEl) {
            activityEl.innerText = '';
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
