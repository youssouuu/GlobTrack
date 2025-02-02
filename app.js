// Variables globales pour gérer l'état de l'utilisateur
let loggedIn = false;
let userProfilePic = null;

// Fonction de connexion
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Vérifier les identifiants (à remplacer par une vérification réelle)
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
        // Sauvegarder les informations (à faire côté serveur)
        loggedIn = true;
        userProfilePic = URL.createObjectURL(profilePic); // Simuler l'upload de la photo
        showMainSection();
    }
}

// Fonction pour afficher la page principale
function showMainSection() {
    document.getElementById('auth-section').style.display = 'none';
    document.getElementById('main-section').style.display = 'flex';

    if (userProfilePic) {
        document.getElementById('profile-avatar').src = userProfilePic;
    }
}

// Fonction pour changer la photo de profil
function changeProfilePic() {
    // Code pour changer la photo (à ajouter)
}

// Fonction de déconnexion
function logout() {
    loggedIn = false;
    userProfilePic = null;
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

// Fonction pour afficher/masquer le menu de profil
function toggleProfileMenu() {
    const profileMenu = document.getElementById('profile-menu');
    profileMenu.style.display = profileMenu.style.display === 'none' ? 'block' : 'none';
}
