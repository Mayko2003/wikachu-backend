const { Nature } = require('../models')


const NatureController = {}


NatureController.getNatures = async (req, res) => {
    try {
        const natures = await Nature.find()
        res.status(200).json({
            data: natures
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


NatureController.getNature = async (req, res) => {
    try {
        const nature = await Nature.findById(req.params.id)
        if (!nature) {
            res.status(404).json({
                message: 'Nature not found'
            })
        }
        res.status(200).json({
            data: nature
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

NatureController.createNature = async (req, res) => {
    try {
        const nature = new Nature(req.body)
        await nature.save()
        res.status(201).json({
            message: 'Nature created'
        })
    } catch (error) {

    }
}

NatureController.updateNature = async (req, res) => {
    try {
        await Nature.findOneAndUpdate({ _id: req.params.id }, req.body)
        res.status(200).json({
            message: 'Nature updated'
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

NatureController.deleteNature = async (req, res) => {
    try {
        await Nature.findByIdAndDelete(req.params.id)
        res.status(200).json({
            message: 'Nature deleted'
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


module.exports = NatureController