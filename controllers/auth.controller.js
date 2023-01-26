const jwt = require('jsonwebtoken')
const admin = require('../firebaseConfig');
const authController = {}

authController.verifyToken = async (req, res, next) => {

    if (!req.headers.authorization) {
        res.status(401).json({
            message: 'Unauthorized request'
        })
    }
    else {
        const header = req.headers.authorization.split(' ')
        var token = null
        if (header.length === 2) token = header[1]

        if (!token) {
            res.status(401).json({
                message: 'Unauthorized request'
            })
        }
        else {
            try {
                const payload = jwt.verify(token, process.env.JWT_SECRET)
                //console.log(payload._id)
                next()
            }
            catch (err) {
                try {
                    admin.auth().verifyIdToken(token)
                        .then((decodedToken) => {
                            next();
                        })
                }
                catch (err) {
                    res.status(401).json({
                        message: 'Unauthorized request'
                    })
                }
            }
        }
    }
}

authController.verifyTokenFirebase = async (req, res, next) => {

    if (!req.headers.authorization) {
        res.status(401).json({
            message: 'Unauthorized request'
        })
    }
    else {
        const header = req.headers.authorization.split(' ')
        var token = null
        if (header.length === 2) token = header[1]

        if (!token) {
            res.status(401).json({
                message: 'Unauthorized request'
            })
        }
        else {
            admin.auth().verifyIdToken(token)
                .then((decodedToken) => {
                    next();
                })
                .catch((err) => {
                    res.status(401).json({
                        message: 'Unauthorized request'
                    })
                })
        }
    }
}

module.exports = authController