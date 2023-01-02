const { Favourite } = require('../models');

const favouriteController = {};

favouriteController.getFavouritesByUser = async (req, res) => {
    try {
        const favourites = await Favourite.find({ user: req.params.id }).populate('obj');
        res.status(200).json({
            data: favourites
        });
    }
    catch (error) {
        res.status(500).json({
            message: error
        });
    }
}

favouriteController.createFavourite = async (req, res) => {
    try {
        const favourite = new Favourite(req.body);
        await favourite.save();
        res.status(200).json({
            message: 'Favourite created'
        });
    }
    catch (error) {
        res.status(500).json({
            message: error
        });
    }
}

favouriteController.deleteFavourite = async (req, res) => {
    try {
        const user = req.body.user;
        const obj = req.body.obj;
        const favourite = await Favourite.findOneAndDelete({ user, obj });
        res.status(200).json({
            message: 'Favourite deleted'
        });
    }
    catch (error) {
        res.status(500).json({
            message: error
        });
    }
}

favouriteController.checkFavourite = async (req, res) => {
    try {
        const user = req.body.user;
        const obj = req.body.obj;
        const favourite = await Favourite.findOne({ user, obj });

        res.status(200).json({
            data: {
                liked: favourite ? true : false
            }
        });
    }
    catch (error) {
        res.status(500).json({
            message: error
        });
    }
}




module.exports = favouriteController;