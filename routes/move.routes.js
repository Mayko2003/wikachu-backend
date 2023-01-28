const express = require('express')
const { moveController } = require('../controllers')

const router = express.Router()


router.get('/', moveController.getMoves)
router.get('/:id', moveController.getMove)
router.post('/', moveController.createMove)
router.put('/:id', moveController.updateMove)
router.delete('/:id', moveController.deleteMove)


module.exports = router

