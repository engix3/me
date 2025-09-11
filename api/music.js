// api/music.js
let currentTrack = {
    title: 'lixo - musica',
    artist: 'lixo'
};

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { title, artist } = req.body;
        if (title && artist) {
            currentTrack = { title, artist };
            console.log('🎵 Сейчас играет:', `${artist} — ${title}`);
        }
        return res.status(200).json({ success: true });
    }

    if (req.method === 'GET') {
        res.setHeader('Access-Control-Allow-Origin', '*');
        return res.status(200).json(currentTrack);
    }

    res.status(405).end();
}
