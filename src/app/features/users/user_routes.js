const express = require('express')
const router = express.Router()
const sequelize = require('../../database/dataBase_connection')
const userQueries = require('./users_controller')
const userVerification = require('../../middleware/authentication')

router
    .route('/')
    .post(async(req, res) => {
        try {
            const user = req.body
            const response = await userQueries.insertNewUser(sequelize, user)
            if (response) {
                return res.status(201).json({
                    message: 'Successful operation. User created',
                    user_id: response
                })
            } else {
                return res.status(401).json({ message: 'Bad request' })
            }

        } catch (error) {
            res.status(500).json({ error: error })
        }
    })

router
    .route('/login')
    .post(async(req, res) => {
        const { username, password } = req.body

        if (!username || !password) {
            return res.status(402).send({ error: 'Bad request', message: 'Password or username is missing' })
        }

        try {
            const token = await userQueries.userLogin(sequelize, username, password)
            if (token.length) {
                return res.status(200).json({ message: 'User logged in succefully', token: token })
            } else {
                return res.status(404).json({ message: 'There is not match with user or passwors' })
            }

        } catch (error) {
            res.status(500).json({ error: error, message: 'Something went wrong. Please try again' })
        }
    })

router
    .route('/information')
    .get(async(req, res) => {

        const headerAuthorization = req.headers.authorization

        if (!headerAuthorization) {
            return res.status(402).send({ error: 'Bad request', message: 'You must set an Authorization token on headers' })
        }

        const data = userVerification.getUserDataFromToken(headerAuthorization)
        const userid = data.userID

        try {
            const response = await userQueries.getUserinformationByUserID(sequelize, userid)
            if (response.length) {
                return res.status(200).json({ user_info: response })
            } else {
                return res.status(404).json({ message: 'There is not match with userID' })
            }

        } catch (error) {
            res.status(500).json({ error: error, message: 'Something went wrong. Please try again' })
        }
    })

module.exports = router