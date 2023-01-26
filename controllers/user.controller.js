const { User } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const admin = require('../firebaseConfig');

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
        let usernameRepeated = await User.findOne({ username: req.body.username });
        let emailRepeated = await User.findOne({ email: req.body.email });

        if (usernameRepeated) {
            return res.status(400).json({
                type: 'username',
                message: "User already exists, use other name",
            });
        }

        if(emailRepeated){
            return res.status(400).json({
                type: 'email',
                message: "Email is already used on other account",
            });
        }

        await bcrypt.hash(req.body.password, 10).then((hash) => {
            req.body.password = hash;
        });
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
        let user = await User.findOne({ username: req.body.username, state: true });
        if (!user) {
            return res.status(400).json({
                type: 'username',
                message: "User does not exist",
            });
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password);


        if (!validPassword) {
            res.status(400).json({
                type: 'password',
                message: "Incorrect password",
            });
        } else {
            token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
            res.status(200).json({
                token: token
            });
        }
    } catch (error) {
        res.status(500).json({
            type: 'server',
            message: "Error to login user",
        });
    }
};

userController.getLoggedUser = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(payload._id);
        res.status(200).json({
            data: { ...user._doc, password: undefined }
        });
    } catch (error) {
        try{
            const token = req.headers.authorization.split(' ')[1];
            const payload = await admin.auth().verifyIdToken(token);
            let user = await User.findOne({email: payload.email, state: true});
            if(!user){
                setTimeout(async () => {
                    user = await User.findOne({email: payload.email, state: true});
                    return res.status(200).json({
                        data: { ...user._doc, password: undefined }
                    });
                }, 2000);
            }else{
                res.status(200).json({
                data: { ...user._doc, password: undefined }
            });
            }
        } catch(error){  
            res.status(500).json({
                message: error,
            });
        }
    }
}

userController.userExists = async (req, res) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
        const payload = await admin.auth().verifyIdToken(token);
        let user = await User.findOne({email: payload.email, state: true});
        if(user){    
            res.status(200).json({
                exists: true,
                message: 'User already exists, please login in',
                type: 'google'
            });
        }else{
            res.status(200).json({
                exists: false,
                message: 'User doesnt exist, please sign up first',
                type: 'google'
            });
        }
    } catch(error){  
        res.status(500).json({
            message: error,
        });
    }
}

module.exports = userController;