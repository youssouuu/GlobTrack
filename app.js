// Basculer entre les formulaires de connexion et d'inscription
function toggleForms() {
    document.getElementById('login-form').classList.toggle('hidden');
    document.getElementById('register-form').classList.toggle('hidden');
}

// Inscription d'un nouvel utilisateur
function register() {
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;

    if (!username || !password) {
        alert('Veuillez remplir tous les champs.');
        return;
    }

    // Vérifie si l'utilisateur existe déjà
    if (localStorage.getItem(username)) {
        alert('Nom d\'utilisateur déjà pris.');
        return;
    }

    // Stocker l'utilisateur dans le LocalStorage
    localStorage.setItem(username, JSON.stringify({ password: password }));
    alert('Compte créé avec succès ! Vous pouvez maintenant vous connecter.');

    // Revenir au formulaire de connexion
    toggleForms();
}

// Connexion d'un utilisateur existant
function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    const storedUser = JSON.parse(localStorage.getItem(username));

    if (!storedUser) {
        alert('Nom d\'utilisateur introuvable.');
        return;
    }

    if (storedUser.password !== password) {
        alert('Mot de passe incorrect.');
        return;
    }

    alert('Connexion réussie !');
    localStorage.setItem('currentUser', username); // Stocker l'utilisateur connecté

    // Rediriger vers la carte
    window.location.href = 'map.html';
}
