const { Move } = require('../models')


const MoveController = {}


MoveController.getMoves = async (req, res) => {
    try {
        const moves = await Move.find()
        res.status(200).json({
            data: moves
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


MoveController.getMove = async (req, res) => {
    try {
        const move = await Move.findById(req.params.id)
        if (!move) {
            res.status(404).json({
                message: 'Move not found'
            })
        }
        res.status(200).json({
            data: move
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

MoveController.createMove = async (req, res) => {
    try {
        const move = new Move(req.body)
        await move.save()
        res.status(201).json({
            message: 'Move created'
        })
    } catch (error) {

    }
}

MoveController.updateMove = async (req, res) => {
    try {
        await Move.findOneAndUpdate({ _id: req.params.id }, req.body)
        res.status(200).json({
            message: 'Move updated'
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

MoveController.deleteMove = async (req, res) => {
    try {
        await Move.findByIdAndDelete(req.params.id)
        res.status(200).json({
            message: 'Move deleted'
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


module.exports = MoveController