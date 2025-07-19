const axios = require('axios');

async function geocodeLocation(location) {
    try {
        const response = await axios.get('https://nominatim.openstreetmap.org/search', {
            params: {
                q: location,
                format: 'json',
                limit: 1
            },
            headers: {
                'User-Agent': `WonderLustApp/1.0 (${process.env.SENDGRID_VERIFIED_SENDER_EMAIL})` // Replace with your actual email
            }
        });

        if (response.data && response.data.length > 0) {
            const { lat, lon } = response.data[0];
            return {
                type: 'Point',
                coordinates: [parseFloat(lon), parseFloat(lat)]
            };
        } else {
            console.warn(`No geocoding results for location: ${location}`);
            return null; // Or handle as an error
        }
    } catch (error) {
        console.error(`Error geocoding location ${location}:`, error.message);
        return null; // Or handle as an error
    }
}

module.exports = geocodeLocation;