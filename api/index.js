// api/index.js
export default function handler(req, res) {
    // Устанавливаем заголовок Content-Type
    res.setHeader('Content-Type', 'text/html; charset=utf-8');

    // HTML-страница с красивым дизайном
    const html = `
<!DOCTYPE html>
<html lang="ru">
<head>
<link rel="icon" href="/img/heart.png" type="image/x-icon">
<link href="https://api.fontshare.com/v2/css?f[]=satoshi@1&display=swap" rel="stylesheet">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>API — engi</title>
    <style>
        body {
            background-color: #222222;
            color: white;
            font-family: 'Satoshi', sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            padding: 20px;
            text-align: center;
        }
        .container {
            max-width: 800px;
            background: rgba(255, 255, 255, 0.05);
            padding: 40px;
            border-radius: 15px;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        h1 {
            font-size: 2.5em;
            margin-bottom: 10px;
            background: linear-gradient(90deg, #7289DA, #43b581);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        p {
            font-size: 1.1em;
            line-height: 1.6;
            margin-bottom: 30px;
            color: #ccc;
        }
        .endpoint {
            background: rgba(255, 255, 255, 0.07);
            padding: 15px;
            border-radius: 10px;
            margin: 15px 0;
            text-align: left;
            border-left: 4px solid #7289DA;
        }
        .endpoint h3 {
            margin: 0 0 5px 0;
            color: #fff;
        }
        .endpoint code {
            display: block;
            background: rgba(0, 0, 0, 0.3);
            padding: 8px;
            border-radius: 5px;
            font-family: monospace;
            margin-top: 5px;
            color: #43b581;
        }
        .note {
            font-size: 0.9em;
            color: #aaa;
            margin-top: 40px;
            font-style: italic;
        }
        a {
            color: #7289DA;
            text-decoration: none;
        }
        a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>📡 API engi</h1>
        <p>Привет! Это публичное API моего профиля. Ты можешь использовать его для получения моего статуса Discord или аватарки из Telegram.</p>

        <div class="endpoint">
            <h3>🔹 Статус Discord</h3>
            <code>GET /api/status</code>
            <p>Возвращает JSON с моим текущим статусом в Discord: <code>online</code>, <code>idle</code>, <code>dnd</code>, <code>offline</code>.</p>
        </div>

        <div class="endpoint">
            <h3>🔹 Аватарка из Telegram</h3>
            <code>GET /api/avatar</code>
            <p>Возвращает JSON с URL моей текущей аватарки, которую я установил через Telegram-бота.</p>
        </div>

        <div class="note">
            👾 Сделано с ❤️ для neprivet.com<br>
            <a href="https://github.com/engix3/me" target="_blank">Исходный код на GitHub</a>
        </div>
    </div>
</body>
</html>
    `;

    res.status(200).send(html);
}
