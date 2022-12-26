const { Favourite } = require('../models');

const favouriteController = {};

favouriteController.getFavouritesByUser = async (req, res) => {
    try {
        const favourites = await Favourite.find({ user: req.params.id }).populate('pokemon');
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
        await Favourite.findByIdAndDelete(req.params.id);
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
        const pokemon = req.body.pokemon;
        const favourite = await Favourite.findOne({ user, pokemon });

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