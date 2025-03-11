const Book=require('../models/Book');
const User=require('../models/User');

exports.showbook=async (req, res) => {
    try {
        const books = await Book.find().populate("proprietaire", "nom email");
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur" });
    }
}

exports.showbookById=async (req, res) => {
    try {
        const book = await Book.findById(req.params.id).populate("proprietaire", "nom email");
        if (!book) return res.status(404).json({ message: "Livre non trouvé" });
        res.json(book);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur" });
    }
};
exports.myBooks=async (req, res) => {
    try {
        const livres = await Book.find({ proprietaire: req.session.userId });
        res.json(livres);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur" });
    }
}

exports.addbook= async (req, res) => {
    try {
        const { titre, auteur, anneePublication } = req.body;
        console.log(req.body);
        const nouveauLivre = new Book({
            titre,
            auteur,
            anneePublication,
            proprietaire: req.session.userId  // Assignation au propriétaire connecté
        });
        await nouveauLivre.save();
        res.status(201).json(nouveauLivre);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur" });
    }
}
exports.modify=async (req, res) => {
    try {
        const livre = await Book.findById(req.params.id);
        if (!livre) return res.status(404).json({ message: "Livre non trouvé" });

        if (livre.proprietaire.toString() !== req.session.userId) {
            return res.status(403).json({ message: "Non autorisé" });
        }

        const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedBook);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur" });
    }
}
exports.delete=async (req, res) => {
    try {
        const livre = await Book.findById(req.params.id);
        if (!livre) return res.status(404).json({ message: "Livre non trouvé" });

        // Vérification du rôle de l'utilisateur
        if (req.session.role !== 'admin') {
            return res.status(403).json({ message: "Accès refusé. Seuls les administrateurs peuvent supprimer des livres." });
        }

        await Book.findByIdAndDelete(req.params.id);
        res.json({ message: "Livre supprimé avec succès" });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur" });
    }
}
