// api/status.js
import { Client, GatewayIntentBits } from 'discord.js';

// Твой Discord ID
const YOUR_USER_ID = '1257675618175422576';

// Создаем клиента Discord (без входа в бота — только для чтения статуса)
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMembers
    ]
});

// Храним статус в памяти (можно заменить на Redis или файл, если нужно сохранять между перезапусками)
let currentStatus = 'offline';

// Обновляем статус при изменении
client.on('presenceUpdate', (oldPresence, newPresence) => {
    if (newPresence.userId === YOUR_USER_ID) {
        currentStatus = newPresence.status;
        console.log('🔄 Статус обновлён:', currentStatus);
    }
});

// Запускаем бота (токен из переменных среды)
if (!process.env.DISCORD_TOKEN) {
    console.error('❌ DISCORD_TOKEN не установлен');
} else {
    client.login(process.env.DISCORD_TOKEN).catch(console.error);
}

// Экспортируем Vercel Serverless Function
export default async function handler(req, res) {
    // Разрешаем CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Только GET-запросы
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Метод не поддерживается' });
    }

    // Возвращаем текущий статус
    res.status(200).json({ status: currentStatus });
}
