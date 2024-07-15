const express = require('express');
const { login, signup, getAllMovies, getUser, bookMovie, getMovieById } = require('../controllers/userController');
const { addMovie, getMovies, deleteMovie, editMovie } = require('../controllers/adminController');
const { isAdmin, auth } = require('../middleware/auth');
const { orderPayment, verifyPayment } = require('../controllers/paymentController');
const router = express.Router();

//AUTH
router.post('/auth/login',login);
router.post('/auth/signup',signup);

//User
router.get('/user/getAllMovies',getAllMovies)//get all movies
router.get('/user/getUser',auth,getUser)
router.get('/user/getMovieById/:id',getMovieById)

//Book
router.post('/user/book',auth,bookMovie)//not in use
router.post('/user/order',orderPayment)
router.post('/user/verify',auth,verifyPayment);

//ADMIN------------------------------------------------------
//ADD
router.post('/admin/addMovie',auth,isAdmin,addMovie)
//GET MOVIE OF THAT ADMIN
router.get('/admin/getMovies',auth,isAdmin,getMovies)
//DELETE
router.delete('/admin/delete/:id',auth,isAdmin,deleteMovie)
//EDIT
router.put('/admin/edit/:id',auth,isAdmin,editMovie)

module.exports = router;