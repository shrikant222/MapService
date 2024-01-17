function showLocation() {
    const pinCodeInput = document.getElementById('pinCodeInput').value;

    // Check if PIN code is provided
    if (!pinCodeInput) {
        alert('Please enter a PIN code');
        return;
    }

    // Use OpenStreetMap Nominatim API to get coordinates
    const apiUrl = `https://nominatim.openstreetmap.org/search?format=json&postalcode=${encodeURIComponent(pinCodeInput)}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                const coordinates = [parseFloat(data[0].lat), parseFloat(data[0].lon)];
                displayMap(coordinates);
            } else {
                alert('Location not found for the given PIN code');
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

function displayMap(coordinates) {
    const map = L.map('map').setView(coordinates, 12);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    const marker = L.marker(coordinates).addTo(map);
    marker.bindPopup('Location');
}
