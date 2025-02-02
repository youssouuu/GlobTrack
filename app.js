let currentUser = null;
let currentTheme = localStorage.getItem('theme') || "light";
let map;
let userMarker;

function showRegister() {
    document.getElementById("login-form").style.display = "none";
    document.getElementById("register-form").style.display = "block";
}

function showLogin() {
    document.getElementById("login-form").style.display = "block";
    document.getElementById("register-form").style.display = "none";
}

function register() {
    const username = document.getElementById("new-username").value.trim();
    const password = document.getElementById("new-password").value.trim();
    const profilePic = document.getElementById("profile-pic").files[0];

    if (!username || !password) {
        alert("Veuillez remplir tous les champs.");
        return;
    }

    if (localStorage.getItem(username)) {
        alert("Ce nom d'utilisateur est déjà pris.");
        return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
        const userData = {
            password: hashPassword(password),
            profilePic: e.target.result || "default-avatar.png"
        };
        localStorage.setItem(username, JSON.stringify(userData));
        alert("Inscription réussie !");
        showLogin();
    };

    if (profilePic) {
        reader.readAsDataURL(profilePic);
    } else {
        const userData = {
            password: hashPassword(password),
            profilePic: "default-avatar.png"
        };
        localStorage.setItem(username, JSON.stringify(userData));
        alert("Inscription réussie !");
        showLogin();
    }
}

function hashPassword(password) {
    return btoa(password); 
}

function login() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    const userData = JSON.parse(localStorage.getItem(username));

    if (!userData || userData.password !== hashPassword(password)) {
        alert("Nom d'utilisateur ou mot de passe incorrect.");
        return;
    }

    currentUser = username;
    document.getElementById("auth-container").style.display = "none";
    document.getElementById("app-container").style.display = "block";
    document.getElementById("profile-pic-display").src = userData.profilePic;

    applyTheme(currentTheme); 
    initializeMap(); 
}

function applyTheme(theme) {
    const themes = {
        light: {
            "--bg-color": "#f5f5f5",
            "--text-color": "#333",
            "--header-color": "#222",
            "--sidebar-color": "#333",
            "--button-color": "#007bff"
        },
        dark: {
            "--bg-color": "#222",
            "--text-color": "#fff",
            "--header-color": "#444",
            "--sidebar-color": "#555",
            "--button-color": "#28a745"
        },
        pastel: {
            "--bg-color": "#fffbf0",
            "--text-color": "#5d5d5d",
            "--header-color": "#ffc1cc",
            "--sidebar-color": "#ffdde1",
            "--button-color": "#ff8fab"
        },
        highContrast: {
            "--bg-color": "#000",
            "--text-color": "#fff",
            "--header-color": "#ff0000",
            "--sidebar-color": "#000",
            "--button-color": "#ffff00"
        }
    };

    const selectedTheme = themes[theme];
    for (const property in selectedTheme) {
        document.documentElement.style.setProperty(property, selectedTheme[property]);
    }

    currentTheme = theme;
    localStorage.setItem('theme', theme); 
}

function initializeMap() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            map = L.map('map').setView([latitude, longitude], 13);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            userMarker = L.marker([latitude, longitude]).addTo(map)
                .bindPopup("Vous êtes ici")
                .openPopup();

            // Griser la carte au départ
            document.getElementById("map").style.filter = "grayscale(100%)";
            let opacity = 1;

            // Effectuer un fade in de la carte (passer du gris à la carte normale)
            const fadeInterval = setInterval(() => {
                if (opacity <= 0) {
                    clearInterval(fadeInterval);
                    document.getElementById("map").style.filter = "none";
                }
                document.getElementById("map").style.filter = `grayscale(${100 - opacity}%)`;
                opacity -= 2; // Effectue un dégradé vers la normalité
            }, 50);

            // Ajouter une grille de carrés de 50px
            const bounds = map.getBounds();
            const gridSize = 50; // taille du carré en pixels
            const xStart = Math.floor(bounds.getWest() / gridSize) * gridSize;
            const yStart = Math.floor(bounds.getSouth() / gridSize) * gridSize;
            
            for (let x = xStart; x < bounds.getEast(); x += gridSize) {
                for (let y = yStart; y < bounds.getNorth(); y += gridSize) {
                    const squareBounds = [
                        [y, x], 
                        [y + gridSize, x + gridSize]
                    ];
                    L.rectangle(squareBounds, { color: "#ff7800", weight: 1, fillOpacity: 0 }).addTo(map);
                }
            }

        });
    } else {
        alert("La géolocalisation n'est pas supportée par votre navigateur.");
    }
}
