📌 Guide d'installation

1️⃣ Prérequis :
Node.js installé
MongoDB installé ou accès à une base MongoDB en ligne
Postman ( pour tester les routes)

2️⃣ Installation du projet :
git clone https://github.com/Library.git
npm install express express-session mongoose dotenv cors bcryptjs

3️⃣ Configuration :
Créer un fichier .env et ajouter :
PORT=3000
DB_HOST=localhost
MONGO_URI=mongodb://localhost:27017/
DB_NAME=Library

4️⃣ Lancer le serveur :
node app.js

🔐 Middleware & Sécurité
Authentification Sessioin : Toutes les routes sécurisées nécessitent un Authorization: session.user.id
Rôle Admin : Seuls les admins peuvent supprimer des livres et gérer les utilisateurs.
Validation des données : Mongoose Native est utilisé pour valider les entrées utilisateur.

🚀 Routes API
✅ Test des Routes avec Postman
* Créer un utilisateur avec /register
* Se connecter avec /login 
* Ajouter un livre avec /addbook 
* Voir tous les livres avec /showbooks
* Voir tous les livres d'un utilisateur avec /my-books
* Voir le livre par son Id avec /showbookById/:id 
* update le livre par son Id avec /modify/:id
* Tester la suppression d’un livre avec /delete/:id en tant qu'admin

