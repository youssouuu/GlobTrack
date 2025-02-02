let isLoggedIn = false; // Indique si l'utilisateur est connecté
let userProfilePic = "default-profile.png"; // Image par défaut du profil

// Afficher la page d'inscription
function showSignup() {
  document.getElementById('login-form').style.display = "none";
  document.getElementById('signup-form').style.display = "block";
}

// Afficher la page de connexion
function showLogin() {
  document.getElementById('login-form').style.display = "block";
  document.getElementById('signup-form').style.display = "none";
}

// Gérer la connexion de l'utilisateur
function loginUser() {
  let username = document.getElementById('login-username').value;
  let password = document.getElementById('login-password').value;

  // Logique simple pour la connexion (à personnaliser avec base de données)
  if (username === "chatgpt" && password === "1234") { // Juste un exemple
    isLoggedIn = true;
    showUserProfile();
    return false;
  } else {
    alert("Nom d'utilisateur ou mot de passe incorrect.");
    return false;
  }
}

// Gérer l'inscription de l'utilisateur
function registerUser() {
  let username = document.getElementById('signup-username').value;
  let password = document.getElementById('signup-password').value;
  let profilePic = document.getElementById('signup-profile-pic').files[0];

  if (profilePic) {
    let reader = new FileReader();
    reader.onload = function(e) {
      userProfilePic = e.target.result;
      // Simuler l'inscription réussie
      isLoggedIn = true;
      showUserProfile();
    };
    reader.readAsDataURL(profilePic);
  }

  return false; // Empêche l'envoi du formulaire par défaut
}

// Afficher la photo de profil et autres informations une fois connecté
function showUserProfile() {
  document.getElementById('top-bar').style.display = "flex";
  document.getElementById('profile-pic').src = userProfilePic;
  document.getElementById('auth-container').style.display = "none"; // Cacher les formulaires
  document.getElementById('map-container').style.display = "block"; // Afficher la carte
}

// Déconnexion
function logout() {
  isLoggedIn = false;
  document.getElementById('top-bar').style.display = "none";
  document.getElementById('profile-pic').src = "default-profile.png";
  document.getElementById('auth-container').style.display = "block"; // Afficher les formulaires
  document.getElementById('map-container').style.display = "none"; // Masquer la carte
}

// Ouvrir ou fermer le menu latéral
function toggleMenu() {
  document.getElementById('side-menu').classList.toggle('open');
}

// Ouvrir ou fermer le menu de profil
function toggleProfileMenu() {
  document.getElementById('profile-menu').classList.toggle('open');
}

// Fonction pour afficher la carte
function openMap() {
  alert("Carte est ouverte !");
}
