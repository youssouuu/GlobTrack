let map, userPosition, exploredAreas = [];
let explorationPercentage = 0;

document.addEventListener("DOMContentLoaded", () => {
    checkLoginStatus();
});

function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username && password) {
        localStorage.setItem("user", JSON.stringify({ username, password }));
        document.getElementById("loginContainer").style.display = "none";
        document.getElementById("mapContainer").style.display = "block";
        initializeMap();
    } else {
        alert("Veuillez entrer un nom d'utilisateur et un mot de passe.");
    }
}

function logout() {
    localStorage.removeItem("user");
    location.reload();
}

function checkLoginStatus() {
    const user = localStorage.getItem("user");
    if (user) {
        document.getElementById("loginContainer").style.display = "none";
        document.getElementById("mapContainer").style.display = "block";
        initializeMap();
    }
}

function initializeMap() {
    navigator.geolocation.getCurrentPosition(position => {
        userPosition = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };

        map = new google.maps.Map(document.getElementById('map'), {
            center: userPosition,
            zoom: 15,
            disableDefaultUI: true
        });

        trackMovement();
        grayUnexploredAreas();
    }, () => {
        alert("Impossible de récupérer votre position.");
    });
}

function trackMovement() {
    navigator.geolocation.watchPosition(position => {
        userPosition = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };

        // Marquer le parcours
        const marker = new google.maps.Circle({
            strokeColor: "#00FF00",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#00FF00",
            fillOpacity: 0.35,
            map,
            center: userPosition,
            radius: 50  // Rayon de 50px dégrisera la zone
        });

        exploredAreas.push(userPosition);
        updateExploration();
        map.setCenter(userPosition);
    });
}

function grayUnexploredAreas() {
    const bounds = map.getBounds();
    if (!bounds) return;

    const overlay = new google.maps.Rectangle({
        strokeColor: "#888888",
        strokeOpacity: 0.5,
        strokeWeight: 2,
        fillColor: "#888888",
        fillOpacity: 0.5,
        map: map,
        bounds: bounds
    });

    // Dégriser la zone autour de l'utilisateur
    exploredAreas.forEach(area => {
        new google.maps.Circle({
            strokeColor: "#121212",
            strokeOpacity: 0,
            fillColor: "#121212",
            fillOpacity: 1,
            map,
            center: area,
            radius: 50
        });
    });
}

function updateExploration() {
    explorationPercentage = Math.min(100, explorationPercentage + 0.5); // Simulation de l'exploration
    document.getElementById("explorationStats").innerText = `Exploration : ${explorationPercentage.toFixed(1)}%`;
          }
