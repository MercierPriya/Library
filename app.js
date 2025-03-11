const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require("express-session");
const connectDb=require('./database/connect');
const bookRouter=require('./routes/book-route');
const authRouter=require('./routes/auth-route');

require('dotenv').config();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: "monsecret", 
    resave: false, 
    saveUninitialized: true, 
    cookie: { secure: false }
  }));

// Connexion à MongoDB
connectDb()

//routes
app.use(bookRouter)
app.use(authRouter)

// listening to the port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`));