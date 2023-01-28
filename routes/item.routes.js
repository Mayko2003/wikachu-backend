const express = require('express')
const { itemController } = require('../controllers')


const router = express.Router()


router.get('/', itemController.getItems)
router.get('/:id', itemController.getItem)
router.post('/', itemController.createItem)
router.put('/:id', itemController.updateItem)
router.delete('/:id', itemController.deleteItem)

module.exports = router