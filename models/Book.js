const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  titre: { type: String, required: true },
  auteur: { type: String, required: true },
  anneePublication: { type: Number, required: true },
  proprietaire: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;