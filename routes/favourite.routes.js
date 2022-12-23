const express = require('express');
const { favouriteController, authController } = require('../controllers');


const router = express.Router();


router.get('/:id', authController.verifyToken, favouriteController.getFavouritesByUser);//id of user
router.post('/create', authController.verifyToken, favouriteController.createFavourite);
router.delete('/delete/:id', authController.verifyToken, favouriteController.deleteFavourite);//id of favourite

module.exports = router