const jwt = require('jsonwebtoken')
const authController = {}

authController.verifyToken = async (req, res, next) => {

    if(!req.headers.authorization){
        res.status(401).json({
            message: 'Unauthorized request'
        })
    }
    else{
        const header = req.headers.authorization.split(' ')
        var token = null
        if(header.length === 2) token = header[1]
        
        if(!token){
            res.status(401).json({
                message: 'Unauthorized request'
            })
        }
        else{
            try{
                const payload = jwt.verify(token, process.env.JWT_SECRET)
                req.userid = payload.id
                next()
            }
            catch(err){
                res.status(401).json({
                    message: 'Unauthorized request'
                })
            }
        }
    }
}

module.exports = authController