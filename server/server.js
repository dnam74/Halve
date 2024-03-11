const express = require('express');
const app = express();
const cors = require('cors');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

app.use(cors({
    origin: 'http://localhost:3000'
}));

app.get('/:crypto', (req, res) => {
    const crypto = req.params.crypto;
    const url = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/info?symbol=${crypto}`;

    axios.get(url, {
        headers: {
            'X-CMC_PRO_API_KEY': process.env.API_KEY
        }
    })
    .then(response => {
        const data = response.data;
        res.json({ data });
    })
    .catch(error => {
        console.error('Error fetching cryptocurrency info:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    });
});

app.listen(8000, () => {
    console.log('Server listening on port 8000');
});
