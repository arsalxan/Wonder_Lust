const map = L.map('map').setView([listingGeometry.coordinates[1], listingGeometry.coordinates[0]], 9);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

const marker = L.marker([listingGeometry.coordinates[1], listingGeometry.coordinates[0]]).addTo(map);
marker.bindPopup(`<b>${listingTitle}</b><br>${listingLocation}`).openPopup();