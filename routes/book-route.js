const express=require('express');
const router=express();
const bookController=require('../controllers/book-controller');
const authMiddleware = require("../middlewares/authMiddleware");

//routes
router.get('/',(req,res)=>{res.send('Welcome to my Book Library')});
//route to show all books 
router.get('/showbooks',bookController.showbook);
//route to find a book by its id
router.get('/showbookById/:id',bookController.showbookById);
//route to recover all books of a User
router.get('/my-books',authMiddleware.auth, bookController.myBooks);
// route to add the book with authentification
router.post('/addbook',authMiddleware.auth, bookController.addbook);
//route to modify a book by its id
router.put('/modify/:id',authMiddleware.auth, bookController.modify);
//route to delete a book by its id
router.delete('/delete/:id',authMiddleware.isAdmin, bookController.delete);


module.exports=router