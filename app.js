document.getElementById('loginBtn').addEventListener('click', function() {
    const username = document.getElementById('username').value;
    const password = document.getElementBdocument.getElementById('loginBtn').addEventListener('click', function() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username && password) {
        // Stockage des informations dans le LocalStorage
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);

        // Redirection vers la page de la carte
        window.location.href = 'map.html';
    } else {
        alert("Veuillez entrer un nom d'utilisateur et un mot de passe.");
    }
});
    
