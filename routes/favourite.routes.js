const express = require('express');
const { favouriteController, authController } = require('../controllers');


const router = express.Router();


router.get('/:id', authController.verifyToken, favouriteController.getFavouritesByUser);//id of user
router.post('/create', authController.verifyToken, favouriteController.createFavourite);
router.delete('/delete', authController.verifyToken, favouriteController.deleteFavourite);//id of favourite
router.post('/check', authController.verifyToken, favouriteController.checkFavourite);

module.exports = router