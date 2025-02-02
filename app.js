let loggedIn = false;
let userProfilePic = null;
let explorationPercentage = 0;
let position = { lat: 0, lon: 0 };  // Position actuelle de l'utilisateur

// Fonction de connexion
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Vérification des informations de connexion (à faire côté serveur)
    if (username && password) {
        loggedIn = true;
        showMainSection();
    }
}

// Fonction d'inscription
function signup() {
    const newUsername = document.getElementById('new-username').value;
    const newPassword = document.getElementById('new-password').value;
    const profilePic = document.getElementById('profile-pic').files[0];

    if (newUsername && newPassword && profilePic) {
        // Sauvegarder les informations d'inscription (à faire côté serveur)
        loggedIn = true;
        userProfilePic = URL.createObjectURL(profilePic);
        showMainSection();
    }
}

// Fonction pour afficher la page principale après connexion
function showMainSection() {
    document.getElementById('auth-section').style.display = 'none';
    document.getElementById('main-section').style.display = 'flex';

    if (userProfilePic) {
        document.getElementById('profile-avatar').src = userProfilePic;
    }
}

// Fonction de déconnexion
function logout() {
    loggedIn = false;
    userProfilePic = null;
    explorationPercentage = 0;
    position = { lat: 0, lon: 0 }; // Réinitialiser la position
    document.getElementById('profile-avatar').src = 'default-avatar.png';
    showLoginForm();
}

// Fonction pour afficher le formulaire de connexion
function showLoginForm() {
    document.getElementById('auth-title').textContent = 'Se connecter';
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('signup-form').style.display = 'none';
}

// Fonction pour afficher le formulaire d'inscription
function showSignupForm() {
    document.getElementById('auth-title').textContent = 'S\'inscrire';
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('signup-form').style.display = 'block';
}

// Fonction pour afficher/masquer le menu
function toggleMenu() {
    const sidebar = document.getElementById('sidebar');
    sidebar.style.left = sidebar.style.left === '0px' ? '-250px' : '0px';
}

// Fonction pour changer la photo de profil
function changeProfilePic() {
    const newPic = prompt("Entrez l'URL de la nouvelle photo de profil");
    if (newPic) {
        userProfilePic = newPic;
        document.getElementById('profile-avatar').src = newPic;
    }
}

// Fonction pour changer le mot de passe (simple exemple)
function changePassword() {
    const newPassword = prompt("Entrez le nouveau mot de passe");
    if (newPassword) {
        // Mettre à jour le mot de passe (faire côté serveur)
        alert("Mot de passe mis à jour !");
    }
}

// Fonction pour mettre à jour le pourcentage d'exploration
function updateExplorationPercentage() {
    explorationPercentage += 0.1;  // Simuler l'exploration (à faire en fonction du déplacement réel)
    document.getElementById('exploration').textContent = `Exploration : ${Math.round(explorationPercentage)}%`;
}

setInterval(updateExplorationPercentage, 1000); // Mettre à jour toutes les secondes
