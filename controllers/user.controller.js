const { User } = require("../models");
const jwt = require("jsonwebtoken");

const userController = {};

userController.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({
            data: users,
        });
    } catch (error) {
        res.status(500).json({
            message: error,
        });
    }
};

userController.createUser = async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(200).json({
            message: "User created",
        });
    } catch (error) {
        res.status(500).json(error);
    }
};

userController.deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message: "User deleted",
        });
    } catch (error) {
        res.status(500).json({
            message: error,
        });
    }
};

userController.updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        await User.findOneAndUpdate({ _id: id }, req.body);
        res.status(200).json({
            message: "User updated",
        });
    } catch (error) {
        res.status(500).json({
            message: error,
        });
    }
};

userController.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json({
            data: user,
        });
    } catch (error) {
        res.status(500).json({
            message: error,
        });
    }
}

userController.loginUser = async (req, res) => {
    try {
        const username = req.body.username,
            password = req.body.password;
        const user = await User.findOne({
            $and: [{ username: username }, { password: password }, { state: true }]
        });

        if (!user) {
            res.status(400).json({
                message: "User or password incorrect",
            });
        } else {
            token = jwt.sign({ id: User._id }, process.env.JWT_SECRET);
            res.status(200).json({
                data: user,
                token: token
            });
        }
    } catch (error) {
        res.status(500).json({
            msj: "Error to get User",
        });
    }
};

userController.getLoggedUser = async (req, res) => {
    try {
        const user = await User.findById(req.userid);
        res.status(200).json({
            data: user,
        });
    } catch (error) {
        res.status(500).json({
            message: error,
        });
    }
}

module.exports = userController;