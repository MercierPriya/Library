const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  nom: { type: String, required: true, minlength:3, maxlength:50 },
  email: { type: String, required: true, unique: true },
  motDePasse: { type: String, required: true, minlength:6 },
  role: { type: String, enum: ["utilisateur", "admin"], default: "utilisateur" },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
module.exports = User;