document.addEventListener('DOMContentLoaded', function() {
    if (!navigator.geolocation) {
        alert("La géolocalisation n'est pas supportée par votre navigateur.");
        return;
    }

    // Initialisation de la carte
    const map = L.map('map').setView([0, 0], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
    }).addTo(map);

    let exploredAreas = [];

    // Fonction pour dessiner les zones explorées
    function markExploredArea(lat, lng) {
        const radius = 50;  // Rayon de 50px autour du point de l'utilisateur
        const circle = L.circle([lat, lng], { radius: radius, color: 'blue', fillOpacity: 0.3 }).addTo(map);
        exploredAreas.push(circle);
    }

    // Suivi de la position de l'utilisateur
    navigator.geolocation.watchPosition(position => {
        const { latitude, longitude } = position.coords;

        map.setView([latitude, longitude], 15);  // Centrer la carte sur la position actuelle

        markExploredArea(latitude, longitude);  // Marquer la zone explorée
    }, error => {
        console.error('Erreur de géolocalisation :', error);
        alert('Impossible de récupérer votre position.');
    }, {
        enableHighAccuracy: true
    });
});
