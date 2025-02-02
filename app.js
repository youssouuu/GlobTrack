let currentTheme = "light";

function showRegister() {
    document.getElementById("login-form").style.display = "none";
    document.getElementById("register-form").style.display = "block";
}

function showLogin() {
    document.getElementById("login-form").style.display = "block";
    document.getElementById("register-form").style.display = "none";
}

function login() {
    alert("Connexion réussie !");
    document.getElementById("auth-container").style.display = "none";
    document.getElementById("app-container").style.display = "block";
}

function register() {
    alert("Inscription réussie !");
    showLogin();
}

function toggleMenu() {
    document.getElementById("menu").classList.toggle("active");
}

function toggleProfileMenu() {
    document.getElementById("profile-menu").classList.toggle("active");
}

function changeTheme() {
    if (currentTheme === "light") {
        document.documentElement.style.setProperty("--bg-color", "#222");
        document.documentElement.style.setProperty("--text-color", "#fff");
        document.documentElement.style.setProperty("--header-color", "#444");
        document.documentElement.style.setProperty("--sidebar-color", "#555");
        currentTheme = "dark";
    } else {
        document.documentElement.style.setProperty("--bg-color", "#f5f5f5");
        document.documentElement.style.setProperty("--text-color", "#333");
        document.documentElement.style.setProperty("--header-color", "#222");
        document.documentElement.style.setProperty("--sidebar-color", "#333");
        currentTheme = "light";
    }
}

function logout() {
    alert("Déconnexion réussie !");
    document.getElementById("auth-container").style.display = "block";
    document.getElementById("app-container").style.display = "none";
}
