// Vérifie si l'utilisateur est déjà connecté en consultant le LocalStorage
window.onload = function() {
    const currentPage = window.location.pathname.split("/").pop();

    if (currentPage === 'index.html' || currentPage === '') {
        autoLogin();
    } else if (currentPage === 'map.html') {
        initMap();
    }
};

// ----- Fonction pour la Connexion -----
document.getElementById('loginBtn')?.addEventListener('click', function() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username && password) {
        // Stockage des informations utilisateur dans le LocalStorage
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);

        // Redirection vers la page de la carte après connexion réussie
        window.location.href = 'map.html';
    } else {
        alert("Veuillez entrer un nom d'utilisateur et un mot de passe.");
    }
});

// ----- Connexion Automatique -----
function autoLogin() {
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');

    if (storedUsername && storedPassword) {
        // Si des informations sont déjà stockées, redirection automatique
        window.location.href = 'map.html';
    }
}

// ----- Initialisation de la Carte -----
function initMap() {
    if (!navigator.geolocation) {
        alert("La géolocalisation n'est pas supportée par votre navigateur.");
        return;
    }

    navigator.geolocation.getCurrentPosition(position => {
        const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };

        const map = new google.maps.Map(document.getElementById('map'), {
            center: userLocation,
            zoom: 15,
            styles: getGrayscaleStyle()
        });

        const exploredAreas = JSON.parse(localStorage.getItem('exploredAreas')) || [];

        const marker = new google.maps.Marker({
            position: userLocation,
            map: map,
            title: "Vous êtes ici"
        });

        // Dégrise la zone autour de la position actuelle
        revealArea(map, userLocation, exploredAreas);

        // Met à jour la carte à chaque mouvement
        watchUserPosition(map, exploredAreas);

    }, () => {
        alert("Impossible de récupérer votre position.");
    });
}

// ----- Fonction pour Dégriser la Zone Autour de l'Utilisateur -----
function revealArea(map, position, exploredAreas) {
    const radius = 50; // Rayon de dégrisement en pixels

    const circle = new google.maps.Circle({
        strokeColor: '#00FF00',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#00FF00',
        fillOpacity: 0.2,
        map: map,
        center: position,
        radius: radius
    });

    // Stocke les zones explorées pour qu'elles restent dégrisées
    exploredAreas.push(position);
    localStorage.setItem('exploredAreas', JSON.stringify(exploredAreas));
}

// ----- Suivi en Temps Réel de la Position de l'Utilisateur -----
function watchUserPosition(map, exploredAreas) {
    navigator.geolocation.watchPosition(position => {
        const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };

        map.setCenter(userLocation);
        revealArea(map, userLocation, exploredAreas);
    });
}

// ----- Style pour Griser la Carte -----
function getGrayscaleStyle() {
    return [
        {
            featureType: "all",
            stylers: [
                { saturation: -100 },
                { lightness: 20 }
            ]
        }
    ];
}
