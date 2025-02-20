const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000; // Use the PORT from the environment variable or default to 3000
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
    console.log(`Received control request: pin=${pin}, value=${value}`);

    try {
        // Make the API call to Blynk
        const response = await axios.get(`http://blynk.cloud/external/api/update?token=${BLYNK_TOKEN}&${pin}=${value}`);
        console.log(`Blynk response: ${response.data}`);
        res.send(response.data); // Send the response back to the client
    } catch (error) {
        console.error(`Error controlling device: ${error.message}`);
        res.status(500).send('Error controlling device');
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Function to send a request to the /api/control endpoint
function controlDevice(pin, value) {
    // Use fetch to send a GET request to the Vercel API
    fetch(`https://web-capstone.vercel.app/api/control?pin=${pin}&value=${value}`)
        .then(response => response.text())
        .then(data => {
            console.log(`Control response: ${data}`);

              // Update the button text to indicate status
              const button = document.getElementById(`pump-valve-${pin}`);
              if (value === 1) {
                  button.innerHTML = `Turn Off ${pin}`;
              } else {
                  button.innerHTML = `Turn On ${pin}`;
              }
              
            // Optionally, update the button text or state based on the response
        })
        .catch(error => {
            console.error('Error controlling device:', error);
        });
}


