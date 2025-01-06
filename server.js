const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const PORT = 3000;
const BLYNK_TOKEN = '3q-4VTpBX401-DzUXd2t04lWoRlzyDb1'; // Replace with your actual Blynk token

// Serve the static frontend
app.use(express.static(path.join(__dirname)));

// Serve the index.html by default
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Endpoint to control devices
app.get('/control', async (req, res) => {
    const { pin, value } = req.query; // Example: /control?pin=V1&value=1
    try {
        const response = await axios.get(`http://blynk.cloud/external/api/update?token=${BLYNK_TOKEN}&${pin}=${value}`);
        res.send(response.data);
    } catch (error) {
        res.status(500).send('Error controlling device');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

