
const userController = require('../controllers/userController')
const authController = require('../controllers/authController')
const express = require('express')

const router = express.Router()

router.get('/', authController.verifyToken, userController.getUsers)
router.post('/create', authController.verifyToken, userController.createUser)
router.delete('/delete/:id', authController.verifyToken, userController.deleteUser)
router.put('/update/:id', authController.verifyToken, userController.updateUser)
router.get('/:id', authController.verifyToken, userController.getUserById)
router.post('/login', userController.loginUser)
router.get('/logged', authController.verifyToken, userController.getLoggedUser)

module.exports = router