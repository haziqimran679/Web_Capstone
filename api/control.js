const axios = require('axios');

module.exports = async (req, res) => {
    const { pin, value } = req.query;

    try {
        const response = await axios.get(`http://blynk.cloud/external/api/update?token=${process.env.BLYNK_TOKEN}&${pin}=${value}`);
        res.status(200).send(response.data);
    } catch (error) {
        res.status(500).send('Error controlling device');
    }
};
