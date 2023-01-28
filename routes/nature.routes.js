const express = require('express')
const { natureController } = require('../controllers')

const router = express.Router()


router.get('/', natureController.getNatures)
router.get('/:id', natureController.getNature)
router.post('/', natureController.createNature)
router.put('/:id', natureController.updateNature)
router.delete('/:id', natureController.deleteNature)


module.exports = router