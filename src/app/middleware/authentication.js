const config = require('../../config/config')
const jwt = require('jsonwebtoken')
const sign = config.JWT.PRIVATE_KEY

const authenticationMiddelwares = {
    userAuthentication: (req, res, next) => {
        console.log('User authentication MIDDLEWARE')
        try {
            const token = req.headers.authorization.split(' ')[1]
            const data = jwt.verify(token, sign)
            next()
        } catch (error) {
            res.status(401).json({ error: 'Unauthorized', message: 'Invalid token. You must login first' })
        }

    },

    getUserDataFromToken: (header) => {
        const token = header.split(' ')[1]
        const data = jwt.verify(token, sign)
        return data
    },

    adminAuthentication: (req, res, next) => {
        try {
            const token = req.headers.authorization.split(' ')[1]
            const data = jwt.verify(token, sign)
            if (data.isAdmin !== 0) {
                console.log('User with ADMINISTRATION PERMISSIONS')
                next()
            } else {
                res.status(403).json({ error: 'Unauthorized', message: 'Not authorized' })
                console.log('User with NO ADMINISTRATION PERMISSIONS')
            }

        } catch (error) {
            res.status(401).json({ error: 'Unauthorized', message: 'Invalid token' })
        }

    }

}



module.exports = authenticationMiddelwares