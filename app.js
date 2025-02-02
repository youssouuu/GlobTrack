let currentUser = null;
let currentTheme = "light";
let userMarker = null;
let userPosition = { lat: null, lon: null };
let exploredSquares = new Set(); // Pour suivre les carrés explorés
let totalSquares = 0; // Nombre total de carrés de la carte
let explorationProgress = 0; // Pourcentage d'exploration

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

// Ouvrir et fermer le menu
function toggleProfileMenu() {
    const profileMenu = document.getElementById("profile-menu");
    profileMenu.classList.toggle("active");
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
            const map = L.map('map').setView([lat, lon], 13);

            // Ajouter un fond de carte OpenStreetMap
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            // Ajouter un marqueur à la position actuelle
            userMarker = L.marker([lat, lon]).addTo(map)
                .bindPopup("Vous êtes ici.")
                .openPopup();
        }, function (error) {
            alert("Impossible de récupérer votre position.");
        });
    } else {
        alert("La géolocalisation n'est pas supportée par votre navigateur.");
    }
}
