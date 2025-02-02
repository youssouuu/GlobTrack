let currentUser = null;
let currentTheme = "light";
let userMarker = null;
let userPosition = { lat: null, lon: null };

// Afficher le formulaire d'inscription
function showRegister() {
    document.getElementById("login-form").style.display = "none";
    document.getElementById("register-form").style.display = "block";
}

// Afficher le formulaire de connexion
function showLogin() {
    document.getElementById("login-form").style.display = "block";
    document.getElementById("register-form").style.display = "none";
}

// Inscription
function register() {
    const username = document.getElementById("new-username").value;
    const password = document.getElementById("new-password").value;
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
            password: password,
            profilePic: e.target.result
        };
        localStorage.setItem(username, JSON.stringify(userData));
        alert("Inscription réussie !");
        showLogin();
    };

    if (profilePic) {
        reader.readAsDataURL(profilePic);
    } else {
        const userData = {
            password: password,
            profilePic: "default-avatar.png"
        };
        localStorage.setItem(username, JSON.stringify(userData));
        alert("Inscription réussie !");
        showLogin();
    }
}

// Connexion
function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const userData = JSON.parse(localStorage.getItem(username));

    if (!userData || userData.password !== password) {
        alert("Nom d'utilisateur ou mot de passe incorrect.");
        return;
    }

    currentUser = username;
    document.getElementById("auth-container").style.display = "none";
    document.getElementById("app-container").style.display = "block";
    document.getElementById("profile-pic-display").src = userData.profilePic;

    showMap();
}

// Changement de thème
function changeTheme() {
    if (currentTheme === "light") {
        document.documentElement.style.setProperty("--bg-color", "#222");
        document.documentElement.style.setProperty("--text-color", "#fff");
        document.documentElement.style.setProperty("--header-color", "#444");
        document.documentElement.style.setProperty("--sidebar-color", "#555");
        document.documentElement.style.setProperty("--button-color", "#28a745");
        currentTheme = "dark";
    } else {
        document.documentElement.style.setProperty("--bg-color", "#f5f5f5");
        document.documentElement.style.setProperty("--text-color", "#333");
        document.documentElement.style.setProperty("--header-color", "#222");
        document.documentElement.style.setProperty("--sidebar-color", "#333");
        document.documentElement.style.setProperty("--button-color", "#007bff");
        currentTheme = "light";
    }
}

// Menu latéral : Ouvrir et fermer
function toggleMenu() {
    const menu = document.getElementById("menu");
    menu.classList.toggle("active");

    // Si le menu est ouvert, on verrouille le fond pour empêcher de cliquer en dehors
    const isActive = menu.classList.contains("active");
    if (isActive) {
        document.body.style.overflow = "hidden"; // Désactiver le défilement de la page
    } else {
        document.body.style.overflow = "auto"; // Réactiver le défilement
    }
}

// Menu profil
function toggleProfileMenu() {
    document.getElementById("profile-menu").classList.toggle("active");
}

// Déconnexion
function logout() {
    currentUser = null;
    document.getElementById("auth-container").style.display = "block";
    document.getElementById("app-container").style.display = "none";
}

// Modifier la photo de profil
function changeProfilePic() {
    const newPic = prompt("Téléchargez une nouvelle photo de profil.");
    if (newPic) {
        const userData = JSON.parse(localStorage.getItem(currentUser));
        userData.profilePic = newPic;
        localStorage.setItem(currentUser, JSON.stringify(userData));
        document.getElementById("profile-pic-display").src = newPic;
        alert("Photo de profil mise à jour !");
    }
}

// Changer le mot de passe
function changePassword() {
    const newPassword = prompt("Entrez un nouveau mot de passe.");
    if (newPassword) {
        const userData = JSON.parse(localStorage.getItem(currentUser));
        userData.password = newPassword;
        localStorage.setItem(currentUser, JSON.stringify(userData));
        alert("Mot de passe modifié !");
    }
}

// Afficher une carte avec la position exacte de l'utilisateur
function showMap() {
    // Vérifier si l'API Geolocation est disponible
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            // Créer une carte centrée sur la position de l'utilisateur
            const map = L.map('map').setView([lat, lon], 13); // Zoom de niveau 13 (ajustable)

            // Ajouter un fond de carte OpenStreetMap
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            // Ajouter un fond gris à la carte
            const grayLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                opacity: 0.5
            }).addTo(map);

            // Ajouter un marqueur à la position actuelle
            userMarker = L.marker([lat, lon]).addTo(map)
                .bindPopup("Vous êtes ici.")
                .openPopup();

            // Suivre la position de l'utilisateur
            map.on('moveend', function () {
                const currentBounds = map.getBounds();
                grayLayer.setOpacity(0.5); // Assurer la carte reste grisée à l'extérieur du carré

                if (userPosition.lat !== lat || userPosition.lon !== lon) {
                    userPosition = { lat: lat, lon: lon };
                    userMarker.setLatLng([lat, lon]).addTo(map);
                }
            });
        }, function (error) {
            alert("Impossible de récupérer votre position.");
        });
    } else {
        alert("La géolocalisation n'est pas supportée par votre navigateur.");
    }
}
