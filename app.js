let currentUser = null;
let currentTheme = "light";

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
