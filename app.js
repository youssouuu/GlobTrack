document.addEventListener('DOMContentLoaded', function() {
    const loginBtn = document.getElementById('loginBtn');

    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            if (username && password) {
                // Stocker les informations dans le LocalStorage
                localStorage.setItem('username', username);
                localStorage.setItem('password', password);

                // Rediriger vers la carte après connexion
                window.location.href = 'map.html';
            } else {
                alert("Veuillez entrer un nom d'utilisateur et un mot de passe.");
            }
        });
    }
});
