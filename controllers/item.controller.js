const { Item } = require('../models')


const ItemController = {}


ItemController.getItems = async (req, res) => {
    try {
        const items = await Item.find()
        res.status(200).json({
            data: items
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


ItemController.getItem = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id)
        if (!item) {
            res.status(404).json({
                message: 'Item not found'
            })
        }
        res.status(200).json({
            data: item
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

ItemController.createItem = async (req, res) => {
    try {
        const item = new Item(req.body)
        await item.save()
        res.status(201).json({
            message: 'Item created'
        })
    } catch (error) {

    }
}

ItemController.updateItem = async (req, res) => {
    try {
        await Item.findOneAndUpdate({ _id: req.params.id }, req.body)
        res.status(200).json({
            message: 'Item updated'
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

ItemController.deleteItem = async (req, res) => {
    try {
        await Item.findByIdAndDelete(req.params.id)
        res.status(200).json({
            message: 'Item deleted'
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


module.exports = ItemController