// api/avatar.js
import { Telegraf } from 'telegraf';

// Храним URL аватарки в памяти (можно заменить на Redis или файл позже)
let userAvatarUrl = 'https://engitt.vercel.app/img/vaatartatar.png'; // fallback

// Создаем бота
const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

// Когда ты отправляешь боту фото — он сохраняет его URL
bot.on('photo', async (ctx) => {
    try {
        const photo = ctx.message.photo.pop(); // берем самое большое фото
        const fileId = photo.file_id;

        // Получаем путь к файлу
        const file = await ctx.telegram.getFile(fileId);
        const fileUrl = `https://api.telegram.org/file/bot${process.env.TELEGRAM_BOT_TOKEN}/${file.file_path}`;

        userAvatarUrl = fileUrl;
        console.log('✅ Аватарка обновлена:', fileUrl);

        await ctx.reply('📸 Аватарка успешно обновлена на сайте!');
    } catch (error) {
        console.error('❌ Ошибка при обработке фото:', error);
        await ctx.reply('Не удалось обновить аватарку.');
    }
});

// Обработчик вебхука для Telegram
export const config = {
    api: {
        bodyParser: false, // Отключаем body parser для raw body
    },
};

// Основной обработчик запросов
export default async function handler(req, res) {
    if (req.method === 'POST') {
        // Это вебхук от Telegram — передаем запрос боту
        await bot.handleUpdate(req.body);
        return res.status(200).end();
    }

    if (req.method === 'GET') {
        // Это запрос от твоего сайта — отдаём URL аватарки
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
        return res.status(200).json({ avatarUrl: userAvatarUrl });
    }

    res.status(405).end(); // Метод не поддерживается
}
