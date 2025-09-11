// api/status.js
import { Client, GatewayIntentBits } from 'discord.js';

const YOUR_USER_ID = '1257675617675422576'; // Замени на свой ID
let currentStatus = 'offline';
let currentActivity = null;

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMembers
    ]
});

client.on('ready', () => {
    console.log(`✅ ${client.user.tag} успешно подключился!`);
});

client.on('presenceUpdate', (oldPresence, newPresence) => {
    if (newPresence.userId === YOUR_USER_ID) {
        currentStatus = newPresence.status;
        const activity = newPresence.activities[0];
        if (activity) {
            currentActivity = {
                name: activity.name,
                type: activity.type
            };
        } else {
            currentActivity = null;
        }
        console.log(`🔄 Статус: ${currentStatus}, Активность: ${activity ? activity.name : 'нет'}`);
    }
});

client.login(process.env.DISCORD_TOKEN).catch(console.error);

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Метод не поддерживается' });
    }

    res.status(200).json({ 
        status: currentStatus,
        activity: currentActivity
    });
}
