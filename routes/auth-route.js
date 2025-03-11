const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const router = express.Router();

//  Inscription
router.post("/register", async (req, res) => {
    try {
        const { nom, email, motDePasse } = req.body;
        const userExiste = await User.findOne({ email });
        if (userExiste) return res.status(400).json({ message: "Email déjà utilisé" });
        const hashedPassword=await bcrypt.hash(motDePasse,10)
        const nouvelUtilisateur = new User({ nom, email, motDePasse:hashedPassword });
        await nouvelUtilisateur.save();
        res.status(201).json({ message: "Utilisateur créé avec succès" });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur" });
    }
});

//  Connexion
router.post("/login", async (req, res) => {
    try {
        const { email, motDePasse } = req.body;
        const utilisateur = await User.findOne({ email });
        if (!utilisateur) return res.status(400).json({ message: "Identifiants invalides" });

        const motDePasseValide = await bcrypt.compare(motDePasse, utilisateur.motDePasse);
        if (!motDePasseValide) return res.status(400).json({ message: "Identifiants invalides" });

        req.session.userId = utilisateur._id;
        req.session.role = utilisateur.role;
        res.json({ message: "Connexion réussie" });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur" });
    }
});

// Déconnexion
router.post("/logout", (req, res) => {
    req.session.destroy();
    res.json({ message: "Déconnexion réussie" });
});

module.exports = router;