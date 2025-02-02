let currentUser = null;
let currentTheme = localStorage.getItem('theme') || "light";

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

// Hachage simple du mot de passe (pour la démo uniquement)
function hashPassword(password) {
    return btoa(password); // Simple encodage base64 (non sécurisé pour production)
}

// Inscription
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

// Connexion
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

    applyTheme(currentTheme); // Appliquer le thème choisi lors de la connexion
}

// Appliquer un thème
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
    localStorage.setItem('theme', theme); // Sauvegarde du thème
}

// Changer de thème via le menu
function changeTheme(theme) {
    applyTheme(theme);
}

// Menu latéral
function toggleMenu() {
    document.getElementById("menu").classList.toggle("active");
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
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';

    fileInput.onchange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const userData = JSON.parse(localStorage.getItem(currentUser));
                userData.profilePic = e.target.result;
                localStorage.setItem(currentUser, JSON.stringify(userData));
                document.getElementById("profile-pic-display").src = e.target.result;
                alert("Photo de profil mise à jour !");
            };
            reader.readAsDataURL(file);
        }
    };

    fileInput.click();
}

// Changer le mot de passe
function changePassword() {
    const newPassword = prompt("Entrez un nouveau mot de passe.");
    if (newPassword) {
        const userData = JSON.parse(localStorage.getItem(currentUser));
        userData.password = hashPassword(newPassword);
        localStorage.setItem(currentUser, JSON.stringify(userData));
        alert("Mot de passe modifié !");
    }
}

// Appliquer le thème au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    applyTheme(currentTheme);
});
                
