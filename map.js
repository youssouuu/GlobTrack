// Intégration de la carte avec l'API (par exemple OpenStreetMap ou Google Maps)
function initMap() {
    const map = L.map('map-container').setView([50.8503, 4.3517], 13);  // Position initiale (ex. Bruxelles)

    // Ajouter la couche de carte
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    // Fonction pour afficher un cercle autour de l'utilisateur
    function showUserPosition() {
        const userCircle = L.circle([50.8503, 4.3517], {
            color: 'blue',
            fillColor: '#30f',
            fillOpacity: 0.5,
            radius: 50
        }).addTo(map);

        map.setView([50.8503, 4.3517], 13); // Centrer la carte sur l'utilisateur
    }

    showUserPosition();
}
