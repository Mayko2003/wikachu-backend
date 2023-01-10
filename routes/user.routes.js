
const  { userController, authController } = require('../controllers')
const express = require('express')

const router = express.Router()

router.get('/', authController.verifyToken, userController.getUsers)
router.post('/create', userController.createUser)
router.delete('/delete/:id', authController.verifyToken, userController.deleteUser)
router.put('/update/:id', authController.verifyToken, userController.updateUser)
router.get('/find/:id', authController.verifyToken, userController.getUserById)
router.post('/login', userController.loginUser)


router.get('/logged', userController.getLoggedUser)

module.exports = router