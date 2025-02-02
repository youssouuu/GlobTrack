const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname));

let users = require("./users.json");

app.post("/register", (req, res) => {
    const { username, password } = req.body;
    if (users[username]) {
        return res.status(400).send("Nom d'utilisateur déjà pris.");
    }
    users[username] = { password };
    fs.writeFileSync("./users.json", JSON.stringify(users));
    res.send("Inscription réussie !");
});

app.post("/login", (req, res) => {
    const { username, password } = req.body;
    if (!users[username] || users[username].password !== password) {
        return res.status(401).send("Identifiants incorrects.");
    }
    res.send("Connexion réussie !");
});

app.listen(3000, () => console.log("Serveur en écoute sur http://localhost:3000"));
