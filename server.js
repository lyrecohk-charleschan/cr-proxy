// server.js
const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.get('/cr-proxy', async (req, res) => {
    const url = req.query.url;
    if (!url || !/^https:\/\/data\.cr\.gov\.hk\//.test(url)) {
        return res.status(400).send('Invalid target');
    }
    try {
        const resp = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0',
                'Accept': 'application/json'
            }
        });
        const data = await resp.text();
        res.set('Access-Control-Allow-Origin', '*');
        res.status(resp.status).send(data);
    } catch (e) {
        res.status(500).send('Proxy error');
    }
});
app.listen(3000, () => console.log('Proxy running on http://localhost:3000/cr-proxy?url='));
